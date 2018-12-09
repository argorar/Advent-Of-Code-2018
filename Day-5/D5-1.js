const fs = require('fs')
const input = fs.readFileSync('assets/polymer', 'utf-8')
const checkForReaction = (x, y) => {
    if (x.toLowerCase() === y.toLowerCase()) {
        if (x !== y)
            return true
    }
    return false
}

var polymer = input.trim().split("")
let auxPrev
let auxNext
let scanning = true
let index = 0
console.log("Processing...")

while (scanning) {
    auxPrev = polymer[index]
    auxNext = polymer[index + 1]

    if (checkForReaction(auxPrev, auxNext)) {
        polymer.splice(index, 2)
        index = 0
    } else {
        index++

        if (!polymer[index + 1]) {
            scanning = false;
        }
    }

    if (index >= polymer.length) {
        scanning = false;
    }
}
console.log("the resulting polymer contains " + polymer.length + " units")