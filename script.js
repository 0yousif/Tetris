// Variables

let boardElement = document.querySelector(".mainBoard")
let boardDimentions = {
  height: 11,
  width: 9,
}
let boardArray = []
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
let currentBlockCordinates = [
  { row: 0, column: 0 },
  { row: 0, column: 0 },
  { row: 0, column: 0 },
  { row: 0, column: 0 },
]
let colorsList = ["#FFBA00", "#27C9FF", "#40C422", "#7E84FF", "#D87EFF"]
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

let convertToIndex = (row, column) => {
  return row * boardDimentions.width + column
}
let convertToCordinates = (index) => {
  return {
    row: Math.trunc(index / boardDimentions.width),
    column: index % boardDimentions.width,
  }
}

let randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

let changeCellColor = (index, row, col, color) => {
  if (index) {
    document.querySelector(`[data-index="${index}"]`).style.backgroundColor =
      color
  } else {
    document.querySelector(
      `[data-index="${convertToIndex(row, col)}"]`
    ).style.backgroundColor = color
  }
}

let moveCell = (index, xMovement, yMovement) => {}

let createBlock = () => {
  let newBlock = blocks[randomNumber(0, 6)]
  currentBlock.color = colorsList[randomNumber(0, colorsList.length)]

  let spawningRow = randomNumber(
    0 + newBlock.width,
    boardDimentions.width - 1 - newBlock.width
  )
  let spawningColumn = randomNumber(
    0 + newBlock.height,
    boardDimentions.height - 1 - newBlock.height
  )

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
  // spawning the block
}
