package br.uema.atlas.controller;

import br.uema.atlas.model.TipoCrime;
import br.uema.atlas.repository.TipoCrimeRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author pvivi
 */

@RestController
@RequestMapping({"/tipos-crime"})
public class TipoCrimeController {
    
    @Autowired
    private TipoCrimeRepository repository;
    
    
    // Salvando Cidade no Repository
    @PostMapping
    public TipoCrime create(@RequestBody TipoCrime tipoCrime) {
        return repository.save(tipoCrime);
    }
    
    
    //Lista todas as Cidades salvas no BD
    //Semelhante ao 'select * from tipo_crime'
    @GetMapping
    public List findAll() {
        return repository.findAll();
    }
    
    
    // Retorna a Resposta HTTP para o ID informado
    // 'select * from tipo_crime where id = ?'
    @GetMapping(path = {"/{id}"})
    public ResponseEntity<TipoCrime> getById(@PathVariable Long id) {
        return repository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }
    
    
    // Atualiza o registro com o ID informado
    @PutMapping(value = {"/{id}"})
    public ResponseEntity update(@PathVariable Long id, 
            @RequestBody TipoCrime tipoCrime) {
        
        return repository.findById(id)
                .map(record -> {
                    record.setNome(tipoCrime.getNome());
                    record.setCrimeViolento(tipoCrime.getCrimeViolento());
                    record.setDescricao(tipoCrime.getDescricao());
                    
                    TipoCrime updatedTipoCrime = repository.save(record);
                    return ResponseEntity.ok().body(updatedTipoCrime);
                })
                .orElse(ResponseEntity.notFound().build());
    }
 
    
    // Excluindo o Registro com o ID informado
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
