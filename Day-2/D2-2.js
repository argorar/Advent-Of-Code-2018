const fs = require('fs')
const input = fs.readFileSync('assets/boxids2', 'utf-8')

var formatedInput = input.trim()
    .split('\n')
    .map(string => string)

formatedInput.forEach(cadena => {
    let listCharA = cadena.split("").map(string => string)
    let error = 0
    for (let index = 0; index < formatedInput.length; index++) {
        let listCharB = formatedInput[index].split("").map(string => string)
        //comparar Char by char
        for (let i = 0; i < listCharA.length; i++) {
            if (error < 2) {
                if (listCharA[i] != (listCharB[i]))
                    error++
            } else
                break
        }
        if (error === 1) {
            console.log(cadena + " es casi igual " + formatedInput[index])
            break
        }
        error = 0
    }
});// aswe rpazvmqbftrbeosiecxlghkwud