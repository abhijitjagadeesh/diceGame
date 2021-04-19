var playersInfo = {
  player1: 0,
  player2: 0,
};

function initialSetup() {
  document.getElementById("");
}

currentPlayer = 1;

function getTotalPlayers() {
  var count = 0;
  for (var i in playersInfo) {
    if (playersInfo.hasOwnProperty(i)) count++;
  }
  return count;
}

totalPlayers = getTotalPlayers();

function rollANumber() {
  return Math.floor(Math.random() * 6) + 1;
}

function updateScore(rolledNumber) {
  playersInfo["player" + currentPlayer] += rolledNumber;
}

function updateScoreDisplay() {
  disableAllPlayers();
  enableCurrentPlayer();
  document.getElementById("player" + currentPlayer + "-score").textContent =
    playersInfo["player" + currentPlayer];
}

function updateTurn() {
  if (currentPlayer < totalPlayers) {
    currentPlayer += 1;
  } else {
    currentPlayer = 1;
  }
  document.getElementById("player-turn").textContent =
    "Player" + currentPlayer + " Turn";
}

function resetPlayersScore(player) {
  document.getElementById(player + "-score").textContent = 0;
}

function reset() {
  currentPlayer = 0;
  updateTurn();
  for (var i in playersInfo) {
    playersInfo[i] = 0;
    resetPlayersScore(i);
  }
}

function checkResult() {
  for (var i in playersInfo) {
    if (playersInfo[i] >= 20) {
      return "Winner";
    }
  }
  return "No Winner";
}

function displayWinner() {
  document.getElementById("gameover").style.display = "block";
  document.getElementById("game").style.display = "none";
  document.getElementById("winner").innerHTML =
    "Hurray Player " +
    currentPlayer +
    " reached 20 First and wins this round !";
}

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
