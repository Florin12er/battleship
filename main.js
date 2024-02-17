const numberOfRows = 10;
let game = 0;

const playerBoard = document.getElementById("player_board");
const computerBoard = document.getElementById("computer_board");
const verticalButton = document.getElementById("verticalButton");
const playButton = document.getElementById("playButton");
let stop = 1;
const message = document.getElementById("message");
const message_opponent = document.getElementById("message_opponent");
let playerShips = [];
let computerShips = [];
let vertical = false;

function createGrid(game) {
  for (let i = 0; i < numberOfRows; i++) {
    for (let j = 0; j < numberOfRows; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.dataset.x = i;
      square.dataset.y = j;
      square.addEventListener("click", handleSquareClick);
      game.appendChild(square);
    }
  }
}

function createPlayerShips(shipCoordinates) {
  for (let coord of shipCoordinates) {
    const [x, y] = coord;
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
  if (vertical) {
    verticalButton.textContent = "horizontal";
  } else {
    verticalButton.textContent = "vertical";
  }
});

message.textContent = "place your one square ship";
function handleSquareClick(event) {
  const x = parseInt(event.target.dataset.x);
  const y = parseInt(event.target.dataset.y);

  let shipCoordinates = [[x, y]]; // Start with one square ship

  console.log("Ship positions:", shipCoordinates);
  if (game >= 4) {
    message.textContent = "place your two square ship horizontally";
    if (!vertical) {
      shipCoordinates = [
        [x, y],
        [x, y + 1],
      ];
    }
    if (vertical) {
      shipCoordinates = [
        [x, y],
        [x + 1, y],
      ];
    }
    if (game >= 7) {
      message.textContent = "place your three square ship";
      if (!vertical) {
        shipCoordinates = [
          [x, y],
          [x, y + 1],
          [x, y + 2],
        ];
      }
      if (vertical) {
        shipCoordinates = [
          [x, y],
          [x + 1, y],
          [x + 2, y],
        ];
      }
      if (game >= 9) {
        message.textContent = "place your four square ship";
        if (!vertical) {
          shipCoordinates = [
            [x, y],
            [x, y + 1],
            [x, y + 2],
            [x, y + 3],
          ];
        }
        if (vertical) {
          shipCoordinates = [
            [x, y],
            [x + 1, y],
            [x + 2, y],
            [x + 3, y],
          ];
        }
        if (game >= 10) {
          return;
        }
      }
    }
  }
  if (isWithinOneSquareDistance(shipCoordinates)) {
    alert("Ships must be placed with one-square distance between them!");
    return;
  }

  createPlayerShips(shipCoordinates);
  game++;
}

createGrid(playerBoard);
createGrid(computerBoard);
