const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winnerMessage = document.getElementById('winner-message');
const restartButton = document.getElementById('restartButton');

let isCircleTurn = false;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleClick(e) {
  const cell = e.target;
  const currentClass = isCircleTurn ? 'O' : 'X';

  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function placeMark(cell, currentClass) {
  cell.textContent = currentClass;
  cell.classList.add('taken');
}

function swapTurns() {
  isCircleTurn = !isCircleTurn;
}

function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === currentClass;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.textContent === 'X' || cell.textContent === 'O';
  });
}

function endGame(draw) {
  if (draw) {
    winnerMessage.textContent = "It's a Draw!";
  } else {
    winnerMessage.textContent = `${isCircleTurn ? "O's" : "X's"} Wins!`;
  }
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
    cell.addEventListener('click', handleClick, { once: true });
  });
  winnerMessage.textContent = '';
  isCircleTurn = false;
}

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', restartGame);
