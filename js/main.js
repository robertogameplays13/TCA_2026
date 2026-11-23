const SUPABASE_URL = 'https://mdjjrobjcvabbkkktajz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_XA3BCHSg0cJUszGwsvyegw_qZh5AS6s';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

async function carregarJogos() {
    const divLista = document.getElementById('lista-jogos');

    const { data, error } = await supabaseClient
        .from('jogo')
        .select('*');

    if (error) {
        divLista.innerHTML = 'Erro ao carregar: ' + error.message;
        return;
    }

    divLista.innerHTML = '';

    data.forEach(jogo => {
        divLista.innerHTML += `
            <a href="jogo.html?id=${jogo.id}" class="item-jogo">
                <strong>${jogo.nome}</strong>
                <span class="badge-nota ${corDaNota(jogo.nota)}">${jogo.nota}</span>
            </a>
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

carregarJogos();
carregarReviewsRecentes();
