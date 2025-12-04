package br.uema.atlas.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "endereco")
public class Endereco {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String uf;
    
    @ManyToOne
    @JoinColumn(name = "id_comunicante")
    private Comunicante comunicante;
    
    @ManyToOne
    @JoinColumn(name = "id_cidade")
    private Cidade cidade;
    
    @ManyToOne
    @JoinColumn(name = "id_bairro")
    private Bairro bairro;
    
    private String logradouro;
    private String numero;
    private String cep;
    private String complemento;
    
    @Column(name = "ponto_referencia")
    private String pontoReferencia;
}
