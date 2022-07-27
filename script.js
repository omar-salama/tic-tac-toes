const board = document.getElementById("board");
const cellElements = document.querySelectorAll("[data-cell]");
const endingMessage = document.querySelector("[data-end-message-text]");
const endingPopUp = document.getElementById("popUp");
const replayButton = document.getElementById("replayButton");
const X_CLASS = "x";
const CIRCLE_CLASS = "c";
const WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let circleTurn = true;

startGame();

replayButton.addEventListener("click", reset);

function startGame() {;
  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
  showMarkOnHover();
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (isWin(currentClass)) {
    showResult({ draw: false });
  } else if (isDraw()) {
    switchTurns(); // next round starts with the other player
    showResult({ draw: true });
  } else {
    switchTurns();
    showMarkOnHover();
  }
}

 // **

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
function switchTurns() {
  circleTurn = !circleTurn;
}
function showMarkOnHover() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  circleTurn ? board.classList.add(CIRCLE_CLASS) : board.classList.add(X_CLASS);
}

function isWin(currentClass) {
  return WIN_COMBOS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function showResult({ draw: value }) {
  value
    ? (endingMessage.innerText = "Draw!")
    : (endingMessage.innerText = `${circleTurn ? "O" : "X"} Wins!`);
  endingPopUp.classList.add("show");
}

function reset() {
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
  });
  endingPopUp.classList.remove("show");
  startGame();
}
