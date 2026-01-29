package br.uema.atlas.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.uema.atlas.model.ComunicacaoOcorrencia;
import br.uema.atlas.repository.ComunicacaoOcorrenciaRepository;

@RestController
@RequestMapping({"/ocorrencias"})
public class ComunicacaoOcorrenciaController {

    @Autowired
    private ComunicacaoOcorrenciaRepository repository;

    @PostMapping
    public ComunicacaoOcorrencia create(@RequestBody ComunicacaoOcorrencia ocorrencia) {
        return repository.save(ocorrencia);
    }

    @GetMapping
    public List findAll() {
        return repository.findAll();
    }

    @GetMapping(path = {"/{id}"})
    public ResponseEntity<ComunicacaoOcorrencia> getById(@PathVariable Long id) {
        return repository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping(value = {"/{id}"})
    public ResponseEntity update(@PathVariable Long id, 
            @RequestBody ComunicacaoOcorrencia ocorrencia) {

        return repository.findById(id)
                .map(record -> {
                    record.setDataFato(ocorrencia.getDataFato());
                    record.setHoraFato(ocorrencia.getHoraFato());
                    record.setUf(ocorrencia.getUf());
                    record.setCidade(ocorrencia.getCidade());
                    record.setBairro(ocorrencia.getBairro());
                    record.setTipoLocal(ocorrencia.getTipoLocal());
                    record.setDescricaoFato(ocorrencia.getDescricaoFato());
                    record.setComunicante(ocorrencia.getComunicante());
                    record.setTipoCrime(ocorrencia.getTipoCrime());
                    record.setCep(ocorrencia.getCep());
                    record.setLogradouro(ocorrencia.getLogradouro());
                    record.setNumero(ocorrencia.getNumero());
                    record.setPontoReferencia(ocorrencia.getPontoReferencia());

                    ComunicacaoOcorrencia updated = repository.save(record);
                    return ResponseEntity.ok().body(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping(path = {"/{id}"})
    public ResponseEntity delete(@PathVariable Long id) {
        return repository.findById(id)
                .map(record -> {
                    repository.deleteById(id);
                    return ResponseEntity.ok().body(record);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
