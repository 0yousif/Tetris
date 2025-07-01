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
      { row: 1, column: 0 },
      { row: 1, column: 1 },
      { row: 0, column: 2 },
    ],
  },
  {
    height: 2,
    width: 3,
    positions: [
      { row: 0, column: 1 },
      { row: 0, column: 0 },
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
  let newBlock = blocks[randomNumber(0, 4)]
  currentBlock.color = colorsList[randomNumber(0, 4)]
  let spawningRow = randomNumber(
    newBlock.width,
    boardDimentions.width - 1 - newBlock.width
  )
  console.log(newBlock.width, boardDimentions.width - 1 - newBlock.width)
  console.log(spawningRow)

  let spawningColumn = randomNumber(
    newBlock.height,
    boardDimentions.height - 1 - newBlock.height
  )

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

// Intervals
createBlock()

// Falling interval

let gravity = () => {
  console.log(fallingSpeed)
  moveBlock(0, 1) 
  setTimeout(gravity,fallingSpeed * level)

}

gravity()
