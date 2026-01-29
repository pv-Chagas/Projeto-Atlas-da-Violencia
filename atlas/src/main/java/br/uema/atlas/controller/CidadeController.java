package br.uema.atlas.controller;

import br.uema.atlas.model.Cidade;
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
import br.uema.atlas.repository.CidadeRepository;

/**
 *
 * @author pvivi
 */

@RestController
@RequestMapping({"/cidades"})
public class CidadeController {
    
    @Autowired
    private CidadeRepository repository;
    
    
    // Salvando Cidade no Repository
    @PostMapping
    public Cidade create(@RequestBody Cidade cidade) {
        return repository.save(cidade);
    }
    
    
    //Lista todas as Cidades salvas no BD
    //Semelhante ao 'select * from cidade'
    @GetMapping
    public List findAll() {
        return repository.findAll();
    }
    
    
    // Retorna a Resposta HTTP para o ID informado
    // 'select * from cidade where id = ?'
    @GetMapping(path = {"/{id}"})
    public ResponseEntity<Cidade> getById(@PathVariable Long id) {
        return repository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }
    
    
    // Atualiza o registro com o ID informado
    @PutMapping(value = {"/{id}"})
    public ResponseEntity update(@PathVariable Long id, 
            @RequestBody Cidade cidade) {
        
        return repository.findById(id)
                .map(record -> {
                    record.setNome(cidade.getNome());
                    record.setUf(cidade.getUf());
                    record.setArea(cidade.getArea());
                    
                    Cidade updatedCidade = repository.save(record);
                    return ResponseEntity.ok().body(updatedCidade);
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
