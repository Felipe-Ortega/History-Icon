CREATE DATABASE HistoryIcon;
USE HistoryIcon;
CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45)NOT NULL,
    senha VARCHAR(45)NOT NULL,
    ativo char(1) NOT NULL
);

CREATE TABLE Log (
    idLog INT PRIMARY KEY AUTO_INCREMENT,
    dtHrAcesso DATETIME NOT NULL,
    fkUsuario INT NOT NULL,
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario)
);
CREATE TABLE Pergunta(
	idPergunta INT PRIMARY KEY AUTO_INCREMENT,
    opt1 VARCHAR(45) NOT NULL,
    opt2 VARCHAR(45) NOT NULL,
    opt3 VARCHAR(45) NOT NULL,
	opt4 VARCHAR(45) NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    respostaCorreta VARCHAR(45) NOT NULL
);

CREATE TABLE Resposta (
    idResposta INT AUTO_INCREMENT,
    fkUsuario INT NOT NULL,
    fkPergunta INT NOT NULL,
    resposta VARCHAR(45) NOT NULL,
    isCorreta CHAR(1) NOT NULL,
    CONSTRAINT fkUsuarioResposta foreign key (fkUsuario) references Usuario(idUsuario),
    CONSTRAINT fkPerguntaResposta foreign key (fkPergunta) references Pergunta(idPergunta),
    CONSTRAINT pkResposta primary key (idResposta, fkUsuario, fkPergunta)
);
select * from pergunta;
INSERT INTO Pergunta (opt1, opt2, opt3, opt4, titulo, respostaCorreta) VALUES
( 'Isaac Newton', 'Max Planck', 'James Maxwell', 'Albert Einsten', 'Quem criou a teoria da relatividade?', 'Albert Einsten'),
( 'Fidípides', 'Leônidas', 'Lisandro', 'Brásidas', 'Qual o nome do guerreiro que inspirou a maratona?', 'Fidípides'),
( 'Pitágoras', 'Aristóteles', 'Arquemedes', 'Euclides', 'Quem foi o matemático a chegar mais próximo de PI na idade antiga?', 'Arquemedes'),
( '300.000.000 m/s', '300.000.000 km/h', '1.200.000 m/s', '1.200.000 km/s', 'Qual a velocidade da luz no vácuo?', '300.000.000 m/s'),
( 'Johannes Kepler', 'Galileu Galilei', 'Nicolau Copérnico', 'Cristóvão Colombo', 'Quem foi o primeiro astrônomo a dizer que a Terra gira em torno do Sol?', 'Nicolau Copérnico'),
( '5 minutos', '7 minutos', '8,5 minutos', '12,5 minutos', 'Caso o Sol suma repentinamente, quanto tempo demoraria para perceber-mos?', '8,5 minutos'),
( 'Huygens', 'Isaac Newton', 'Carl Sagan', 'Euler', 'Quem originou a ideia de que 2 corpos não ocupam o mesmo espaço?', 'Isaac Newton'),
( 'Tales de Mileto', 'Sócrates', 'Platão', 'Marcos Aurélio', 'Quem é o pai da filosofia?', 'Tales de Mileto'),
('Antoine Lavoisier', 'Dmitri Mendeleiev', 'John Dalton', 'Rutherford', 'Quem criou a tabela periódica atual?', 'Dmitri Mendeleiev'),
('Bill Gates', 'Alan Turing', 'Steve Jobs', 'Ada Lovelace', 'Quem foi a primeira pessoa a escrever um algoritmo?', 'Ada Lovelace');

CREATE TABLE Log_resposta (
    idLog INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dtHrResposta DATE,
    fkPergunta INT NOT NULL,
    fkUsuario INT NOT NULL,
    fkResposta INT NOT NULL,
    FOREIGN KEY (fkPergunta) REFERENCES Pergunta(idPergunta),
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (fkResposta) REFERENCES Resposta(idResposta)
);
select * from Resposta;
select * from Pergunta;
DESC Log_resposta;
select * from Log_resposta;
select * from Usuario;
SELECT 	idPergunta, opt1, opt2, opt3, opt4, titulo, respostaCorreta FROM Pergunta ORDER BY RAND()
LIMIT 10;
SELECT COUNT(isCorreta) FROM resposta WHERE isCorreta = 'S';

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
FROM Resposta JOIN Usuario 
    ON Resposta.fkUsuario = Usuario.idUsuario
    JOIN Log_resposta
    ON Resposta.idResposta = Log_resposta.fkResposta
    WHERE dtHrResposta >= DATE(NOW() - INTERVAL 30 DAY)
GROUP BY
    nome
ORDER BY aproveitamento DESC;
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
FROM Resposta JOIN Usuario 
    ON Resposta.fkUsuario = Usuario.idUsuario
    JOIN Log_resposta
    ON Resposta.idResposta = Log_resposta.fkResposta
    WHERE dtHrResposta >= DATE(NOW() - INTERVAL 30 DAY)
GROUP BY
    nome
ORDER BY aproveitamento DESC;
select * from Log_resposta;