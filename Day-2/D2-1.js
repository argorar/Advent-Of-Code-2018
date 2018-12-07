const fs = require('fs')
const input = fs.readFileSync('assets/boxids', 'utf-8')

var formatedInput = input.trim()
                           .split('\n')
                           .map(string => string)
var twiceCounter = 0
var threeCounter = 0
formatedInput.forEach(cadena => {
    let listChar = cadena.split("")
        .map(string => string)
    let twice = false
    let three = false
    for (let index = 0; index < listChar.length; index++) {
        let element = listChar[index];
        //creo la expresion regular con el elemento a buscar
        var reg = new RegExp(element, "g");
        var searchResult = cadena.match(reg)
        if (twice === false && searchResult.length === 2)
            twice = true
        else if (three === false && searchResult.length === 3)
            three = true
    }
    if (twice)
        twiceCounter++
    if (three)
        threeCounter++
});

console.log("Checksum " + twiceCounter * threeCounter)