package br.uema.atlas.repository;

import br.uema.atlas.model.TipoCrime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author pvivi
 */

@Repository
public interface TipoCrimeRepository extends JpaRepository<TipoCrime, Long>
{}
