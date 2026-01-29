-- Apaga a procedure caso ela exista
DROP PROCEDURE IF EXISTS `storedprocedure_criptografar_nome`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `storedprocedure_criptografar_nome`(
	IN p_nome VARCHAR(100),
    OUT novo_nome_criptografado VARCHAR(32)
)
BEGIN
	SET novo_nome_criptografado = MD5(p_nome);
END$$
DELIMITER ;

-- Mostra a procedure criada
SHOW PROCEDURE STATUS WHERE Name = 'storedprocedure_criptografar_nome';