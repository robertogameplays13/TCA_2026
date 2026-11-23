const SUPABASE_URL = 'https://mdjjrobjcvabbkkktajz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_XA3BCHSg0cJUszGwsvyegw_qZh5AS6s';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const params = new URLSearchParams(window.location.search);
const gameId = params.get('id');

let usuarioAtual = null;

function corDaNota(nota) {
    if (nota >= 8) return 'nota-verde';
    if (nota >= 5) return 'nota-amarela';
    return 'nota-vermelha';
}

function gerarEstrelas(nota) {
    const estrelas = nota / 2;
    let html = '<span class="estrelas">';

    for (let i = 1; i <= 5; i++) {
        if (estrelas >= i) {
            html += '<span class="estrela cheia">★</span>';
        } else if (estrelas >= i - 0.5) {
            html += '<span class="estrela meia">★</span>';
        } else {
            html += '<span class="estrela">★</span>';
        }
    }

    html += '</span>';
    return html;
}

async function carregarJogo() {
    const divDetalhes = document.getElementById('detalhes-jogo');
    const divEmpresa = document.getElementById('dados-empresa');

    if (!gameId) {
        divDetalhes.innerHTML = '<p>Nenhum jogo selecionado.</p>';
        divEmpresa.innerHTML = '<p class="texto-suave">-</p>';
        return;
    }

    const { data, error } = await supabaseClient
        .from('jogo')
        .select('*, jogo_desenvolvedora(desenvolvedora(nome, regiao))')
        .eq('id', gameId)
        .single();

    if (error || !data) {
        divDetalhes.innerHTML = '<p>Jogo não encontrado.</p>';
        divEmpresa.innerHTML = '<p class="texto-suave">Sem dados.</p>';
        return;
    }

    divDetalhes.innerHTML = `
        <img src="imgs/${data.logo}" alt="${data.nome}" width="240" style="border: 2px solid #111; margin-bottom: 10px;">
        <h2>${data.nome}</h2>
        <p style="margin-bottom: 8px;">
            <strong>Nota:</strong> <span class="badge-nota ${corDaNota(data.nota)}">${data.nota}</span>
        </p>
        <p style="margin-bottom: 8px;"><strong>Lançamento:</strong> ${data.lancamento}</p>
        <p><strong>Sinopse:</strong> ${data.sinopse}</p>
    `;

    const listaDevs = data.jogo_desenvolvedora || [];
    if (listaDevs.length === 0) {
        divEmpresa.innerHTML = '<p class="texto-suave">Desenvolvedora não informada.</p>';
    } else {
        divEmpresa.innerHTML = '';
        listaDevs.forEach(item => {
            if (item.desenvolvedora) {
                divEmpresa.innerHTML += `
                    <p style="margin-bottom: 6px;"><strong>Empresa:</strong> ${item.desenvolvedora.nome}</p>
                    <p style="margin-bottom: 10px;"><strong>Região:</strong> ${item.desenvolvedora.regiao}</p>
                `;
            }
        });
    }
}

const loginReviewForm = document.getElementById('loginReviewForm');
const reviewForm = document.getElementById('reviewForm');
const msgLogin = document.getElementById('msg-login-review');
const textoLogado = document.getElementById('usuario-logado-texto');

loginReviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    msgLogin.textContent = 'Verificando...';

    const email = document.getElementById('email-review').value.trim();
    const senha = document.getElementById('senha-review').value;

    const { data, error } = await supabaseClient
        .from('usuario')
        .select('*')
        .eq('email', email)
        .eq('senha', senha)
        .maybeSingle();

    if (error) {
        msgLogin.textContent = 'Erro: ' + error.message;
        return;
    }

    if (!data) {
        msgLogin.textContent = 'Email ou senha inválidos.';
        return;
    }

    usuarioAtual = data;
    loginReviewForm.style.display = 'none';
    reviewForm.style.display = 'flex';
    textoLogado.innerHTML = `Logado como: <strong>${usuarioAtual.nome}</strong>`;
});

reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!gameId || !usuarioAtual) return;

    const nota = parseInt(document.getElementById('nota-review').value, 10);
    const conteudo = document.getElementById('conteudo-review').value.trim();

    const { error } = await supabaseClient
        .from('review')
        .insert([{
            id_usuario: usuarioAtual.id,
            id_jogo: parseInt(gameId, 10),
            nota,
            conteudo
        }]);

    if (error) {
        alert('Erro ao salvar review: ' + error.message);
        return;
    }

    reviewForm.reset();
    carregarReviews();
    carregarReviewsRecentes();
});

const listaReviews = document.getElementById('lista-reviews');

async function carregarReviews() {
    if (!gameId) return;

    const { data, error } = await supabaseClient
        .from('review')
        .select('id, nota, conteudo, usuario(nome)')
        .eq('id_jogo', gameId)
        .order('id', { ascending: false });

    if (error) {
        listaReviews.innerHTML = 'Erro: ' + error.message;
        return;
    }

    if (!data || data.length === 0) {
        listaReviews.innerHTML = '<p class="texto-suave">Nenhuma review ainda. Seja o primeiro!</p>';
        return;
    }

    listaReviews.innerHTML = '';
    data.forEach(r => {
        const nomeUsuario = r.usuario ? r.usuario.nome : 'Usuário';
        listaReviews.innerHTML += `
            <div class="item-review">
                <strong>${nomeUsuario}</strong> ${gerarEstrelas(r.nota)}
                <p style="margin-top: 4px;">${r.conteudo}</p>
            </div>
        `;
    });
}

async function carregarReviewsRecentes() {
    const divRecentes = document.getElementById('reviews-recentes');
    if (!divRecentes) return;

    const { data, error } = await supabaseClient
        .from('review')
        .select('id, id_jogo, nota, conteudo, usuario(nome), jogo(nome)')
        .order('id', { ascending: false })
        .limit(5);

    if (error) {
        divRecentes.innerHTML = '<p class="texto-suave">Erro ao carregar.</p>';
        return;
    }

    if (!data || data.length === 0) {
        divRecentes.innerHTML = '<p class="texto-suave">Nenhuma review ainda.</p>';
        return;
    }

    divRecentes.innerHTML = '';
    data.forEach(r => {
        const nomeJogo = r.jogo ? r.jogo.nome : 'Jogo';
        const nomeUsuario = r.usuario ? r.usuario.nome : 'Usuário';
        divRecentes.innerHTML += `
            <a href="jogo.html?id=${r.id_jogo}" class="item-review-recente">
                <strong>${nomeJogo}</strong>
                <div>${nomeUsuario} ${gerarEstrelas(r.nota)}</div>
                <p style="margin-top: 4px;">${r.conteudo}</p>
            </a>
        `;
    });
}

carregarJogo();
carregarReviews();
carregarReviewsRecentes();
