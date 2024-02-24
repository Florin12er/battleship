const numberOfRows = 10;
let game = 0;
let stop = 1;
let vertical = false;
const playerShips = [];
const computerShips = [];

const playerBoard = document.getElementById("player_board");
const computerBoard = document.getElementById("computer_board");
const verticalButton = document.getElementById("verticalButton");
const playButton = document.getElementById("playButton");
const message = document.getElementById("message");
const message_opponent = document.getElementById("message_opponent");

function createGrid(board) {
  for (let i = 0; i < numberOfRows; i++) {
    for (let j = 0; j < numberOfRows; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.dataset.x = i;
      square.dataset.y = j;
      square.addEventListener("click", handleSquareClick);
      board.appendChild(square);
    }
  }
}

function createPlayerShips(shipCoordinates) {
  for (let [x, y] of shipCoordinates) {
    const index = x * 10 + y;
    const square = playerBoard.children[index];
    square.classList.add("player-ship");
    playerShips.push([x, y]);
  }
}

function isWithinOneSquareDistance(shipCoordinates) {
  for (let [x, y] of shipCoordinates) {
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        for (let [shipX, shipY] of playerShips) {
          if (i === shipX && j === shipY) {
            return true;
          }
        }
      }
    }
  }
  return false;
}

verticalButton.addEventListener("click", () => {
  vertical = !vertical;
  verticalButton.textContent = vertical ? "horizontal" : "vertical";
});

message.textContent = "Place your one square ship";

function handleSquareClick(event) {
  const x = parseInt(event.target.dataset.x);
  const y = parseInt(event.target.dataset.y);

  let shipCoordinates = [[x, y]]; // Start with one square ship

  const ships = [
    [[x, y]],
    [
      [x, y],
      [x, y + 1],
    ],
    [
      [x, y],
      [x, y + 1],
      [x, y + 2],
    ],
    [
      [x, y],
      [x, y + 1],
      [x, y + 2],
      [x, y + 3],
    ],
  ];

  const verticalShips = [
    [[x, y]],
    [
      [x, y],
      [x + 1, y],
    ],
    [
      [x, y],
      [x + 1, y],
      [x + 2, y],
    ],
    [
      [x, y],
      [x + 1, y],
      [x + 2, y],
      [x + 3, y],
    ],
  ];

  if (game >= 3 && game <= 10) {
    shipCoordinates = vertical ? verticalShips[game - 3] : ships[game - 3];
    message.textContent = `Place your
  ${shipCoordinates.length} square ship 
  ${vertical ? "vertically" : "horizontally"}`;
  }

  if (game >= 10) return;

  if (isWithinOneSquareDistance(shipCoordinates)) {
    alert("Ships must be placed with one-square distance between them!");
    return;
  }

  createPlayerShips(shipCoordinates);
  game++;
}
playButton.addEventListener("click", () => {
  alert("Game started");
  createGrid(playerBoard);
  createGrid(computerBoard);
  playButton.style.display = "none";
});
