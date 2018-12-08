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
//estrategia 2: el guardia que durmio más veces en un mismo minuto
let maxMinute = Object.keys(sleepMinutes)
                      .map(id => Object.values(sleepMinutes[id])
                                       .sort((a,b) => b -a )[0])//Obtengo el máximo de cada guardia
                      .sort((a,b) => b -a )[0]//obtengo el mayor de todos 

let lazyGuard = Object.keys(sleepMinutes)
                      .find(idGuard => Object.keys(sleepMinutes[idGuard])//en cada Guardia
                                             .find(idMinute => sleepMinutes[idGuard][idMinute] === maxMinute)) //en cada minuto

let minuteId =Object.keys(sleepMinutes[lazyGuard])//obtengo todos los ids de los minutos
                    .find( id => sleepMinutes[lazyGuard][id] === maxMinute)//filtro el minuto que más se repite 
console.log(lazyGuard*minuteId)