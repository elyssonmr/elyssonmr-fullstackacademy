const produtos = [
  {
    id: 1,
    preco: 10.0,
    qtd: 2
  },
  {
    id: 2,
    preco: 10.0,
    qtd: 2
  },
  {
    id: 3,
    preco: 10.0,
    qtd: 2
  },
  {
    id: 4,
    preco: 10.0,
    qtd: 0
  }
]

const prodQtdMaiorZero = produtos.filter(produto => produto.qtd > 0)
console.log("Produtos Qtd > 0:\n", prodQtdMaiorZero)

const produtoSubTotais = produtos.map(prod => {
  return {id: prod.id, subtotal: prod.qtd * prod.preco}
})
console.log("Subtotais:\n", produtoSubTotais)

const precos = produtoSubTotais.map(prod => prod.subtotal)
const somatorioSubtotais = precos.reduce(
  (anterior, atual) => {
    return atual + anterior
  }, 0)
console.log("Somatório:\n", somatorioSubtotais)
