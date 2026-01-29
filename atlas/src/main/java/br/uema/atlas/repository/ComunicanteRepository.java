package br.uema.atlas.repository;

import br.uema.atlas.model.Comunicante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author pvivi
 */

@Repository
public interface ComunicanteRepository extends JpaRepository<Comunicante, Long>
{}
