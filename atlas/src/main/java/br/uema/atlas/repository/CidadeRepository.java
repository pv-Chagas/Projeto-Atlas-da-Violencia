package br.uema.atlas.repository;

import br.uema.atlas.model.Cidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author pvivi
 */

@Repository
public interface CidadeRepository extends JpaRepository<Cidade, Long>
{}
