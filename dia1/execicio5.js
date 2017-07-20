const fs = require("fs")

function readdirPromise(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if(err){
        reject(err)
      }else{
        resolve(files)
      }
    })
  })
}

function checkIsFile(file) {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stats) => {
      if (!err) {
        fileStat = {
          nome: file,
          ehArquivo: stats.isFile()
        }
        resolve(fileStat)
      } else {
        reject(err)
      }
    })
  })
}

async function listDir(path) {
  files = await readdirPromise(path)
  let promises = []
  for (var file in files) {
    promises.push(await checkIsFile(files[file]))
  }
  Promise.all(promises).then(teste => console.log(teste))
}

const path = "./"
listDir(path)
