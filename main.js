const playerBoard = document.getElementById("player_board");
const computerBoard = document.getElementById("computer_board");

function createGrid(game) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      game.appendChild(square);
    }
  }
}
createGrid(playerBoard);
createGrid(computerBoard);
