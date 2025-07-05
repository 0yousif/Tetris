// Variables
//
// Board Variables
let boardElement = document.querySelector(".mainBoard")
let boardDimentions = {
  height: 20,
  width: 10,
}
let boardArray = []

// Blocks variables
let blocks = [
  {
    height: 2,
    width: 3,
    positions: [
      { row: 0, column: 1 },
      { row: 1, column: 0 }, //    ____
      { row: 1, column: 1 }, // ___|  |___
      { row: 1, column: 2 }, //|__________|
    ],
    centerIndex: 2,
    degree: 0,
  },
  {
    height: 1,
    width: 4,
    positions: [
      { row: 0, column: 0 },
      { row: 0, column: 1 }, //
      { row: 0, column: 3 }, //  _____________
      { row: 0, column: 2 }, // |_____________|
    ],
    centerIndex: 1,
    degree: 0,
  },
  {
    height: 2,
    width: 3,
    positions: [
      { row: 0, column: 0 },
      { row: 1, column: 0 }, // ____
      { row: 1, column: 1 }, // |  |_____
      { row: 1, column: 2 }, // |________|
    ],
    centerIndex: 2,
    degree: 0,
  },
  {
    height: 2,
    width: 3,
    positions: [
      { row: 0, column: 2 },
      { row: 1, column: 0 }, //          _____
      { row: 1, column: 1 }, //   _______|   |
      { row: 1, column: 2 }, //   |___ ______|
    ],
    centerIndex: 2,
    degree: 0,
  },
  {
    height: 2,
    width: 2,
    positions: [
      { row: 0, column: 0 },
      { row: 0, column: 1 }, // ______
      { row: 1, column: 0 }, // |     |
      { row: 1, column: 1 }, // |_____|
    ],
    centerIndex: -1,
    degree: 0,
  },
  {
    height: 2,
    width: 3,
    positions: [
      { row: 0, column: 1 },
      { row: 0, column: 2 }, //     ___
      { row: 1, column: 0 }, //    |
      { row: 1, column: 1 }, // ___
    ],
    centerIndex: 3,
    degree: 0,
  },
  {
    height: 2,
    width: 3,
    positions: [
      { row: 0, column: 0 },
      { row: 0, column: 1 }, // ___
      { row: 1, column: 1 }, //    |
      { row: 1, column: 2 }, //     ___
    ],
    centerIndex: 2,
    degree: 0,
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
  centerIndex: 0,
  degree: 0,
}
let colorsList = ["#FFBA00", "#27C9FF", "#40C422", "#7E84FF", "#D87EFF"]
let initialColor = ["#262B39"]
let fallingSpeed = 1000
let nextBlockObject
let level = 1
let score = 0
let scoreDisplay = document.querySelector("#score")
let levelDisplay = document.querySelector("#level")
// let filledRow = []

// HTML Board creation

for (let i = 0; i < boardDimentions.height * boardDimentions.width; i++) {
  boardElement.innerHTML += `<div data-index="${i}" class="boardCell"></div>`
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

// can move function, left and right sides for the collision detector the left and right movement of the blocks, blocks overlaping

let canMove = (newCordinates) => {
  for (let i = 0; i < newCordinates.length; i++) {
    if (
      boardArray[newCordinates[i].row][newCordinates[i].column] !== "" &&
      !Boolean(
        currentBlock.cordinates.find(
          (cordinate) =>
            cordinate.row === newCordinates[i].row &&
            cordinate.column === newCordinates[i].column
        )
      )
    ) {
      return false
    }
  }
  return true
}

let moveBlock = (xMovement, yMovement) => {
  let newCordinates = new Array(...currentBlock.cordinates)

  if (
    canMove(
      newCordinates.map((el) => {
        return { row: el.row + yMovement, column: el.column + xMovement }
      })
    )
  ) {
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
  } else {
    return
  }
}

let nextBlock = () => {
  if (!nextBlockObject) {
    let currentBlockObject = blocks[randomNumber(0, 6)]
    nextBlockObject = blocks[randomNumber(0, 6)]

    return currentBlockObject
  } else {
    let currentBlockObject = nextBlockObject
    nextBlockObject = blocks[randomNumber(0, 6)]
    let nextBlockDisplay = document.querySelectorAll("#nextBlock div")
    nextBlockDisplay.forEach((cell) => {
      cell.style.backgroundColor = ""
    })
    nextBlockObject.positions.forEach((position) => {
      nextBlockDisplay[
        position.row * 4 + position.column
      ].style.backgroundColor = "red"
    })
    return currentBlockObject
  }
}

// Creates a block
let createBlock = () => {
  // spawning the block
  let newBlock = nextBlock()
  // let newBlock = { ...blocks[1] }
  currentBlock.color = colorsList[randomNumber(0, 4)]
  // let spawningRow = randomNumber(0, boardDimentions.width - 1 - newBlock.width)
  let spawningRow = 0
  let spawningColumn = randomNumber(0, boardDimentions.width - newBlock.width)

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
  currentBlock.centerIndex = newBlock.centerIndex
}

let rotateBlock = () => {
  if (currentBlock.centerIndex === -1) {
    return
  }
  let newCordinates
  newCordinates = currentBlock.cordinates.map((cordinate) => {
    return {
      row:
        (cordinate.column -
          currentBlock.cordinates[currentBlock.centerIndex].column) *
          -1 +
        currentBlock.cordinates[currentBlock.centerIndex].row,
      column:
        cordinate.row -
        currentBlock.cordinates[currentBlock.centerIndex].row +
        currentBlock.cordinates[currentBlock.centerIndex].column,
    }
  })

  for (let i = 0; i < newCordinates.length; i++) {
    if (
      newCordinates[i].row < 0 ||
      newCordinates[i].row < 0 ||
      newCordinates[i].row >= boardDimentions.height ||
      newCordinates[i].column >= boardDimentions.width
    ) {
      return
    }
  }
  if (canMove(newCordinates)) {
    // newCordinates.forEach((el) => {
    //   console.log(
    //     document.querySelector(
    //       `[data-index="${convertToIndex(el.row, el.column)}"]`
    //     )
    //   )
    // })

    for (let i = 0; i < newCordinates.length; i++) {
      // editing the board variable
      boardArray[currentBlock.cordinates[i].row][
        currentBlock.cordinates[i].column
      ] = ""
      boardArray[newCordinates[i].row][newCordinates[i].column] = "x"

      // changing the color
      changeCellColor(
        "",
        currentBlock.cordinates[i].row,
        currentBlock.cordinates[i].column,
        initialColor
      )
      changeCellColor(
        "",
        newCordinates[i].row,
        newCordinates[i].column,
        currentBlock.color
      )
      // editing the cordinates

      currentBlock.cordinates[i].row = newCordinates[i].row
      currentBlock.cordinates[i].column = newCordinates[i].column
    }
  } else {
    return
  }
}
// checks if the current block is touching another block below it
let collisionCheck = (side) => {
  if (side === "bottom") {
    for (let i = 0; i < currentBlock.cordinates.length; i++) {
      if (
        currentBlock.cordinates[i].row === boardDimentions.height - 1 ||
        (boardArray[currentBlock.cordinates[i].row + 1][
          currentBlock.cordinates[i].column
        ] !== "" &&
          !Boolean(
            currentBlock.cordinates.find(
              (cordinate) =>
                cordinate.row === currentBlock.cordinates[i].row + 1 &&
                cordinate.column === currentBlock.cordinates[i].column
            )
          ))
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
      if (
        veryRightCells[i].column === boardDimentions.width - 1 ||
        boardArray[veryRightCells[i].row][veryRightCells[i].column + 1] !== ""
      ) {
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
    }, currentBlock.cordinates[0].column)
    let veryLeftCells = currentBlock.cordinates.filter((cordinate) => {
      return cordinate.column === veryLeftColumn
    })
    for (let i = 0; i < veryLeftCells.length; i++) {
      if (
        veryLeftCells[i].column === 0 ||
        boardArray[veryLeftCells[i].row][veryLeftCells[i].column - 1] !== ""
      ) {
        return true
      }
    }
    return false
  }
}
// console.log(lowestRowBlockCells)

let filledRowsCheck = () => {
  let filledRows = []
  for (let i = 0; i < boardArray.length; i++) {
    if (!boardArray[i].some((el) => el === "")) {
      filledRows.push(i)
    }
  }
  return filledRows
}

let updateScore = (filledRowsCount) => {
  score = score + ((filledRowsCount ** 2)* 10)
  scoreDisplay.textContent = score
}

let shift = (filledRows) => {
  for (let i = 0; i < filledRows.length; i++) {
    boardArray[filledRows[i]].forEach((column, index) => {
      boardArray[filledRows[i]][index] = ""
      changeCellColor("", filledRows[i], index, initialColor)
    })

    // editing the board
    for (let row = boardArray.length - 2; row > 1; row--) {
      for (let column = 0; column < boardArray[row].length; column++) {
        for (let shifts = 0; shifts < (row > 2 ? 4 : 4 - row); shifts++) {
          if (
            boardArray[row - shifts][column] !== "" &&
            boardArray[row - shifts + 1][column] === ""
          ) {
            boardArray[row - shifts][column] = ""
            boardArray[row + 1 - shifts][column] = "x"
            changeCellColor(
              "",
              row + 1 - shifts,
              column,
              document.querySelector(
                `[data-index="${convertToIndex(row - shifts, column)}"]`
              ).style.backgroundColor
            )
            changeCellColor("", row - shifts, column, initialColor)
          }
        }
      }
    }
  }

  updateScore(filledRows.length)

  if (filledRowsCheck().length !== 0) {
    shift(filledRowsCheck())
  }
}

let gameOverCheck = () => {
  return boardArray[0].some((cell) => cell !== "")
}

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
    } else if (event.key === "ArrowDown" && !collisionCheck("bottom")) {
      moveBlock(0, 1)
    } else if (event.key === "ArrowUp") {
      rotateBlock()
    }
  }
  setTimeout(() => {
    movementCountdown = true
  }, 100)
})

// Intervals
createBlock()

// Falling interval

let update = () => {
  if (!collisionCheck("bottom")) {
    // if there was nothing below the current block
    if (nextBlockTimeout) {
      // clear the next block timeout timeout
      clearTimeout(nextBlockTimeout)
      nextBlockTimeout = null
    }
    moveBlock(0, 1)
    // setTimeout(update, fallingSpeed * level)
    setTimeout(update, 300)
  } else {
    // if there was another filled cell under the current block
    // if the next block timeout has not been started
    if (filledRowsCheck().length !== 0) {
      shift(filledRowsCheck())
    }
    if (gameOverCheck()) {
      console.log("gameOvre")
    }
    nextBlockTimeout = setTimeout(() => {
      // start the next block timeout
      createBlock()
    }, 400) // block freeze and next block creation time (this should higher than the next update after new block creation)

    setTimeout(update, 300) // next move after the new block creation
  }
}
update()
