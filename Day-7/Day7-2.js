const fs = require("fs")
const input = fs.readFileSync("assets/steps", "utf-8")

let data = input.trim().split('\n')
/*let nodeList = {}
data.forEach(r => {
  r = r.split(' ')
  let parent = r[1]
  let child = r[7]
  nodeList[parent] = nodeList[parent] || { n: parent, b: {} }
  nodeList[child] = nodeList[child] || { n: child, b: {} }
  nodeList[child].b[parent] = true
})

let path = ''
while (true) {
  let step = Object.values(nodeList)
    .filter(o => !Object.keys(o.b).length)
    .sort((a, b) => a.n < b.n ? -1 : 1)

  if (!step[0])
    break

  let node = step[0].n
  path += node
  delete nodeList[node]
  Object.values(nodeList).forEach(o => {
    delete o.b[node]
  })
}
console.log(path)
*/
nodeList = []

data.forEach(r => {
  let matchGroups = r.match(/(\w+) (.) (\w+) (\w+) (\w+) (\w+) (\w+) (.)/)
  let parent = matchGroups[2]
  let child = matchGroups[8]
  nodeList[parent] = nodeList[parent] || { n: parent, parents: [], d: 60 + parent.charCodeAt(0) - 64 }
  nodeList[child] = nodeList[child] || { n: child, parents: [], d: 60 + child.charCodeAt(0) - 64 }
  nodeList[child].parents[parent] = true
})

let time = 0
let workers = Array(5).fill('')

while (true) {
  let potentialSteps = Object.values(nodeList)
    .filter(x => !Object.keys(x.parents).length)
    .sort((a, b) => a.n < b.n ? -1 : 1)

  if (!potentialSteps[0])
    break
  
  potentialSteps = potentialSteps.filter(x => !workers.includes(x.n))
  let i = -1
  workers = workers.map(w => w || (potentialSteps[++i] || {}).n || '')
  
  workers.forEach((w, i) => {
    //no more nodes
    if (!nodeList[w])
      return
    // -1 second
    nodeList[w].d -= 1
    //if the node have time 0 is finished 
    if (nodeList[w].d === 0) {
      delete nodeList[w]
      //set worker avaliable
      workers[i] = ''
      //delete the step parent from the childs
      Object.values(nodeList).forEach(o => {
        delete o.parents[w]
      })
    }
  })
  time += 1
}
console.log(time)