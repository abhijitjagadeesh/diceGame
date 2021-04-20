var score = {};
var players = [];
var currentPlayer = 0;
var totalPlayers = 0;

function rollANumber() {
  return Math.floor(Math.random() * 6) + 1;
}

function updateScore(rolledNumber) {
  score[players[currentPlayer]] += rolledNumber;
}

function updateScoreDisplay() {
  document.getElementById("player" + currentPlayer + "-score").textContent =
    score[players[currentPlayer]];
}

function updateTurn() {
  if (currentPlayer >= totalPlayers - 1) {
    currentPlayer = 0;
  } else {
    currentPlayer += 1;
  }
  document.getElementById("player-turn").textContent =
    players[currentPlayer] + "'s turn to roll !";
}

function resetPlayersScore(player) {
  document.getElementById("player" + player + "-score").textContent = 0;
}

function reset() {
  currentPlayer = 1;
  updateTurn();
  for (var i in players) {
    score[players[i]] = 0;
    resetPlayersScore(i);
  }
}

function checkResult() {
  for (var i in score) {
    if (score[i] >= 20) {
      return "Winner";
    }
  }
  return "No Winner";
}

function displayWinner() {
  document.getElementById("gameover").style.display = "block";
  document.getElementById("game").style.display = "none";
  document.getElementById("winner").innerHTML =
    "Hurray " +
    players[currentPlayer] +
    " reached 20 First and wins this round !";
}

function setUpGame() {
  players[0] = document.getElementById("player1").value;
  players[1] = document.getElementById("player2").value;
  score[players[0]] = 0;
  score[players[1]] = 0;

  totalPlayers = players.length;
  document.getElementById("player-turn").textContent =
    players[0] + "'s turn to roll !";
  document.getElementById("first-player-score").textContent =
    players[0] + "'s score:";
  document.getElementById("second-player-score").textContent =
    players[1] + "'s score:";
}

function validPlayerNames() {
  for (var i in players) {
    if (players[i] === "") {
      return false;
    }
  }
  return true;
}

document
  .getElementById("add-players-button")
  .addEventListener("click", function () {
    setUpGame();
    if (validPlayerNames()) {
      // setUpGame();
      document.getElementById("add-players").style.display = "none";
      document.getElementById("game").style.display = "block";
    } else {
    }
    document.getElementById("message").textContent =
      "Players Names cannot be empty";
    document.getElementById("message").style.color = "red";
  });

document.getElementById("roll-button").addEventListener("click", function () {
  let rolledNumber = rollANumber();
  updateScore(rolledNumber);
  result = checkResult();
  if (result === "Winner") {
    displayWinner();
    reset();
  } else {
    updateScoreDisplay();
    updateTurn();
  }
});

document
  .getElementById("play-again-button")
  .addEventListener("click", function () {
    document.getElementById("game").style.display = "block";
    document.getElementById("gameover").style.display = "none";
  });
