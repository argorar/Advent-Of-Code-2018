const fs = require("fs")
const input = fs.readFileSync("assets/numbers", "utf-8")

let data = input.split(" ")
    .map(x => parseInt(x))

const sumMetadata = (numbers, i, numberMetadata) => {
    let sum = 0
    for (let j = 0; j < numberMetadata; j++) {
        sum += numbers[i + j]
    }
    return sum
}

const processNode = (numbers, i) => {
    //the node not have childs
    if (numbers[i] === 0) {
        return {
            length: numbers[i + 1] + 2,
            metadata: sumMetadata(numbers, i + 2, numbers[i + 1])
        }
    }
    let childsMetadata = 0
    let length = 0
    for (let index = 0; index < numbers[i]; index++) {
        let node = processNode(numbers, i + length + 2)
        childsMetadata += node.metadata
        length += node.length
    }
    return {
        length: numbers[i + 1] + length + 2,
        metadata: childsMetadata + sumMetadata(numbers, i + length + 2, numbers[i + 1])
    }
}

console.log(processNode(data, 0).metadata)