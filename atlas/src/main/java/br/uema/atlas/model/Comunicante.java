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
@Table(name = "comunicante")
public class Comunicante {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String envolvimento;
    
    @Column(name = "nome_mae")
    private String nomeMae;
    
    @Column(name = "nome_pai")
    private String nomePai;
    
    @Column(name = "dt_nasc")
    private LocalDate dtNasc;
    
    @Column(name = "estado_civil")
    private String estadoCivil;
    private String etnia;
    private String sexo;
    private String cpf;
    private String nacionalidade;
    
    @ManyToOne
    @JoinColumn(name = "id_cidade")
    private Cidade cidade;
    
    private String telefone;
    private String email;
}
