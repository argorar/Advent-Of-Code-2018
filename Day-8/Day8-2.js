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
    let metadata = []
    let length = 0
    for (let index = 0; index < numbers[i]; index++) {
        let node = processNode(numbers, i + length + 2)
        length += node.length
        metadata.push(node.metadata)
    }
    let metadataSum = 0
    for (let j = 0; j < numbers[i + 1]; j++) {
        //if the metadata is >0 and it reference is <= number de childs
        if (numbers[i + length + 2 + j] > 0 && numbers[i + length + 2 + j] <= numbers[i]) {
           metadataSum += metadata[numbers[i + length + 2 + j] - 1]
        }
    }
    return {
        length: length + numbers[i + 1] + 2,
        metadata: metadataSum
}
}

console.log(processNode(data, 0).metadata)