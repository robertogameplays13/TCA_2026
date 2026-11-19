const SUPABASE_URL = 'https://mdjjrobjcvabbkkktajz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_XA3BCHSg0cJUszGwsvyegw_qZh5AS6s';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
                <strong>${jogo.nome}</strong> - Nota: ${jogo.nota}
            </a>
        `;
    });
}

carregarJogos();