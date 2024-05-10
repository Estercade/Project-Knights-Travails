const Node = function(position, path) {
  this.position = position,
  this.path = path
}

function knightMoves(src, dest) {
  let visited = [];
  let origin = new Node(src);
  origin.path = [origin.position];
  let solution = constructGraph([origin], dest, visited);
  console.log(`You made it in ${solution.path.length - 1} moves! Here's your path:`);
  for (let i = 0; i < solution.path.length; i++) {
    console.log(`[${solution.path[i]}]`);
  }
  return;
}

// Constructs graph of every node in the queue
function constructGraph(queue, dest, visited) {
  let newMovesQueue = [];
  while (queue.length > 0) {
    let current = queue.shift();
    // base case
    if (current.position[0] === dest[0] && current.position[1] === dest[1]) {
      return current;
    }
    if (!visited.includes([current.position[0], current.position[1]])) {
      visited.push([current.position[0], current.position[1]]);
      newMovesQueue = [...newMovesQueue, ...calculateMoves(current)];
    }
  }
  
  // call recursive function on new nodes in queue
  return constructGraph(newMovesQueue, dest, visited);
}

// Calculates and returns an array of the valid moves from the given x,y coordinates
function calculateMoves(current) {
  let movesArr = [];
  if ((current.position[0] < 7 && current.position[1] < 6)) movesArr.push(new Node ([current.position[0] + 1, current.position[1] + 2], current.path.slice()));
  if ((current.position[0] < 7 && current.position[1] > 1)) movesArr.push(new Node ([current.position[0] + 1, current.position[1] - 2], current.path.slice()));
  if ((current.position[0] > 0 && current.position[1] < 6)) movesArr.push(new Node ([current.position[0] - 1, current.position[1] + 2], current.path.slice()));
  if ((current.position[0] > 0 && current.position[1] > 1)) movesArr.push(new Node ([current.position[0] - 1, current.position[1] - 2], current.path.slice()));
  if ((current.position[0] < 6 && current.position[1] < 7)) movesArr.push(new Node ([current.position[0] + 2, current.position[1] + 1], current.path.slice()));
  if ((current.position[0] < 6 && current.position[1] > 0)) movesArr.push(new Node ([current.position[0] + 2, current.position[1] - 1], current.path.slice()));
  if ((current.position[0] > 1 && current.position[1] < 7)) movesArr.push(new Node ([current.position[0] - 2, current.position[1] + 1], current.path.slice()));
  if ((current.position[0] > 1 && current.position[1] > 0)) movesArr.push(new Node ([current.position[0] - 2, current.position[1] - 1], current.path.slice()));
  for (let i = 0; i < movesArr.length; i++) {
    movesArr[i].path.push(movesArr[i].position);
  }
  return movesArr;
}

knightMoves([3,3],[4,3])