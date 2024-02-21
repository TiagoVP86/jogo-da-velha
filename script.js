// initial Data
let square = {
  a1: "",
  a2: "",
  a3: "",
  b1: "",
  b2: "",
  b3: "",
  c1: "",
  c2: "",
  c3: "",
};

let player1Name = "";
let player2Name = "";
let player = "";
let warning = "";
let playing = false;

start();

// Events
document.querySelector(".start").addEventListener("click", start);
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("click", itemClick);
});

// Function
function itemClick(event) {
  let item = event.target.getAttribute("data-item");
  if (playing && square[item] === "") {
    square[item] = player;
    renderSquare();
    togglePlayer();
  }
}

function start() {
  player1Name = document.querySelector(".jogador1").value;
  player2Name = document.querySelector(".jogador2").value;

  if (player1Name.trim() === "" || player2Name.trim() === "") {
    alert("Por favor, preencha os nomes dos jogadores.");
    return;
  }

  warning = "";
  let random = Math.floor(Math.random() * 2);
  player = random === 0 ? "X" : "O";

  for (let i in square) {
    square[i] = "";
  }

  playing = true;

  renderSquare();
  renderInfo();
}

function renderSquare() {
  for (let i in square) {
    let item = document.querySelector(`div[data-item=${i}]`);
    item.innerHTML = square[i];
  }
  checkGame();
}

function renderInfo() {
  document.querySelector(".vez").innerHTML =
    player === "X" ? player1Name : player2Name;
  document.querySelector(".resultado").innerHTML = warning;
}

function togglePlayer() {
  player = player === "X" ? "O" : "X";
  renderInfo();
}

function checkGame() {
  if (checkWinnerFor("X")) {
    warning = `${player1Name} venceu!`;
    playing = false;
  } else if (checkWinnerFor("O")) {
    warning = `${player2Name} venceu!`;
    playing = false;
  } else if (isFull()) {
    warning = "Deu empate!";
    playing = false;
  }
}

document.querySelector(".start").addEventListener("click", function () {
  if (playing) {
    document.querySelector(".start").textContent = "Reiniciar";
  } else {
    document.querySelector(".start").textContent = "Iniciar";
  }
  start();
});

function checkWinnerFor(player) {
  let pos = [
    "a1,a2,a3",
    "b1,b2,b3",
    "c1,c2,c3",

    "a1,b1,c1",
    "a2,b2,c2",
    "a3,b3,c3",

    "a1,b2,c3",
    "a3,b2,c1",
  ];

  for (let w in pos) {
    let pArray = pos[w].split(",");
    let hasWon = pArray.every((option) => square[option] === player);
    if (hasWon) {
      return true;
    }
  }

  return false;
}

function isFull() {
  for (let i in square) {
    if (square[i] === "") {
      return false;
    }
  }
  return true;
}
