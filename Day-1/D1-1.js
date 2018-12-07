const fs = require('fs')
const input = fs.readFileSync('assets/frequencys', 'utf-8')

let formatedInput = input.trim()
                          .split('\n')
                          .map(x => parseInt(x))

let sum = formatedInput.reduce((a,b)=> a + b)
console.log(sum)

