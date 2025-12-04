CREATE DATABASE atlas;
USE atlas;

-- CIDADES --
CREATE TABLE cidade (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    uf CHAR(2) NOT NULL,
    area FLOAT, 

    PRIMARY KEY (id)
);

-- BAIRROS --
CREATE TABLE bairro (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    id_cidade BIGINT NOT NULL,
    populacao INT,
    area FLOAT,

    PRIMARY KEY (id),
    FOREIGN KEY (id_cidade) REFERENCES cidade(id)
);

-- TIPOS DE CRIME --
CREATE TABLE tipo_crime (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    crime_violento BOOL NOT NULL,
    descricao VARCHAR(256),

    PRIMARY KEY (id)
);

-- ENDEREÇO DO COMUNICANTE --
CREATE TABLE endereco (
    id BIGINT NOT NULL AUTO_INCREMENT,
    uf CHAR(2) NOT NULL,
    id_cidade BIGINT NOT NULL,
    id_bairro BIGINT NOT NULL,
    logradouro VARCHAR(200) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    cep CHAR(9) NOT NULL,
    complemento VARCHAR(200),
    ponto_referencia VARCHAR(200),
    id_comunicante BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (id_cidade) REFERENCES cidade(id),
    FOREIGN KEY (id_bairro) REFERENCES bairro(id),
    FOREIGN KEY (id_comunicante) REFERENCES comunicante(id)
);

-- CADASTRO DE COMUNICANTES --
CREATE TABLE comunicante (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    envolvimento VARCHAR(40) NOT NULL,
    nome_mae VARCHAR(100) NOT NULL,
    nome_pai VARCHAR(100),
    dt_nasc DATE NOT NULL,
    estado_civil VARCHAR(20) NOT NULL,
    etnia VARCHAR(20) NOT NULL,
    sexo CHAR(1) NOT NULL,
    cpf CHAR(11) NOT NULL,
    nacionalidade VARCHAR(50) NOT NULL,
    id_cidade BIGINT NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(150),

    PRIMARY KEY (id),
    FOREIGN KEY (id_cidade) REFERENCES cidade(id)
);

-- COMUNICAÇÃO DE OCORRÊNCIA --
CREATE TABLE comunicacao_ocorrencia (
    id BIGINT NOT NULL AUTO_INCREMENT,
    data_fato DATE NOT NULL,
    hora_fato TIME NOT NULL,
    uf CHAR(2) NOT NULL,
    id_cidade BIGINT NOT NULL,
    id_bairro BIGINT NOT NULL,
    tipo_local VARCHAR(100) NOT NULL,
    descricao_fato VARCHAR(500) NOT NULL,
    id_comunicante BIGINT NOT NULL,
    id_tipo_crime BIGINT NOT NULL,
    cep CHAR(9),
    logradouro VARCHAR(200),
    numero VARCHAR(20),
    ponto_referencia VARCHAR(200),

    PRIMARY KEY (id),
    FOREIGN KEY (id_cidade) REFERENCES cidade(id),
    FOREIGN KEY (id_tipo_crime) REFERENCES tipo_crime(id),
    FOREIGN KEY (id_bairro) REFERENCES bairro(id),
    FOREIGN KEY (id_comunicante) REFERENCES comunicante(id)
);
