package br.uema.atlas.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author pvivi
 */

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "tipo_crime")
public class TipoCrime {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    
    @Column(name = "crime_violento")
    private Boolean crimeViolento;
    private String descricao;
}
