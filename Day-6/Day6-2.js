const fs = require('fs')
const input = fs.readFileSync('assets/coordinates', 'utf-8')

const findManhattanDistance = (xOne, yOne, xTwo, yTwo) => {
    return Math.abs(xOne - xTwo) + Math.abs(yOne - yTwo);
}

const findMaxCoordinate = (coordinateSet, coordinate) => {
    let coordinates = [];

    for (let i = 0; i < coordinateSet.length; i++) {
        let coordinatePair = coordinateSet[i];
        let matchGroups = coordinatePair.match(/(\d+), (\d+)/);

        if (coordinate === "x") {
            let xCoordinate = matchGroups[1];
            coordinates.push(parseInt(xCoordinate));
        } else {
            let yCoordinate = matchGroups[2];
            coordinates.push(parseInt(yCoordinate));
        }
    };

    return coordinates.sort((a, b) => b - a)[0];
}

const findComprehensiveArea = (threshold) => {
    let coordinates = input.split('\n').map(x => x.trim());
    //encontrar el tamaño de la matriz
    let maxXCoordinate = findMaxCoordinate(coordinates, "x");
    let maxYCoordinate = findMaxCoordinate(coordinates, "y");

    let areas = [];

    for (let y = 0; y <= maxYCoordinate; y++) {
        for (let x = 0; x <= maxXCoordinate; x++) {

            let distances = [];

            for (let c = 0; c < coordinates.length; c++) {

                let coordinatePair = coordinates[c];
                let matchGroups = coordinatePair.match(/(\d+), (\d+)/);

                distances.push({ coordinate: coordinates[c], distance: findManhattanDistance(x, y, matchGroups[1], matchGroups[2]) });
            }

            let totalDistance = distances.reduce((a, area) => {
                return a + area.distance;
            }, 0);
            if (totalDistance < threshold) {
                areas.push(`${x}, ${y}`);
            }
        }
    }

    return areas.length;
}
console.log(findComprehensiveArea(10000))