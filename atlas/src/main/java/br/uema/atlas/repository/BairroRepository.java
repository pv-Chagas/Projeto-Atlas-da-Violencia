package br.uema.atlas.repository;

import br.uema.atlas.model.Bairro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author pvivi
 */

@Repository
public interface BairroRepository extends JpaRepository<Bairro, Long>
{}
