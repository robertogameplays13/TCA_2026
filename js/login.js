const SUPABASE_URL = 'https://mdjjrobjcvabbkkktajz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_XA3BCHSg0cJUszGwsvyegw_qZh5AS6s';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.getElementById('mensagem-login');

    const nome = document.getElementById('name-login').value.trim();
    const email = document.getElementById('email-login').value.trim();
    const senha = document.getElementById('senha-login').value;

    const { error } = await supabaseClient
        .from('usuario')
        .insert([{ nome, email, senha }]);

    if (error) {
        msg.style.color = '#b00020';
        msg.textContent = 'Erro: ' + error.message;
        return;
    }

    msg.style.color = '#1b5e20';
    msg.textContent = 'Conta criada! Volte para um jogo e faça login na área de reviews.';
    e.target.reset();
});
