function displayRules() {
  alert(
    "The objective of the game is to sink all of your opponent's ships before they sink yours.\n" +
      "Press play to start the game and press vertical to change the direction of the ships.\n",
  );
}
window.addEventListener("load", displayRules);

const numberOfRows = 10;
let game = 0;
let computerGame = 0;
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

function createGridPlayer(board) {
  for (let i = 0; i < numberOfRows; i++) {
    for (let j = 0; j < numberOfRows; j++) {
      const square = document.createElement("div");
      square.classList.add("player");
      square.dataset.x = i;
      square.dataset.y = j;
      square.addEventListener("click", handleSquareClick);
      board.appendChild(square);
    }
  }
}

function createGridComputer(board) {
  for (let i = 0; i < numberOfRows; i++) {
    for (let j = 0; j < numberOfRows; j++) {
      const square = document.createElement("div");
      square.classList.add("computer");
      square.dataset.x = i;
      square.dataset.y = j;
      square.addEventListener("click", enemyClick);
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

function createComputerShip(shipCoordinates) {
  for (let [x, y] of shipCoordinates) {
    const index = x * 10 + y;
    const square = computerBoard.children[index];
    square.classList.add("computer-ship");
    computerShips.push([x, y]);
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

let shipPlacementAllowed = true; // Flag to control ship placement

function enemyClick() {
  if (!shipPlacementAllowed) return; // Stop ship placement if not allowed
}

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
  // Generate and place enemy ships
  const shipConfigurations = [
    { size: 1, count: 4 },
    { size: 2, count: 1 },
    { size: 3, count: 1 },
    { size: 4, count: 1 },
  ];

  alert("Game started");
  createGridPlayer(playerBoard);
  createGridComputer(computerBoard);
  shipConfigurations.forEach((config) => {
    for (let i = 0; i < config.count; i++) {
      let randomX, randomY;
      do {
        randomX = Math.floor(Math.random() * 10);
        randomY = Math.floor(Math.random() * (10 - config.size + 1)); // Adjust randomY to prevent overlapping
      } while (isShipOverlap(randomX, randomY, config.size));

      let shipCoordinates = [];
      if (vertical) {
        for (let j = 0; j < config.size; j++) {
          shipCoordinates.push([randomX + j, randomY]);
        }
      } else {
        for (let j = 0; j < config.size; j++) {
          shipCoordinates.push([randomX, randomY + j]);
        }
      }

      createComputerShip(shipCoordinates);
    }
  });
  playButton.style.display = "none";
});

// Function to check if the ship overlaps with existing ships or is adjacent to them
function isShipOverlap(startX, startY, size) {
  for (let i = startX - 1; i <= startX + size; i++) {
    for (let j = startY - 1; j <= startY + 1; j++) {
      if (i >= 0 && i < 10 && j >= 0 && j < 10) {
        if (computerShips.some((coord) => coord[0] === i && coord[1] === j)) {
          return true;
        }
      }
    }
  }
  return false;
}
