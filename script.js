const board = document.getElementById('board');
const statusText = document.getElementById('status');
let cells = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;

const winConditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', handleClick);
});

function handleClick(event) {
  const index = event.target.dataset.index;
  if (cells[index] === "" && gameActive) {
    cells[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer.toLowerCase());

    checkWinner();

    if (gameActive) {
      currentPlayer = "O";
      statusText.textContent = "AI's turn";
      setTimeout(aiMove, 500);
    }
  }
}

function aiMove() {
  let emptyIndices = cells.map((val, idx) => val === "" ? idx : null).filter(v => v !== null);
  if (emptyIndices.length === 0) return;

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  document.querySelector(`.cell[data-index="${randomIndex}"]`).textContent = currentPlayer;
  cells[randomIndex] = currentPlayer;

  checkWinner();
  if (gameActive) {
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
  }
}

function checkWinner() {
  for (let condition of winConditions) {
    const [a,b,c] = condition;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      gameActive = false;
      statusText.textContent = `${cells[a]} wins!`;
      return;
    }
  }

  if (!cells.includes("")) {
    gameActive = false;
    statusText.textContent = "It's a draw!";
  }
}

function restartGame() {
  cells = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = "");
}
