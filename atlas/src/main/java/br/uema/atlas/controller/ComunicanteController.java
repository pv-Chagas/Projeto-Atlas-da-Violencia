package br.uema.atlas.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.uema.atlas.model.Comunicante;
import br.uema.atlas.repository.ComunicanteRepository;

@RestController
@RequestMapping({"/comunicantes"})
public class ComunicanteController {

    @Autowired
    private ComunicanteRepository repository;

    @PostMapping
    public Comunicante create(@RequestBody Comunicante comunicante) {
        return repository.save(comunicante);
    }

    @GetMapping
    public List findAll() {
        return repository.findAll();
    }

    @GetMapping(path = {"/{id}"})
    public ResponseEntity<Comunicante> getById(@PathVariable Long id) {
        return repository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping(value = {"/{id}"})
    public ResponseEntity update(@PathVariable Long id, 
            @RequestBody Comunicante comunicante) {

        return repository.findById(id)
                .map(record -> {
                    record.setNome(comunicante.getNome());
                    record.setEnvolvimento(comunicante.getEnvolvimento());
                    record.setNomeMae(comunicante.getNomeMae());
                    record.setNomePai(comunicante.getNomePai());
                    record.setDtNasc(comunicante.getDtNasc());
                    record.setEstadoCivil(comunicante.getEstadoCivil());
                    record.setEtnia(comunicante.getEtnia());
                    record.setSexo(comunicante.getSexo());
                    record.setCpf(comunicante.getCpf());
                    record.setNacionalidade(comunicante.getNacionalidade());
                    record.setCidade(comunicante.getCidade());
                    record.setTelefone(comunicante.getTelefone());
                    record.setEmail(comunicante.getEmail());

                    Comunicante updated = repository.save(record);
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
