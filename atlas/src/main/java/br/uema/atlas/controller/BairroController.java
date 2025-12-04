package br.uema.atlas.controller;

import br.uema.atlas.model.Bairro;
import br.uema.atlas.repository.BairroRepository;
import java.util.List;
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
@RequestMapping({"/bairros"})
public class BairroController {
    
    private BairroRepository repository;
    
    
    // Salvando Cidade no Repository
    @PostMapping
    public Bairro create(@RequestBody Bairro bairro) {
        return repository.save(bairro);
    }
    
    
    //Lista todas as Cidades salvas no BD
    //Semelhante ao 'select * from bairro'
    @GetMapping
    public List findAll() {
        return repository.findAll();
    }
    
    
    // Retorna a Resposta HTTP para o ID informado
    // 'select * from bairro where id = ?'
    @GetMapping(path = {"/{id}"})
    public ResponseEntity<Bairro> getById(@PathVariable Long id) {
        return repository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }
    
    
    // Atualiza o registro com o ID informado
    @PutMapping(value = {"/{id}"})
    public ResponseEntity update(@PathVariable Long id, 
            @RequestBody Bairro bairro) {
        
        return repository.findById(id)
                .map(record -> {
                    record.setNome(bairro.getNome());
                    record.setCidade(bairro.getCidade());
                    record.setPopulacao(bairro.getPopulacao());
                    record.setArea(bairro.getArea());
                    
                    Bairro updatedBairro = repository.save(record);
                    return ResponseEntity.ok().body(updatedBairro);
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
