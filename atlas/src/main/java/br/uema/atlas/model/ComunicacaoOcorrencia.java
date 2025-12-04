package br.uema.atlas.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalTime;
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
@Table(name = "comunicacao_ocorrencia")
public class ComunicacaoOcorrencia {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "data_fato")
    private LocalDate dataFato;
    
    @Column(name = "hora_fato")
    private LocalTime horaFato;
    
    private String uf;
    
    @ManyToOne
    @JoinColumn(name = "id_cidade")
    private Cidade cidade;
    
    @ManyToOne
    @JoinColumn(name = "id_bairro")
    private Bairro bairro;
    
    @Column(name = "tipo_local")
    private String tipoLocal;
    
    @Column(name = "descricao_fato")
    private String descricaoFato;
    
    @ManyToOne
    @JoinColumn(name = "id_comunicante")
    private Comunicante comunicante;
    
    @ManyToOne
    @JoinColumn(name = "id_tipo_crime")
    private TipoCrime tipoCrime;
    
    private String cep;
    private String logradouro;
    private String numero;
    @Column(name = "ponto_referencia")
    private String pontoReferencia;
}
