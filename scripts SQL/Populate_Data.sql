-- ====================================================
-- Script de População de Dados - Sistema Atlas
-- Gera dados de Cidades, Bairros e Tipos de Crime
-- ====================================================

USE atlas;

-- ====================================================
-- 1. INSERÇÃO DE CIDADES
-- ====================================================

INSERT INTO cidade (nome, uf) VALUES
('São Luís', 'MA'),
('Imperatriz', 'MA'),
('Caxias', 'MA'),
('Timon', 'MA'),
('Codó', 'MA'),
('Paço do Lumiar', 'MA'),
('São José de Ribamar', 'MA'),
('Bacabal', 'MA'),
('Açailândia', 'MA'),
('Santa Inês', 'MA');

-- ====================================================
-- 2. INSERÇÃO DE BAIRROS (São Luís)
-- ====================================================

-- Bairros de São Luís (ID = 1)
INSERT INTO bairro (nome, id_cidade) VALUES
-- Região Central
('Centro', 1),
('Praia Grande', 1),
('Monte Castelo', 1),
('Fátima', 1),
('João Paulo', 1),
('Renascença', 1),
('Calhau', 1),
('Olho d''Água', 1),
('São Francisco', 1),
('Areinha', 1),

-- Região do Vinhais
('Vinhais', 1),
('Cohab', 1),
('Turu', 1),
('Bequimão', 1),

-- Região da Cohama
('Cohama', 1),
('Cohatrac', 1),
('Planalto Anil', 1),

-- Outros bairros
('Jardim Renascença', 1),
('Ponta d''Areia', 1),
('São Marcos', 1),
('Vila Palmeira', 1),
('Cidade Operária', 1),
('Liberdade', 1),
('Jaracaty', 1),
('Anjo da Guarda', 1);

-- Bairros de Imperatriz (ID = 2)
INSERT INTO bairro (nome, id_cidade) VALUES
('Centro', 2),
('Nova Imperatriz', 2),
('Bacuri', 2),
('Santa Rita', 2),
('Maranhão Novo', 2),
('Jardim Três Poderes', 2),
('Vila Lobão', 2),
('Cafeteira', 2);

-- Bairros de Caxias (ID = 3)
INSERT INTO bairro (nome, id_cidade) VALUES
('Centro', 3),
('Teso D''Ouro', 3),
('Ponte', 3),
('Itapecuruzinho', 3),
('Caldeirões', 3);

-- Bairros de Timon (ID = 4)
INSERT INTO bairro (nome, id_cidade) VALUES
('Centro', 4),
('Parque Piauí', 4),
('Formosa', 4),
('São Benedito', 4),
('Cidade Nova', 4);

-- Bairros de Codó (ID = 5)
INSERT INTO bairro (nome, id_cidade) VALUES
('Centro', 5),
('São Sebastião', 5),
('Trezidela', 5),
('Vila Nova', 5);

-- Bairros de Paço do Lumiar (ID = 6)
INSERT INTO bairro (nome, id_cidade) VALUES
('Centro', 6),
('Maiobão', 6),
('Maiobinha', 6),
('Vila Embratel', 6),
('Quebra Pote', 6);

-- Bairros de São José de Ribamar (ID = 7)
INSERT INTO bairro (nome, id_cidade) VALUES
('Centro', 7),
('Ponta da Espera', 7),
('Araçagy', 7),
('Porto Grande', 7);

-- Bairros de Bacabal (ID = 8)
INSERT INTO bairro (nome, id_cidade) VALUES
('Centro', 8),
('Vila Altamira', 8),
('Olaria', 8),
('Bom Jesus', 8);

-- Bairros de Açailândia (ID = 9)
INSERT INTO bairro (nome, id_cidade) VALUES
('Centro', 9),
('Pequiá', 9),
('Vila Ildemar', 9),
('Tropical', 9);

-- Bairros de Santa Inês (ID = 10)
INSERT INTO bairro (nome, id_cidade) VALUES
('Centro', 10),
('Novo Horizonte', 10),
('Vila Nova', 10),
('Industrial', 10);

-- ====================================================
-- 3. INSERÇÃO DE TIPOS DE CRIME
-- ====================================================

INSERT INTO tipo_crime (nome, descricao, crime_violento) VALUES
-- Crimes contra a pessoa (violentos)
('Homicídio Simples', 'Art. 121 - Matar alguém', 1),
('Homicídio Qualificado', 'Art. 121, §2º - Homicídio com qualificadoras', 1),
('Lesão Corporal Leve', 'Art. 129 - Ofender a integridade corporal ou a saúde de outrem', 1),
('Lesão Corporal Grave', 'Art. 129, §1º - Lesão corporal com resultado grave', 1),
('Ameaça', 'Art. 147 - Ameaçar alguém, por palavra, escrito ou gesto', 0),
('Injúria', 'Art. 140 - Injuriar alguém, ofendendo-lhe a dignidade ou o decoro', 0),
('Calúnia', 'Art. 138 - Caluniar alguém, imputando-lhe falsamente fato definido como crime', 0),
('Difamação', 'Art. 139 - Difamar alguém, imputando-lhe fato ofensivo à sua reputação', 0),

-- Crimes contra o patrimônio
('Furto Simples', 'Art. 155 - Subtrair, para si ou para outrem, coisa alheia móvel', 0),
('Furto Qualificado', 'Art. 155, §4º - Furto com qualificadoras (escalada, destreza, rompimento de obstáculo)', 0),
('Roubo', 'Art. 157 - Subtrair coisa móvel alheia, mediante grave ameaça ou violência', 1),
('Roubo Qualificado', 'Art. 157, §2º - Roubo com arma, concurso de pessoas ou restrição de liberdade', 1),
('Extorsão', 'Art. 158 - Constranger alguém, mediante violência ou grave ameaça, a fazer ou deixar de fazer algo', 1),
('Estelionato', 'Art. 171 - Obter, para si ou para outrem, vantagem ilícita, em prejuízo alheio', 0),
('Dano ao Patrimônio', 'Art. 163 - Destruir, inutilizar ou deteriorar coisa alheia', 0),
('Apropriação Indébita', 'Art. 168 - Apropriar-se de coisa alheia móvel de que tem a posse ou a detenção', 0),
('Receptação', 'Art. 180 - Adquirir, receber, transportar, conduzir ou ocultar coisa produto de crime', 0),

-- Crimes contra a dignidade sexual (violentos)
('Estupro', 'Art. 213 - Constranger alguém, mediante violência ou grave ameaça, a ter conjunção carnal', 1),
('Assédio Sexual', 'Art. 216-A - Constranger alguém com o intuito de obter vantagem ou favorecimento sexual', 0),
('Importunação Sexual', 'Art. 215-A - Praticar ato libidinoso sem consentimento', 1),

-- Crimes contra a liberdade (violentos)
('Sequestro', 'Art. 148 - Privar alguém de sua liberdade, mediante sequestro ou cárcere privado', 1),
('Cárcere Privado', 'Art. 148 - Privar alguém de sua liberdade', 1),
('Constrangimento Ilegal', 'Art. 146 - Constranger alguém, mediante violência ou grave ameaça', 1),

-- Crimes de trânsito
('Embriaguez ao Volante', 'Art. 306 CTB - Conduzir veículo sob influência de álcool ou substância psicoativa', 0),
('Lesão Corporal no Trânsito', 'Art. 303 CTB - Praticar lesão corporal culposa na direção de veículo', 1),
('Homicídio no Trânsito', 'Art. 302 CTB - Praticar homicídio culposo na direção de veículo', 1),
('Fuga do Local', 'Art. 305 CTB - Afastar-se do local do acidente', 0),

-- Crimes contra a fé pública
('Falsificação de Documento', 'Art. 297 - Falsificar, no todo ou em parte, documento público', 0),
('Uso de Documento Falso', 'Art. 304 - Fazer uso de documento que sabe ser falso', 0),
('Falsa Identidade', 'Art. 307 - Atribuir-se ou atribuir a terceiro falsa identidade', 0),

-- Crimes relacionados a drogas
('Tráfico de Drogas', 'Art. 33 Lei 11.343/06 - Importar, exportar, remeter, preparar, produzir, fabricar, adquirir, vender, expor à venda, oferecer, ter em depósito, transportar, trazer consigo, guardar, prescrever, ministrar, entregar a consumo ou fornecer drogas', 1),
('Associação para o Tráfico', 'Art. 35 Lei 11.343/06 - Associarem-se duas ou mais pessoas para o fim de praticar tráfico', 1),
('Posse de Drogas para Consumo', 'Art. 28 Lei 11.343/06 - Adquirir, guardar, ter em depósito, transportar ou trazer consigo drogas para consumo pessoal', 0),

-- Crimes contra a administração pública
('Corrupção Ativa', 'Art. 333 - Oferecer ou prometer vantagem indevida a funcionário público', 0),
('Corrupção Passiva', 'Art. 317 - Solicitar ou receber vantagem indevida sendo funcionário público', 0),
('Peculato', 'Art. 312 - Apropriar-se de dinheiro, valor ou bem móvel público', 0),
('Prevaricação', 'Art. 319 - Retardar ou deixar de praticar ato de ofício para satisfazer interesse ou sentimento pessoal', 0),

-- Crimes diversos
('Porte Ilegal de Arma', 'Art. 14 Lei 10.826/03 - Portar, deter, adquirir, fornecer, receber, ter em depósito arma de fogo', 0),
('Desacato', 'Art. 331 - Desacatar funcionário público no exercício da função', 0),
('Desobediência', 'Art. 330 - Desobedecer a ordem legal de funcionário público', 0),
('Violência Doméstica', 'Lei 11.340/06 - Violência física, psicológica, sexual, patrimonial ou moral contra mulher no âmbito doméstico', 1),
('Racismo', 'Lei 7.716/89 - Praticar, induzir ou incitar a discriminação ou preconceito de raça, cor, etnia, religião ou procedência nacional', 0),
('Perturbação do Sossego', 'Art. 42 LCP - Perturbar alguém o trabalho ou o sossego alheios', 0),
('Vias de Fato', 'Art. 21 LCP - Praticar vias de fato contra alguém', 1);

-- ====================================================
-- 4. VERIFICAÇÃO DOS DADOS INSERIDOS
-- ====================================================

SELECT '========== RESUMO DA INSERÇÃO ==========' AS '';

SELECT CONCAT('Total de Cidades: ', COUNT(*)) AS resultado FROM cidade;
SELECT CONCAT('Total de Bairros: ', COUNT(*)) AS resultado FROM bairro;
SELECT CONCAT('Total de Tipos de Crime: ', COUNT(*)) AS resultado FROM tipo_crime;

SELECT '' AS '';
SELECT '========== CIDADES CADASTRADAS ==========' AS '';
SELECT id, nome, uf FROM cidade ORDER BY nome;

SELECT '' AS '';
SELECT '========== BAIRROS POR CIDADE ==========' AS '';
SELECT 
    c.nome AS cidade,
    COUNT(b.id) AS total_bairros
FROM cidade c
LEFT JOIN bairro b ON b.id_cidade = c.id
GROUP BY c.id, c.nome
ORDER BY c.nome;

SELECT '' AS '';
SELECT '========== TIPOS DE CRIME ==========' AS '';
SELECT id, nome, descricao, crime_violento FROM tipo_crime ORDER BY nome;
