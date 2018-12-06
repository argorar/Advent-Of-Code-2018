const fs = require('fs')
const input = fs.readFileSync('assets/frequencys', 'utf-8')

let formatedInput = input.trim()
                          .split('\n')
                          .map(x => parseInt(x))
let sum = 0
let set = new Set([0])
let length = formatedInput.length

for (let x = 0; ; x = ((x + 1) % length)) {
    sum += formatedInput[x]
    if (set.has(sum)) {
        console.log(sum)
        break
    } else {
        set.add(sum)
    }
}
