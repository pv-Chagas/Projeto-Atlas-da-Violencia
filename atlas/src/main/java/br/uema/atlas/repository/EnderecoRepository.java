package br.uema.atlas.repository;

import br.uema.atlas.model.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author pvivi
 */

@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, Long>
{}
