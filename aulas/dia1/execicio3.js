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

const path = "./"
readdirPromise(path).then(files => console.log(files))