const input = require('./stars')

const getArea = (stars) => {
    let minX = Number.MAX_SAFE_INTEGER
    let minY = Number.MAX_SAFE_INTEGER
    let maxX = 0
    let maxY = 0
    for (let i = 0; i < stars.length; i++) {
        if (stars[i].position.x > maxX) maxX = stars[i].position.x
        if (stars[i].position.y > maxY) maxY = stars[i].position.y
        if (stars[i].position.x < minX) minX = stars[i].position.x
        if (stars[i].position.y < minY) minY = stars[i].position.y
    }
    return { maxX, minX, maxY, minY }
}

const printSky = (stars) => {
    let area = getArea(stars)
    let sky = Array(area.maxY - area.minY + 1)
    for (let i = 0; i < sky.length; i++)
        sky[i] = Array(area.maxX - area.minX).fill('.')
    for (let i = 0; i < stars.length; i++)
        sky[stars[i].position.y - area.minY][stars[i].position.x - area.minX] = '#'
    for (let i = 0; i < sky.length; i++)
        console.log(sky[i] = sky[i].join(''))
}

// build the data structure
let stars = Array(input.length)
for (let i = 0; i < input.length; i++) {
    let position = input[i].split('velocity')[0].split('<')[1].split('>')[0].split(', ')
    let velocity = input[i].split('velocity')[1].split('<')[1].split('>')[0].split(', ')
    stars[i] = {
        position: { x: parseInt(position[0]), y: parseInt(position[1]) },
        velocity: { x: parseInt(velocity[0]), y: parseInt(velocity[1]) },
    }
}

let minArea = Number.MAX_SAFE_INTEGER
let minAreaSecond = null
let second = 0
while (true) {
    for (let i = 0; i < stars.length; i++) {
        stars[i].position.x += stars[i].velocity.x
        stars[i].position.y += stars[i].velocity.y
    }
    let area = getArea(stars)
    area = (area.maxX - area.minX) * (area.maxY - area.minY)
    if (area < minArea) {
        minArea = area
        minAreaSecond = second
    } 
    else 
        if (area * 1.1 > minArea) break; // if the area starts growing again, stop
    
    second++
}

// go back to the second where the area was at it's minimum
for (let i = 0; i < (second - minAreaSecond); i++) {
    for (let i = 0; i < stars.length; i++) {
        stars[i].position.x -= stars[i].velocity.x
        stars[i].position.y -= stars[i].velocity.y
    }
}
console.log('10-1 solution: ')
printSky(stars)
console.log('10-2 solution: ' + (minAreaSecond + 1))