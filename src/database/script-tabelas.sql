CREATE DATABASE HistoryIcon;

USE HistoryIcon;

CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(45),
    ativo char(1)
);

CREATE TABLE Log(
    idLog INT PRIMARY KEY AUTO_INCREMENT,
    dtHrAcesso DATETIME,
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES Usuario (idUsuario)
);

CREATE TABLE Pergunta (
    idPergunta INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    respostaCorreta VARCHAR(45)
);

CREATE TABLE Resposta (
    idResposta INT AUTO_INCREMENT,
    fkUsuario INT,
    fkPergunta INT,
    resposta VARCHAR(45),
    isCorreta CHAR(1),
    CONSTRAINT fkUsuarioResposta foreign key (fkUsuario) references Usuario (idUsuario),
    CONSTRAINT fkPerguntaResposta foreign key (fkPergunta) references Pergunta (idPergunta),
    CONSTRAINT pkResposta primary key (
        idResposta,
        fkUsuario,
        fkPergunta
    )
);

INSERT INTO
    Pergunta
VALUES (
        DEFAULT,
        "Quem criou a teoria da relatividade?",
        "Albert Einsten"
    ),
    (
        DEFAULT,
        "Qual o nome do guerreiro que inspirou a maratona?",
        "Fidípides"
    ),
    (
        DEFAULT,
        "Quem foi o matemático a chegar mais próximo de PI na idade antiga?",
        "Arquemedes"
    ),
    (
        DEFAULT,
        "Qual a velocidade da luz no vácuo?",
        "300.000.000 m/s"
    ),
    (
        DEFAULT,
        "Quem foi o primeiro astrônomo a dizer que a Terra gira em torno do Sol?",
        "Galileu Galilei"
    ),
    (
        DEFAULT,
        "Caso o Sol suma repentinamente, quanto tempo demoraria para perceber-mos?",
        "8,5 minutos"
    ),
    (
        DEFAULT,
        "Quem originou a ideia de que 2 corpos não ocupam o mesmo espaço?",
        "Isaac Newton"
    ),
    (
        DEFAULT,
        "Quem é o pai da filosofia?",
        "Tales de Mileto"
    ),
    (
        DEFAULT,
        "Quem criou a tabela periódica atual?",
        "Dmitri Mendeleiev"
    ),
    (
        DEFAULT,
        "Quem foi a primeira pessoa a escrever um algoritmo?",
        "Ada Lovelace"
    );

select * from Usuario;

select * from Resposta;

SELECT
    nome,
    (
        SUM(
            CASE
                WHEN isCorreta = 'S' THEN 1
                ELSE 0
            END
        ) / COUNT(isCorreta)
    ) * 100 AS aproveitamento
FROM Resposta
    JOIN Usuario ON Resposta.fkUsuario = Usuario.idUsuario
GROUP BY
    nome
ORDER BY aproveitamento DESC;

SELECT COUNT(isCorreta) FROM resposta WHERE isCorreta = 'S';