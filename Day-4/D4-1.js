const fs = require('fs')
const input = fs.readFileSync('assets/records', 'utf-8')

var formatedInput = input.trim()
    .split('\n')
    .sort()
//array with Guards with the sleep minutes
let sleepMinutes = {}
let guardId = 0
let minuteFall = 0
let minuteAwaken = 0

for (let i = 0; i < formatedInput.length; i++) {
    let log = formatedInput[i]
    let dataLog = log.match(/\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (\w+) #?(\d+\d+|\w+)/)
    let minute = parseInt(dataLog[5])
    let action = dataLog[6]

    if (action === 'Guard') {
        guardId = dataLog[7]
        //si es el primer registro se llena el array
        if (sleepMinutes[guardId] == undefined) {
            sleepMinutes[guardId] = {}
            //se llena los 60 minutos (sólo duermen 1 hora en la madrugada)
            for (let i = 0; i < 60; i++) {
                sleepMinutes[guardId][i] = 0
            }
        }
    }
    else if (action === "falls")
        minuteFall = minute;

    else if (action === "wakes") {
        minuteAwaken = minute

        for (let index = minuteFall; index < minuteAwaken; index++) {
            sleepMinutes[guardId][index] += 1
        }
    }
}
//estrategia 1: más minutos que un guardia estuvo dormido
let mostMinutesSlept = Object.keys(sleepMinutes) //devuelve los ids ordenados
                             .map(id => Object.values(sleepMinutes[id])//obtiene todos los minutos del guardia
                                              .reduce((a, b) => a + b, 0))//se suman todos los minutos del guardia
                             .sort((a, b) => b - a)[0] //ordena de mayor a menor y se obtiene el primer valor

let lazyGuard = Object.keys(sleepMinutes)
                      .find(id => Object.values(sleepMinutes[id]) //busco el guardia
                                        .reduce((a,b) => a + b, 0) === mostMinutesSlept) //el que durmió más

let sleepiestMinute = Object.values(sleepMinutes[lazyGuard])
                            .sort((a,b) => b - a)[0]

let minuteId =Object.keys(sleepMinutes[lazyGuard])//obtengo todos los ids de los minutos
                    .filter( id => sleepMinutes[lazyGuard][id] === sleepiestMinute)[0]//filtro el minuto que más se repite               
console.log(lazyGuard*minuteId)