const fs = require('fs')
const input = fs.readFileSync('assets/claimsAreas', 'utf-8')

var formatedInput = input.trim()
                           .split('\n')
                           .map(string => string)

var fabric = new Map()
var counter=0
formatedInput.forEach(element => {
    let aux = element.split(" ")
    let auxLocation = aux[2].replace(":","").split(",")
    let auxSize= aux[3].split("x")
    var box ={ left: parseInt(auxLocation[0]),
               top:  parseInt(auxLocation[1]),
               wide: parseInt(auxSize[0]),
               tall: parseInt(auxSize[1])}
    let auxTop =box.top
    let auxLeft=box.left
    for (let i = 0; i < box.wide; i++) {
        for (let j = 0; j < box.tall; j++) {
            let coordenada = auxTop+"-"+auxLeft
            if(fabric.has(coordenada))
                fabric.set(coordenada,2)
            else
                fabric.set(coordenada,1)
            auxLeft++            
        }
        auxLeft=box.left   
        auxTop++
    }    
})
fabric.forEach(coordenada => {
    if(coordenada>1)
        counter++
});
console.log(counter)//correct 109785