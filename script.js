const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const X_CLASS = "x";
const CIRCLE_CLASS = "c";
let circleTurn = false;

cellElements.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});
showMarkOnHover();

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  switchTurns();
  showMarkOnHover();
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
function switchTurns() {
  circleTurn = !circleTurn;
}
function showMarkOnHover() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) board.classList.add(CIRCLE_CLASS);
  else board.classList.add(X_CLASS);
}
