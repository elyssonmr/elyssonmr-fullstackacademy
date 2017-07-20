const produtos = [
  {
    nome: 'Bicicleta',
    preco: 1200.0
  },
  {
    nome: 'Capacete',
    preco: 450.0
  }
]

const valores = produtos.map(produto => produto.preco)
const soma = (anterior, atual) => anterior + atual

const total = valores.reduce(soma, 0)
console.log(total)