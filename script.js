// Variables

let boardElement = document.querySelector(".mainBoard")
let boardDimentions = {
  height: 11,
  width: 9,
}
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
let currentBlock
let currentBlockCordinates = [
  { row: 0, column: 0 },
  { row: 0, column: 0 },
  { row: 0, column: 0 },
  { row: 0, column: 0 },
]
// Board creation

for (let i = 0; i < boardDimentions.height * boardDimentions.width; i++) {
  boardElement.innerHTML += `<div data-index="${i}" class="boardCell">+</div>`
}
boardElement.style.gridTemplateColumns = `repeat(${boardDimentions.width}, 1fr)`
boardElement.style.gridTemplateRows = `repeat(${boardDimentions.height}, 1fr)`

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

let changeBoxColor = (index, row,col,color) => {
  if (index){
    document.querySelector(`[data-index=${index}]`).style = `red`
  }else {
    document.querySelector(`[data-index=${convertToIndex(row,col)}]`).style = `red`
  }
}
let createBlock = () => {
  let newBlock = blocks[randomNumber(0, 6)]

  let spawningCordinates = [
    randomNumber(0 + newBlock.width, (boardDimentions.width - 1) - newBlock.width),
    randomNumber(0 + newBlock.height, (boardDimentions.height - 1) - newBlock.height),
  ]
  currentBlockCordinates.forEach((value)=>{
    
  })
  // spawning the block
}

