const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

const MongoClient = require('mongodb').MongoClient
const mongoUri =  process.env.MONGO_URL

app.use(express.static('public'))

const path = require('path')

// onde estão os templates
app.set('views', path.join(__dirname, 'views'))
// tipo de template
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('home')
})

const calculoJuros = (p, i, n) => p*Math.pow(1+i, n)

app.get('/calculadora', (req, res) => {
  const resultado = {
    calculado: false
  }
  
  if(req.query.valorInicial && req.query.taxa && req.query.tempo){
    const valorInicial = parseFloat(req.query.valorInicial)
    const taxaMensal = parseFloat(req.query.taxa)/100
    const tempo = parseInt(req.query.tempo)
    resultado.calculado = true
    var meses = Array.from(new Array(tempo), (x, i) => i + 1)

    resultado.valoresMensais = meses.map(mes => ({"mes": mes, "valor": calculoJuros(valorInicial, taxaMensal, mes)}))
    resultado.total = calculoJuros(
      valorInicial,
      taxaMensal, 
      tempo
    )
  }
  res.render('calculadora', { resultado })
})

const findAll = (db, collectionName) => {
  const collection = db.collection(collectionName)
  const cursor = collection.find({})
  const documents = []

  return new Promise((resolve, reject) => {
    cursor.forEach(
      (doc) => documents.push(doc),
      () => resolve(documents)
    )
  })
}

const insert = (db, collectionName, document) => {
  const collection = db.collection(collectionName)
  return new Promise((resolve, reject) =>{
    collection.insert(document, (err, doc) => {
      if(err){
        reject(err)
      }else{
        resolve(doc)
      }
    })
  })
}


app.get('/operacoes', async (req, res) => {
  const operacoes = await findAll(app.db, 'operacoes')
  res.render('operacoes', { operacoes })
})

// mostrar formulario
app.get('/nova-operacao', (req, res) => res.render('nova-operacao'))
app.post('/nova-operacao', async (req, res) => {
  const operacao = {
    descricao: req.body.descricao,
    valor: parseFloat(req.body.valor)
  }
  const newOperacao = await insert(app.db, 'operacoes', operacao)
  res.redirect('/operacoes')
})

MongoClient.connect(mongoUri, (err, db) => {
  if(err){
    console.log("Mongo Error")
    console.log(err)
    return
  }else{
    app.db = db
    app.listen(port, () => console.log('Server running...'))
  }
})
