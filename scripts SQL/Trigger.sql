-- Apaga o trigger caso ele exista
DROP TRIGGER IF EXISTS `gatilho_criptografar_nome`;

delimiter $$
CREATE DEFINER = CURRENT_USER TRIGGER `gatilho_criptografar_nome` BEFORE INSERT ON `comunicante` FOR EACH ROW
BEGIN
	CALL storedprocedure_criptografar_nome(NEW.nome, @nome_hash);
    SET NEW.nome = @nome_hash;
END$$
delimiter ;

-- Mostra o Trigger
SHOW TRIGGERS LIKE 'comunicante%';