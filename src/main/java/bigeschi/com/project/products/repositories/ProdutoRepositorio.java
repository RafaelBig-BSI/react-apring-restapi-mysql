package bigeschi.com.project.products.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import bigeschi.com.project.products.models.ProdutoModelo;

@Repository
public interface ProdutoRepositorio extends CrudRepository<ProdutoModelo, Long> {
    
}
