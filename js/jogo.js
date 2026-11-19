const SUPABASE_URL = 'https://mdjjrobjcvabbkkktajz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_XA3BCHSg0cJUszGwsvyegw_qZh5AS6s';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const params = new URLSearchParams(window.location.search);
const gameId = params.get('id');

async function carregarJogo() {
    const divDetalhes = document.getElementById('detalhes-jogo');

    if (!gameId) {
        divDetalhes.innerHTML = '<p>Nenhum jogo selecionado.</p>';
        return;
    }

    const { data, error } = await supabaseClient
        .from('jogo')
        .select('*')
        .eq('id', gameId)
        .single();

    if (error || !data) {
        divDetalhes.innerHTML = '<p>Jogo não encontrado.</p>';
        return;
    }
    divDetalhes.innerHTML = `
        <img src="imgs/${data.logo}" alt="${data.nome}" width="120">
        <h1>${data.nome}</h1>
        <p><strong>Nota:</strong> ${data.nota}</p>
        <p><strong>Lançamento:</strong> ${data.lancamento}</p>
        <p><strong>Sinopse:</strong> ${data.sinopse}</p>
    `;
}

carregarJogo();