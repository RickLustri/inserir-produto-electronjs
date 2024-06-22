var form = document.getElementById('form')
var alert = document.getElementById('alert')

var nome = document.getElementById('name')
var quantidade = document.getElementById('quantidade')
var produto = document.getElementById('produto')
var marca = document.getElementById('marca')

var mysql = require('mysql2');


const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'logistica'
})

function conectarMySql() {
  conexao.connect((error) => {
    if (error) {
      console.log(error.code)
      console.log(error.fatal)
    } else {
      console.log('Conectado ao MySQL')
    }
  })
}


function inserirProdutos(event) {


  conectarMySql();
  event.preventDefault();


  console.log(nome.value, quantidade.value, produto.value, marca.value)

  if (nome.value == '' || quantidade.value == '' || produto.value == '' || marca.value == '') {
    alert.innerText = 'Preencha todos os campos'
    return;
  } else {
    var query = `INSERT INTO produto (nome, quantidade, codigo_produto, marca) VALUES ('${nome.value}', '${quantidade.value}', '${produto.value}', '${marca.value}')`
    conexao.query(query, (error) => {
      if (error) {
        console.log("Erro ao inseririr o produto", error)
      } else {
        console.log('Inserido com sucesso')
        limparTexto();
      }
    })
  }
}

function limparTexto() {
  document.getElementById('name').value = ''
  document.getElementById('quantidade').value = ''
  document.getElementById('produto').value = ''
  document.getElementById('marca').value = ''
}
function aviso() {
  alert.innerText = ''
}

nome.addEventListener('keydown', aviso)
quantidade.addEventListener('keydown', aviso)
produto.addEventListener('keydown', aviso)
marca.addEventListener('keydown', aviso)
form.addEventListener('submit', inserirProdutos)

