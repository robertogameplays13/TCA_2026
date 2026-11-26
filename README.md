# Metida Crítica

Projeto de avaliação de jogos desenvolvido em HTML, CSS e JavaScript, integrado ao Supabase para armazenamento e consulta de dados em um banco.

## Sobre o Projeto

Este site permite que os usuários naveguem por uma lista de jogos, visualizem detalhes de cada título e da empresa desenvolvedora, criem uma conta e publiquem reviews.

## Funcionalidades

- **Página inicial (`index.html`):** exibe a lista de jogos com badges coloridas de nota e um painel lateral com as 5 reviews mais recentes.
- **Página do jogo (`jogo.html`):** mostra os detalhes do jogo (logo, nota, lançamento e sinopse), os dados da desenvolvedora na coluna esquerda, as 5 reviews mais recentes na coluna direita, login rápido para avaliar e a lista de reviews do jogo.
- **Avaliação em estrelas:** as notas de `0` a `10` das reviews são convertidas para uma escala visual de `0` a `5` estrelas (cada 1 ponto equivale a meia estrela).
- **Cadastro de conta (`login.html`):** permite criar um novo usuário com nome, e-mail e senha na tabela `usuario`.

## Estrutura de Pastas

- `index.html`: tela principal com a listagem de jogos e reviews recentes.
- `jogo.html`: página de detalhes do jogo, formulário de avaliação e reviews da comunidade.
- `login.html`: formulário de cadastro de conta.
- `css/`: estilos divididos em `main.css`, `variables.css`, `base.css`, `layout.css` e `components.css`.
- `js/`: scripts `main.js`, `jogo.js` e `login.js` responsáveis pela comunicação com o Supabase.
- `imgs/`: imagens dos jogos.

## Tecnologias Utilizadas

- **HTML5**
- **CSS3** (Grid, Flexbox e estilização modular)
- **JavaScript (Vanilla JS)**
- **Supabase** (PostgreSQL + API client via CDN)

## Como Executar

1. Baixe ou clone o repositório.
2. Abra o arquivo `index.html` em um navegador (de preferência usando um servidor local, como a extensão *Live Server* do VS Code).
3. Navegue pelos jogos, cadastre uma conta em **Criar Conta** e faça login na página de um jogo para publicar uma review.
