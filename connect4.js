/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const width = 7;
const height = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < height; y++) {
    board[y] = [];
    for (let x = 0; x < width; x++) {
      board[y][x] = null;
    }
  }
}
/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.querySelector("#board");
  
  // makes top column clickable by creating table row
  //setting attribute id allows for CSS styling of top row
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < width; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  //for loop allows for creation of the board by the set values of height/width assigned variables
  //the # of rows is set as is the number of cells within each row which accepts data
  for (let y = 0; y < height; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < width; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
      //appends the cells to each row
    }
    htmlBoard.append(row);
    //this will append the rows/cells to the table that was selected by id when declaring htmlBoard variable
  }
}
//add comments
function findSpotForCol(x) {
  for (let y = height - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}


//this function locates where to place game piece div in table
function placeInTable(y, x) {
  const gameChip = document.createElement("div");
  gameChip.classList.add("piece");
  gameChip.classList.add(`p${currPlayer}`);
  gameChip.style.top = -50 * (y + 2);
  const spot = document.getElementById(`${y}-${x}`);
  spot.append(gameChip);
}


//this function will allow for dynamic use of the alert msg in other function based on outcome
function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // adds to html table
  board[y][x] = currPlayer;
  placeInTable(y, x);

  if (checkForWin()) {
    return endGame(`Player ${currPlayer} scored a Touchdown!`);
  }
  
  //unsure of logic**
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Overtime!');
  }

  //switches players, unsure of logic**
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < height &&
        x >= 0 &&
        x < width &&
        board[y][x] === currPlayer
    );
  }

// TODO: read and understand this code. Add comments to help you.
//checks for each direction possible to win 
//then the if statement returns winner once any one of those possible ways returns
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (win(horiz) || win(vert) || win(diagDR) || win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();