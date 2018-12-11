const fs = require('fs')
const input = fs.readFileSync('assets/polymer', 'utf-8')
const checkForReaction = (x, y) => {
    if (x.toLowerCase() === y.toLowerCase()) {
        if (x !== y)
            return true
    }
    return false
}

const findUniqueUnits = (units) => {
    let uniques = new Set()
    for (let i = 0; i < units.length; i++) {
      uniques.add(units[i].toLowerCase())
    }  
    return uniques
  }

var polymer = input.trim().split("")
let auxPrev
let auxNext
let activos = findUniqueUnits(polymer)
console.log("Processing...")

let lengthsMutation= []
activos.forEach(element => {
    let mutation = polymer.filter( y => y.toLowerCase() !== element)
    let index = 0
    let scanning = true
    while (scanning) {
        auxPrev = mutation[index]
        auxNext = mutation[index + 1]
    
        if (checkForReaction(auxPrev, auxNext)) {
            mutation.splice(index, 2)
            index = 0
        } else {
            index++
    
            if (!mutation[index + 1]) {
                scanning = false;
            }
        }
    
        if (index >= mutation.length) {
            scanning = false;
        }
    }
    lengthsMutation.push(mutation.length)
});
lengthsMutation.sort((x, y) => x - y)
console.log("the best resulting polymer contains " + lengthsMutation[0] + " units")