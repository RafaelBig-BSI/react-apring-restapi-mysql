import { useEffect, useState } from 'react';
import './App.css';

import Formulario from './components/Formulario';
import Tabela from './components/Tabela';

function App() {

  //Objeto produto -> vai servir para selecionar, cadastrar, alterar e remover
  const produto = {
    codigo: 0,
    nome: '',
    marca: '',
  }

  //Hook -> useState()
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]); //indica que "produtos" será um vetor.
  
  const [objProduto, setObjProduto] = useState([produto]); //inicia o "objProduto" com "produto"

  /* UseEffect -> é um Hook que é executado quando o componente é montado.
     Então quando o formulário e a tabela forem exibidos ao usuário
     o UseEffect entra em ação, onde ele irá fazer a requisição com o back-end e
     em seguida enviar para o useState chamado "produtos".
  */
  useEffect(() => {

      fetch("http://localhost:8080/listar")
        .then(retorno => retorno.json())
        .then(retorno_convertido => setProdutos(retorno_convertido))

  }, []); //o uso do "[]" não deixa entrar em loop infinito, e sim, apenas uma vez.

  //Obtendo os dados do formulário
  /*...objProduto: pega o valor que está contendo o objeto produto (codigo, nome, marca)
    [e.target.name]: pega o nome do elemento (nome ou marca)
    [e.target.value]: pega o valor que está sendo digitado. */
  const aoDigitar = (e) => {
    setObjProduto({...objProduto, [e.target.name]:e.target.value});
  }

  //Cadastrar produto
  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar', {
      method:'post',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {

      if(typeof(retorno_convertido.mensagem) !== "undefined")
        alert(retorno_convertido.mensagem)
      else
      {
        setProdutos([...produtos, retorno_convertido]); //adiciona o novo item ao vetor "produtos"
        alert("Produto cadastrado com sucesso.");
        limparFormulario();
      }
    })
  }

  //Alterar produto
  /*const alterar = () => {
    fetch('http://localhost:8080/alterar', {
      method:'put',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {

      if(typeof(retorno_convertido.mensagem) !== "undefined")
        alert(retorno_convertido.mensagem)
      else
      {
        alert("Produto alterado com sucesso.");

        //Copia do vetor de produtos
        let vetorTemp = [...produtos];

        //Indice
        let indice = vetorTemp.findIndex((p) => { //findIndex = retorna a posição index do vetor a partir de uma condição.
          return p.codigo === objProduto.codigo;
        });

        //Alterar produto do vetorTemp
        vetorTemp[indice] = objProduto;

        //Atualizar o vetor de produtos
        setProdutos(vetorTemp);

        limparFormulario();
      }
    })
  }*/

  //Alterar parte do produto - PATCH
  const alterar = () => {

    console.log(objProduto.codigo);

    fetch('http://localhost:8080/alterar/'+objProduto.codigo, {
      method:'PATCH',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {

      if(typeof(retorno_convertido.mensagem) !== "undefined")
        alert(retorno_convertido.mensagem)
      else
      {
        alert("Produto alterado com sucesso.");

        //Copia do vetor de produtos
        let vetorTemp = [...produtos];

        //Indice
        let indice = vetorTemp.findIndex((p) => { //findIndex = retorna a posição index do vetor a partir de uma condição.
          return p.codigo === objProduto.codigo;
        });

        //Alterar produto do vetorTemp
        vetorTemp[indice] = objProduto;

        //Atualizar o vetor de produtos
        setProdutos(vetorTemp);

        limparFormulario();
      }
    })
  }

  //Remover produto
  const remover = () => {
    fetch('http://localhost:8080/remover/'+objProduto.codigo, {
      method:'delete',
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {

      alert(retorno_convertido.mensagem);
      
      //Copia do vetor de produtos
      let vetorTemp = [...produtos];

      //Indice
      let indice = vetorTemp.findIndex((p) => { //findIndex = retorna a posição index do vetor a partir de uma condição.
        return p.codigo === objProduto.codigo;
      });

      //Remover produto do vetorTemp
      vetorTemp.splice(indice, 1); //começa do indice e remove apenas 1 produto (que é ele mesmo).

      //Atualizar o vetor de produtos
      setProdutos(vetorTemp);

      limparFormulario();
    })
  }

  //Selecionar produto
  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  }

  //Limpar formulário
  const limparFormulario = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

  return (
    <div>
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objProduto} cancelar={limparFormulario} remover={remover} alterar={alterar} />
      <Tabela vetor={produtos} selecionar={selecionarProduto} />
    </div>
  );
}

export default App;
