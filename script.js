


// HTML

// an element with grid display to represent the board.
____________

// script.js

// Variables

// board state: 2D array to show the current board state

// board element: the actual HTML board container node

// current block position: will store the current falling Tetris block position

// level

// falling speed: fixed number * the current level

// blocks: array of the blocks shape




// Functions

// create block: Will pick a random block from the blocks array, then attach it to the board by changing the color of the grid cells. This function will update the current block and the current block position variables.

// increase score: Will increase the score according to the filled rows before removing them

// Filled rows check: A continuous loop to check if one of the rows is already filled; if so, the whole row will be deleted and all of the filled rows above it will be shifted.

// game over check: checks if one of the blocks is outside the board; if so, the game will end.




// Intervals

// An interval moves the current block downward as long as the bottom is not touching another block; this will be done by increasing the row that the block is already in in each iteration.




// event listeners

// Arrows event listeners: will move the current block by 1 each time or as long as the left/right arrow is pressed