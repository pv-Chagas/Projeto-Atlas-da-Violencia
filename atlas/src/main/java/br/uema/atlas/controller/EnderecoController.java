package br.uema.atlas.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.uema.atlas.model.Endereco;
import br.uema.atlas.repository.EnderecoRepository;

@RestController
@RequestMapping({"/enderecos"})
public class EnderecoController {

    @Autowired
    private EnderecoRepository repository;

    @PostMapping
    public Endereco create(@RequestBody Endereco endereco) {
        return repository.save(endereco);
    }

    @GetMapping
    public List findAll() {
        return repository.findAll();
    }

    @GetMapping(path = {"/{id}"})
    public ResponseEntity<Endereco> getById(@PathVariable Long id) {
        return repository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping(value = {"/{id}"})
    public ResponseEntity update(@PathVariable Long id, 
            @RequestBody Endereco endereco) {

        return repository.findById(id)
                .map(record -> {
                    record.setUf(endereco.getUf());
                    record.setComunicante(endereco.getComunicante());
                    record.setCidade(endereco.getCidade());
                    record.setBairro(endereco.getBairro());
                    record.setLogradouro(endereco.getLogradouro());
                    record.setNumero(endereco.getNumero());
                    record.setCep(endereco.getCep());
                    record.setComplemento(endereco.getComplemento());
                    record.setPontoReferencia(endereco.getPontoReferencia());

                    Endereco updated = repository.save(record);
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
