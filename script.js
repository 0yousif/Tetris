// Variables

// Board Variables
let boardElement = document.querySelector(".mainBoard")
let boardDimentions = {
  height: 11,
  width: 9,
}
let boardArray = []

// Blocks variables
let blocks = [
  {
    height: 2,
    width: 3,
    positions: [
      { row: 0, column: 1 },
      { row: 1, column: 0 },
      { row: 1, column: 1 },
      { row: 1, column: 2 },
    ],
  },
  {
    height: 1,
    width: 4,
    positions: [
      { row: 0, column: 0 },
      { row: 0, column: 1 },
      { row: 0, column: 2 },
      { row: 0, column: 3 },
    ],
  },
  {
    height: 2,
    width: 3,
    positions: [
      { row: 0, column: 0 },
      { row: 1, column: 0 },
      { row: 1, column: 1 },
      { row: 1, column: 2 },
    ],
  },
  {
    height: 2,
    width: 3,
    positions: [
      { row: 0, column: 2 },
      { row: 1, column: 0 },
      { row: 1, column: 1 },
      { row: 1, column: 2 },
    ],
  },
  {
    height: 2,
    width: 2,
    positions: [
      { row: 0, column: 0 },
      { row: 0, column: 1 },
      { row: 1, column: 0 },
      { row: 1, column: 1 },
    ],
  },
  {
    height: 2,
    width: 3,
    positions: [
      { row: 0, column: 1 },
      { row: 0, column: 2 },
      { row: 1, column: 0 },
      { row: 1, column: 1 },
    ],
  },
  {
    height: 2,
    width: 3,
    positions: [
      { row: 0, column: 0 },
      { row: 0, column: 1 },
      { row: 1, column: 1 },
      { row: 1, column: 2 },
    ],
  },
]
let currentBlock = {
  color: "",
  cordinates: [
    { row: 0, column: 0 },
    { row: 0, column: 0 },
    { row: 0, column: 0 },
    { row: 0, column: 0 },
  ],
}
let colorsList = ["#FFBA00", "#27C9FF", "#40C422", "#7E84FF", "#D87EFF"]
let fallingSpeed = 1000
let level = 1

// HTML Board creation

for (let i = 0; i < boardDimentions.height * boardDimentions.width; i++) {
  boardElement.innerHTML += `<div data-index="${i}" class="boardCell">+</div>`
}
boardElement.style.gridTemplateColumns = `repeat(${boardDimentions.width}, 1fr)`
boardElement.style.gridTemplateRows = `repeat(${boardDimentions.height}, 1fr)`

// JS board array creation
for (let i = 0; i < boardDimentions.height; i++) {
  boardArray.push([])
}

boardArray.forEach((row) => {
  for (let i = 0; i < boardDimentions.width; i++) {
    row.push("")
  }
})

// Functions

// Usual quick operations
let convertToIndex = (row, column) => {
  return row * boardDimentions.width + column
}
let convertToCordinates = (index) => {
  return {
    row: Math.trunc(index / boardDimentions.width),
    column: index % boardDimentions.width,
  }
}

// Generates a random number between min and max
let randomNumber = (min, max) => {
  // inclusive of both min and max
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Blocks edit functions

let changeCellColor = (index, row, col, color) => {
  if (index) {
    document.querySelector(
      `[data-index="${index}"]`
    ).style.backgroundColor = `${color}`
  } else {
    document.querySelector(
      `[data-index="${convertToIndex(row, col)}"]`
    ).style.backgroundColor = `${color}`
  }
}

let moveBlock = (xMovement, yMovement) => {
  let newCordinates = new Array(...currentBlock.cordinates)
  newCordinates.forEach((newCordinate) => {
    newCordinate.row = newCordinate.row + yMovement
    newCordinate.column = newCordinate.column + xMovement
  })

  currentBlock.cordinates.forEach((cordinate, index) => {
    boardArray[cordinate.row][cordinate.column] = ""
    changeCellColor(
      "",
      currentBlock.cordinates[index].row,
      currentBlock.cordinates[index].column,
      ""
    )
  })
  newCordinates.forEach((newCordinate, index) => {
    newCordinate.row = newCordinate.row + yMovement
    newCordinate.column = newCordinate.column + xMovement

    boardArray[newCordinate.row][newCordinate.column] = "x"
    changeCellColor(
      convertToIndex(newCordinate.row, newCordinate.column),
      "",
      "",
      currentBlock.color
    )
  })
}

// Creates a block
let createBlock = () => {
  // spawning the block
  let newBlock = blocks[randomNumber(0, 6)]
  currentBlock.color = colorsList[randomNumber(0, 4)]
  let spawningRow = randomNumber(0, boardDimentions.width - 1 - newBlock.width)
  // console.log(0, boardDimentions.width - newBlock.width)
  // console.log(spawningRow)

  let spawningColumn = randomNumber(0, boardDimentions.width - newBlock.width)

  // console.log(spawningRow, spawningColumn)
  currentBlock.cordinates.forEach((value, index) => {
    currentBlock.cordinates[index].row =
      spawningRow + newBlock.positions[index].row
    currentBlock.cordinates[index].column =
      spawningColumn + newBlock.positions[index].column

    boardArray[spawningRow + newBlock.positions[index].row][
      spawningColumn + newBlock.positions[index].column
    ] = "x"
    changeCellColor(
      "",
      spawningRow + newBlock.positions[index].row,
      spawningColumn + newBlock.positions[index].column,
      currentBlock.color
    )
  })
}

// checks if the current block is touching another block below it
let collisionCheck = (side) => {
  if (side === "bottom") {
    let lowestRow = currentBlock.cordinates.reduce((acc, cordinate) => {
      if (cordinate.row > acc) {
        return cordinate.row
      } else {
        return acc
      }
    }, 0)
    let lowestRowBlockCells = currentBlock.cordinates.filter((cordinate) => {
      return cordinate.row === lowestRow
    })

    for (let i = 0; i < lowestRowBlockCells.length; i++) {
      if (
        lowestRowBlockCells[i].row === boardDimentions.height - 1 ||
        boardArray[lowestRowBlockCells[i].row + 1][
          lowestRowBlockCells[i].column
        ] !== ""
      ) {
        return true
      }
    }
    return false
  } else if (side === "right") {
    let veryRightColumn = currentBlock.cordinates.reduce((acc, cordinate) => {
      if (cordinate.column > acc) {
        return cordinate.column
      } else {
        return acc
      }
    }, 0)
    let veryRightCells = currentBlock.cordinates.filter((cordinate) => {
      return cordinate.column === veryRightColumn
    })
    for (let i = 0; i < veryRightCells.length; i++) {
      if (veryRightCells[i].column === boardDimentions.width - 1) {
        return true
      }
    }
    return false
  } else if (side === "left") {
    let veryLeftColumn = currentBlock.cordinates.reduce((acc, cordinate) => {
      if (cordinate.column < acc) {
        return cordinate.column
      } else {
        return acc
      }
    }, 0)
    let veryLeftCells = currentBlock.cordinates.filter((cordinate) => {
      return cordinate.column === veryLeftColumn
    })
    for (let i = 0; i < veryLeftCells.length; i++) {
      if (veryLeftCells[i].column === 0) {
        return true
      }
    }
    return false
  }
}
// console.log(lowestRowBlockCells)

// Event Listeners
let leftCountdown = true
let rightCountdown = true
let movementCountdown = true
let nextBlockTimeout

addEventListener("keydown", (event) => {
  if (movementCountdown) {
    movementCountdown = false
    if (event.key === "ArrowLeft" && !collisionCheck("left")) {
      moveBlock(-1, 0)
    } else if (event.key === "ArrowRight" && !collisionCheck("right")) {
      moveBlock(1, 0)
    }
  }
  setTimeout(() => {
    movementCountdown = true
  }, 100)
})

// Intervals
createBlock()

// Falling interval

let gravity = () => {
  console.log(collisionCheck("bottom"))
  if (!collisionCheck("bottom")) {
    if (nextBlockTimeout) {
      clearTimeout(nextBlockTimeout)
      nextBlockTimeout = 0
    }
    moveBlock(0, 1)
    setTimeout(gravity, fallingSpeed * level)
  } else {
    if (!nextBlockTimeout) {
      nextBlockTimeout = setTimeout(createBlock, 2000)
    }
    setTimeout(gravity, fallingSpeed * level)
  }
}

gravity()
