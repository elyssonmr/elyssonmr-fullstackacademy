const express = require('express')
const app = express()

const port = 3000

app.get('/somar', (request, response) => {
  console.log(request.query)
  let resultado = 0
  if(request.query && request.query.num1 && request.query.num2) {
    resultado = parseInt(request.query.num1) + parseInt(request.query.num2)
  }
  response.send("A soma é: " + resultado)
})

app.listen(port, () => console.log('Server running on ' + port))