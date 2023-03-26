package bigeschi.com.project.products.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import bigeschi.com.project.products.models.ProdutoModelo;
import bigeschi.com.project.products.models.RespostaModelo;
import bigeschi.com.project.products.services.ProdutoServico;

@RestController
@CrossOrigin(origins = "*")
public class ProdutoControle {
    
    @Autowired
    private ProdutoServico ps;

    @DeleteMapping("/remover/{codigo}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long codigo)
    {
        return ps.remover(codigo);
    }

    @PutMapping("/alterar")
    public ResponseEntity<?> alterar(@RequestBody ProdutoModelo pm)
    {
        return ps.cadastrarAlterar(pm, "alterar");
    }

    @PatchMapping("/alterar/{id}")
    public ResponseEntity<?> alterarProduto(@PathVariable Long id, @RequestBody ProdutoModelo pm)
    {
        return ps.alterarProduto(id, pm);
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody ProdutoModelo pm)
    {
        return ps.cadastrarAlterar(pm, "cadastrar");
    }


    @GetMapping("/listar")
    public Iterable<ProdutoModelo> listar()
    {
        return ps.listar();
    }

    @GetMapping("/")
    public String rota(){
        return "API de produtos funcionando.";
    }
}
