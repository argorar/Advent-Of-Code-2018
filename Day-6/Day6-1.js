const fs = require('fs')
const input = fs.readFileSync('assets/coordinates', 'utf-8')

var formatedInput = input.trim()
                .split('\n')               

var matriz =[[0]]
for (let index = 0; index < formatedInput.length; index++) {
    let coordinates = formatedInput[index].match(/(\d+), (\d+)/)
    let x=coordinates[1]
    let y=coordinates[2]
    if(matriz[x]===undefined)
        matriz[x]=[]
    matriz[x][y]= "X"     
}
console.log(matriz)