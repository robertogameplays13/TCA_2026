
CREATE TABLE genero (
    id        INT PRIMARY KEY,
    nome      VARCHAR(50) NOT NULL,
    descricao TEXT
);

CREATE TABLE desenvolvedora (
    id     INT PRIMARY KEY,
    nome   VARCHAR(50) NOT NULL,
    regiao VARCHAR(50)
);

CREATE TABLE usuario (
    id    INT PRIMARY KEY,
    nome  VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL ,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE jogo (
    id         INT PRIMARY KEY,
    nome       VARCHAR(100) NOT NULL,
    lancamento DATE,
    nota       INT CHECK (nota BETWEEN 0 AND 10),
    sinopse    TEXT,
    logo       TEXT
);

CREATE TABLE genero_jogo (
    id_genero INT,
    id_jogo   INT,
    PRIMARY KEY (id_genero, id_jogo),
    FOREIGN KEY (id_genero) REFERENCES genero(id),
    FOREIGN KEY (id_jogo)   REFERENCES jogo(id)
);

CREATE TABLE jogo_desenvolvedora (
    id_jogo           INT,
    id_desenvolvedora INT,
    PRIMARY KEY (id_jogo, id_desenvolvedora),
    FOREIGN KEY (id_jogo) REFERENCES jogo(id),
    FOREIGN KEY (id_desenvolvedora) REFERENCES desenvolvedora(id)
);
CREATE TABLE review (
    id         INT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_jogo    INT NOT NULL,
    conteudo   TEXT,
    nota       INT NOT NULL CHECK (nota BETWEEN 0 AND 10),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    FOREIGN KEY (id_jogo)    REFERENCES jogo(id)
);

INSERT INTO genero (id, nome, descricao) VALUES
(1, 'Ação', 'Jogos que envolvem ação intensa e desafios físicos.'),
(2, 'Aventura', 'Jogos focados em exploração e narrativa.'),
(3, 'RPG', 'Jogos de interpretação de personagens e desenvolvimento de habilidades.'),
(4, 'Esporte', 'Jogos que simulam esportes reais.'),
(5, 'Puzzle', 'Jogos que exigem planejamento e tomada de decisões.'),
(6, 'Terror', 'Jogos que buscam provocar medo e tensão no jogador.');

INSERT INTO desenvolvedora (id, nome, regiao) VALUES
(1, 'Ubisoft', 'França'),
(2, 'Electronic Arts', 'Estados Unidos'),
(3, 'Nintendo', 'Japão'),
(4, 'Rockstar Games', 'Estados Unidos'),
(5, 'CD Projekt', 'Polônia'),
(6, 'Valve', 'Estados Unidos'),
(7, 'Bethesda Softworks', 'Estados Unidos'),
(8, 'SEGA', 'Japão'),
(9, 'CAPCOM', 'Japão'),
(10, 'Sony', 'Japão'),
(11, 'Tencent', 'China'),
(12, 'Activision', 'Estados Unidos'),
(13, 'Square Enix', 'Japão'),
(14, 'Bandai Namco', 'Japão'),
(15, 'Blizzard Entertainment', 'Estados Unidos'),
(16, 'FromSoftware', 'Japão'),
(17, 'Epic Games', 'Estados Unidos')
;

INSERT INTO jogo (id, nome, lancamento, nota, sinopse, logo) VALUES
(1, 'The Witcher 3: Wild Hunt', '2015-05-19', 10, 'O matador de monstros Geralt de Rivia deve encontrar sua filha adotiva, que está sendo perseguida pela Caçada Selvagem, e evitar que a Geada Branca acabe com o mundo.', 'witcher3_logo.png'),
(2, 'Grand Theft Auto V', '2013-09-17', 9, 'Três criminosos muito diferentes se unem para uma série de assaltos e vivenciam algumas das experiências mais emocionantes da corrupta cidade de Los Santos.', 'gta5_logo.png'),
(3, 'The Legend of Zelda: Breath of the Wild', '2017-03-03', 10, 'Depois de um século de hibernação, Link desperta para mais uma vez salvar Hyrule arruinada de um grande mal.', 'zelda_botw_logo.png'),
(4, 'EA SPORTS FC 27', '2024-09-24', 4, 'Boas-vindas ao EA SPORTS FC™ 27 - O Jogo de Todo Mundo. Entre no The Grounds, o ponto de encontro do futebol e sinta mais controle em todos os modos, enquanto inovações impulsionadas pela comunidade proporcionam uma jogabilidade ainda mais fiel ao futebol.', 'fifa21_logo.png'),
(5, 'Portal 2', '2011-04-19', 10, 'A "Iniciativa de Testes Perpétuos" foi expandida: crie câmaras cooperativas para você e os seus amigos!', 'portal2_logo.png'),
(6, 'Cyberpunk 2077', '2020-12-10', 9, 'Cyberpunk 2077 é um RPG de ação e aventura em mundo aberto que se passa em Night City, uma megalópole perigosa onde todos são obcecados por poder, glamour e alterações corporais.', 'cyberpunk2077_logo.png'),
(7, 'Red Dead Redemption 2', '2018-10-26', 10, 'Arthur Morgan e a gangue Van der Linde são forçados a fugir. Com agentes federais e caçadores de recompensas no seu encalço, a gangue precisa roubar, assaltar e lutar para sobreviver no impiedoso coração dos Estados Unidos.', 'rdr2_logo.png'),
(8, 'Super Mario Odyssey', '2017-10-27', 8, 'Viaje por reinos criativos e coloridos a bordo de uma nave em formato de chapéu para resgatar a Princesa Peach das garras de Bowser.', 'mario_odyssey_logo.png'),
(9, 'Overwatch', '2016-05-24', 6, 'Una forças com heróis excêntricos de todo o mundo em combates eletrizantes de tiro em equipe baseados em objetivos.', 'overwatch_logo.png'),
(10, 'Dark Souls III', '2016-03-24', 10, 'DARK SOULS™ continua a ultrapassar seus próprios limites em um ambicioso novo capítulo da série que definiu um gênero e que é aclamada pela crítica. Prepare-se para abraçar a escuridão!', 'darksouls3_logo.png'),
(11, 'League of Legends', '2009-10-27', 6, 'League of Legends: um MOBA 5v5 em que as equipes batalham para destruir o Nexus inimigo.', 'lol_logo.png'),
(12, 'Fortnite', '2017-07-21', 7, 'Construa defesas rapidamente e lute pela sobrevivência contra dezenas de jogadores em uma ilha em constante transformação.', 'fortnite_logo.png'),
(13, 'Dark Souls I: Remastered', '2011-09-22', 9, 'Mas então, fez-se o fogo.s Experimente novamente o jogo aclamado pela crítica e definidor de gênero que foi o início tudo.', 'darksouls1_logo.png'),
(14, 'Dark Souls II: Scholar of the First Sin', '2015-04-01', 4, 'DARK SOULS™ II: Scholar of the First Sin leva a renomada obscuridade e jogabilidade viciante da franquia a um novo nível.', 'darksouls2_logo.png'),
(15, 'Bloodborne', '2015-03-24', 9, 'Cace feras e desvende mistérios cósmicos nas ruas góticas e aterrorizantes da cidade encoberta de Yharnam.', 'bloodborne_logo.png'),
(16, 'Elden Ring', '2022-02-25', 10, 'Levante-se, Maculado, e seja guiado pela graça para portar o poder do Anel Prístino e se tornar um Lorde Prístino nas Terras Intermédias.', 'eldenring_logo.png'),
(17, 'Resident Evil 4 Remake', '2023-04-23', 9, 'Seis anos se passaram desde o desastre biológico em Raccoon City. Leon S. Kennedy, um dos sobreviventes, segue o rastro da raptada filha do presidente até uma vila europeia isolada, onde há algo terrivelmente errado com os habitantes.', 'residents_evil4_logo.png');


INSERT INTO genero_jogo (id_genero, id_jogo) VALUES
(1, 1), (2, 1), (3, 1),
(1, 2), (2, 2),
(2, 3), (3, 3),
(4, 4),
(5, 5),
(1, 6), (3, 6),
(1, 7), (2, 7),
(2, 8),
(1, 9),
(1, 10), (3, 10),
(1, 11), (3, 11),
(1, 12),
(1, 13), (3, 13),
(1, 14), (3, 14),
(1, 15), (3, 15),
(1, 16), (3, 16),
(1, 17), (6, 17);

INSERT INTO jogo_desenvolvedora (id_jogo, id_desenvolvedora) VALUES
(1, 5),
(2, 4),
(3, 3),
(4, 2),
(5, 6),
(6, 5),
(7, 4),
(8, 3),
(9, 15),
(10, 16),
(11, 17),
(12, 17),
(13, 16),
(14, 16),
(15, 16),
(16, 16),
(17, 9);