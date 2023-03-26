package bigeschi.com.project.products.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import bigeschi.com.project.products.models.ProdutoModelo;
import bigeschi.com.project.products.models.RespostaModelo;
import bigeschi.com.project.products.repositories.ProdutoRepositorio;

@Service
public class ProdutoServico {
    
    @Autowired
    private ProdutoRepositorio pr;

    @Autowired
    private RespostaModelo rm;

    //Método para listar todos os produtos
    public Iterable<ProdutoModelo> listar()
    {
        return pr.findAll(); //Basicamente faz o seguinte: SELECT * FROM produtos
    }

    //Método para cadastrar/alterar produtos
    public ResponseEntity<?> cadastrarAlterar(ProdutoModelo pm, String acao)
    {
        if(pm.getNome().equals("")){
            rm.setMensagem("O nome do produto é obrigatório.");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }
        else if(pm.getMarca().equals("")){
            rm.setMensagem("O nome da marca é obrigatório.");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }
        else{
            if(acao.equals("cadastrar"))
                return new ResponseEntity<ProdutoModelo>(pr.save(pm), HttpStatus.CREATED);
           
            else //alterar
                return new ResponseEntity<ProdutoModelo>(pr.save(pm), HttpStatus.OK);
        }
    }

    //Método para alterar parte da requisição
    public ResponseEntity<?> alterarProduto(Long id, ProdutoModelo pm)
    {
        if(id != null)
        {            
            ProdutoModelo prod;
            prod = pr.findById(id).get();

            if(pm.getNome() != null)
            {
                prod.setNome(pm.getNome());
            }

            //Atualizar produto
            return new ResponseEntity<ProdutoModelo>(pr.save(prod), HttpStatus.OK);
        }
        else
            return null;
    }

    //Método para remover produtos
    public ResponseEntity<RespostaModelo> remover(long codigo)
    {
        pr.deleteById(codigo);
        rm.setMensagem("O produto foi removido com sucesso.");

        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }
}
