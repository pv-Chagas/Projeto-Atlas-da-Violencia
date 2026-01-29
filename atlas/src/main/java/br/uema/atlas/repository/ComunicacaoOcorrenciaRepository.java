package br.uema.atlas.repository;

import br.uema.atlas.model.ComunicacaoOcorrencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author pvivi
 */

@Repository
public interface ComunicacaoOcorrenciaRepository extends JpaRepository<ComunicacaoOcorrencia, Long>
{}
