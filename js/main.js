const table = document.querySelector(".grid");
const playerDisplay = document.querySelector("#player");
const playerWonDisplay = document.querySelector("#player-won");

let playerOneTurn = true;
let playerTwoTurn = false;
let cells = [];
let pointsX = 0;
let points0 = 0;

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    table.appendChild(cell);
    cells.push(cell);
  }
}

// adding the event listeners
addEventListeners();


function changePlayer() {
  if (playerOneTurn) {
    playerOneTurn = false;
    playerTwoTurn = true;
    playerDisplay.textContent = "0";
  } else {
    playerOneTurn = true;
    playerTwoTurn = false;
    playerDisplay.textContent = "X";
  }
}

/**
 * Checks every horizontal line for win
 * @returns {boolean}
 */
function checkHorizontal() {
  for (let i = 0; i < 3; i++) {
    pointsX = 0;
    points0 = 0;
    for (let j = 0; j < 3; j++) {
      if (cells[i * 3 + j].classList.contains("player-one")) {
        pointsX++;
        points0 = 0;
      } else if (cells[i * 3 + j].classList.contains("player-two")) {
        points0++;
        pointsX = 0;
      }
    }
    if (points0 === 3 || pointsX === 3) {
      return true;
    }
  }
  return false;
}

/**
 * Checks every vertical line for win
 * @returns {boolean}
 */
function checkVertical() {
  for (let j = 0; j < 3; j++) {
    pointsX = 0;
    points0 = 0;
    for (let i = 0; i < 3; i++) {
      if (cells[i * 3 + j].classList.contains("player-one")) {
        pointsX++;
        points0 = 0;
      } else if (cells[i * 3 + j].classList.contains("player-two")) {
        pointsX = 0;
        points0++;
      }
    }
    if (points0 === 3 || pointsX === 3) {
      return true;
    }
  }
  return false;
}

/**
 * Checks every diagonal for win
 * @returns {boolean}
 */
function checkDiagonal() {
  if (cells[0].textContent === "X" && cells[4].textContent === "X" && cells[8].textContent === "X") {
    return true;
  } else if (cells[2].textContent === "X" && cells[4].textContent === "X" && cells[6].textContent === "X") {
    return true;
  } else if (cells[0].textContent === "0" && cells[4].textContent === "0" && cells[8].textContent === "0") {
    return true;
  } else if (cells[2].textContent === "0" && cells[4].textContent === "0" && cells[6].textContent === "0") {
    return true;
  }
  return false;
}

function checkForWin() {
  if (checkHorizontal() || checkVertical() || checkDiagonal()) {
    for (const index in cells) {
      cells[index].onclick = null;
    }
    if (playerDisplay.textContent === "0") {
      playerWonDisplay.textContent = "Player 0 Won!";
    } else {
      playerWonDisplay.textContent = "Player X Won!";
    }
    return true;
  }
  return false;
}

function addEventListeners() {
  for (const index in cells) {
    cells[index].onclick = () => {
      if (!cells[index].classList.contains("player-one") && !cells[index].classList.contains("player-two")) {
        if (playerOneTurn) {
          cells[index].classList.add("player-one");
          cells[index].textContent = "X";
        } else {
          cells[index].classList.add("player-two");
          cells[index].textContent = "0";
        }
        if (checkForWin()) {
          return;
        }
        changePlayer();
      }
    }
  }
}
