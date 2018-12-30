/**
 * Thanks to adriennetacke
 */
const fs = require("fs")
const input = fs.readFileSync("assets/steps", "utf-8")

let data = input.split("\n")
let nodeList = []
let path = []

data.forEach(element => {
    let matchGroups = element.match(/(\w+) (.) (\w+) (\w+) (\w+) (\w+) (\w+) (.)/)
    let parent = matchGroups[2]
    let child = matchGroups[8]

    if (!nodeList.find(x => x.step === parent)) {
        nodeList.push({
            step: parent,
            children: [],
            parents: []
        })
    }

    if (!nodeList.find(x => x.step === child)) {
        nodeList.push({
            step: child,
            children: [],
            parents: []
        })
    }
    //if the node is parent add the child
    var parentRelationship = nodeList.find(x => x.step === parent)

    if (!parentRelationship.children.includes(child))
        parentRelationship.children.push(child)
    //if the node is chils then add the parent
    var childRelationship = nodeList.find(x => x.step === child)

    if (!childRelationship.parents.includes(parent))
        childRelationship.parents.push(parent)

})

while (nodeList.length) {
    //node avaliable to use when parent.length = 0
    let potentialStep = nodeList
        .filter(x => !x.parents.length)
        .map(y => y.step)
        .sort()[0]

    path.push(potentialStep)
    nodeList.splice(nodeList.indexOf(nodeList.find(x => x.step === potentialStep)), 1)
    //delete the step parent from the childs
    nodeList
        .filter(a => a.parents.includes(potentialStep))
        .forEach(y => y.parents.splice(y.parents.indexOf(potentialStep), 1))
}

console.log(path.join(''))




