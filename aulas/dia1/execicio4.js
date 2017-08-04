const fs =require("fs")

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

async function listDir(path) {
  files = await readdirPromise(path)
  console.log(files)
}

const path = "./"
listDir(path)