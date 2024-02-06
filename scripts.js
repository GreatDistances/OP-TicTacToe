const cell1 = document.getElementById("cell1");
const cell2 = document.getElementById("cell2");
const cell3 = document.getElementById("cell3");
const cell4 = document.getElementById("cell4");
const cell5 = document.getElementById("cell5");
const cell6 = document.getElementById("cell6");
const cell7 = document.getElementById("cell7");
const cell8 = document.getElementById("cell8");
const cell9 = document.getElementById("cell9");

const resetBoardBtn = document.getElementById("resetBoardBtn");
const resetScoresBtn = document.getElementById("resetScoresBtn");
const messageScores = document.getElementById("messageScores");
const messageAlerts = document.getElementById("messageAlerts");
const messageTurn = document.getElementById("messageTurn")

resetBoardBtn.addEventListener("click", (e) => {
    game.resetGame();
    messageAlerts.innerText = "Game board reset."
});

resetScoresBtn.addEventListener("click", (e) => {
    game.resetScores();
    console.log(`Player scores reset.`)
    messageAlerts.innerText = "Player scores reset."
});


cell1.addEventListener("click", (e) => {
  game.makeMove(0, 0, cell1);
});
cell2.addEventListener("click", (e) => {
  game.makeMove(0, 1, cell2);
});
cell3.addEventListener("click", (e) => {
  game.makeMove(0, 2, cell3);
});
cell4.addEventListener("click", (e) => {
  game.makeMove(1, 0, cell4);
});
cell5.addEventListener("click", (e) => {
  game.makeMove(1, 1, cell5);
});
cell6.addEventListener("click", (e) => {
  game.makeMove(1, 2, cell6);
});
cell7.addEventListener("click", (e) => {
  game.makeMove(2, 0, cell7);
});
cell8.addEventListener("click", (e) => {
  game.makeMove(2, 1, cell8);
});
cell9.addEventListener("click", (e) => {
  game.makeMove(2, 2, cell9);
});

function createBoard() {
  console.log(`New Tic Tac Toe game board created.`);
  const createBoard = () => {
    const gameBoard = [];
    for (i = 0; i < 3; i++) {
      gameBoard.push([]);
      for (j = 0; j < 3; j++) {
        gameBoard[i].push("_");
      }
    }
    cell1.innerText = "";
    cell2.innerText = "";
    cell3.innerText = "";
    cell4.innerText = "";
    cell5.innerText = "";
    cell6.innerText = "";
    cell7.innerText = "";
    cell8.innerText = "";
    cell9.innerText = "";
    return gameBoard;
  };
  return createBoard();
}

function createGameController() {
  let board = createBoard();
  let gameLocked = false;

  const createPlayer = (marker) => {
    const score = 0; // initialize player score
    return { marker, score };
  };

  const players = { 1: createPlayer("X", 0), 2: createPlayer("O", 0) };

  const createPlayerOrder = () => {
    let randomPlayer = Math.floor(Math.random() * 2 + 1); // random player starts match
    console.log(`Player ${randomPlayer} starts round`);
    return randomPlayer;
  };

  let activePlayer = createPlayerOrder();
  console.log(`Player ${activePlayer}, "${players[activePlayer].marker}" now active`);
  messageTurn.innerText = `Player ${activePlayer}, "${players[activePlayer].marker}", starts the round`;

  const switchActivePlayer = () => {
    if (activePlayer === 1) {
      activePlayer = 2;
    } else {
      activePlayer = 1;
    }
    console.log(`Player ${activePlayer}, "${players[activePlayer].marker}" now active`);
    messageTurn.innerText = `Player ${activePlayer}, "${players[activePlayer].marker}", now active`;
  };

  const checkRoundWinCondition = (m) => {
    if (
      (board[0][0] === m &&
        board[0][0] === board[1][0] &&
        board[1][0] === board[2][0]) || // horiz top row
      (board[1][0] === m &&
        board[1][0] === board[1][1] &&
        board[1][1] === board[1][2]) || // horiz middle row
      (board[2][0] === m &&
        board[2][0] === board[2][1] &&
        board[2][1] === board[2][2]) || // horiz bottom row
      (board[0][0] === m &&
        board[0][0] === board[0][1] &&
        board[0][1] === board[0][2]) || // vertical left row
      (board[0][1] === m &&
        board[0][1] === board[1][1] &&
        board[1][1] === board[2][1]) || // vertical middle row
      (board[0][2] === m &&
        board[0][2] === board[1][2] &&
        board[1][2] === board[2][2]) || // vertical right row
      (board[0][0] === m &&
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2]) || // diagonal from top left to bottom right
      (board[2][0] === m &&
        board[2][0] === board[1][1] &&
        board[1][1] === board[0][2]) // diagonal from bottom left to top right */
    ) {
      return true;
    }
    return false;
  };

  const checkCell = (row, col) => {
    if (board[row][col] !== "_") {
      console.log("Try a different game board cell, that one is full!");
      messageAlerts.innerText = "Try a different game board cell, that one is full!";
      return true;
    }
    return false;
  };

  const checkFullBoard = (board) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "_") {
          return false;
        }
      }
    }
    console.log(`Board full, cat's game.`);
    messageTurn.innerText = `Board full, cat's game.`
    gameLocked = true;
    displayScore();
    return true;
  };

  const checkMatchWinCondition = () => {
    if (players[activePlayer].score >= 3) {
      console.log(
        `Player ${activePlayer}, "${players[activePlayer].marker}" WINS THE MATCH`
      );
      messageAlerts.innerText = `Player ${activePlayer}, "${players[activePlayer].marker}" WINS THE MATCH`;
      messageTurn.innerText = "";
      return true;
    }
    return false;
  };

  const scoreGame = () => {
    players[activePlayer].score++;
    console.log(
      `Player ${activePlayer}, "${players[activePlayer].marker}" wins this round`
    );
    messageTurn.innerText = `Player ${activePlayer}, "${players[activePlayer].marker}" wins this round`
    displayScore();

  };

  const resetGame = () => {
    gameLocked = false;
    board = createBoard();
    activePlayer = createPlayerOrder();
    messageTurn.innerText = `Player ${activePlayer}, "${players[activePlayer].marker}" starts the round`;
  };

  const resetScores = () => {
    players[1].score = 0;
    players[2].score = 0;
    displayScore();
  }

  const resetMatch = () => {
    resetGame();
    resetScores();
  };

  const displayBoard = () => {
    console.log(board.map((row) => row.join(" ")).join("\n"));
  };

  const displayScore = () => {
    console.log(
        `Player 1 score: ${players[1].score}, Player 2 score: ${players[2].score}`
      );
      messageScores.innerText = `Player 1, "${players[1].marker}" score: ${players[1].score}, Player 2, "${players[2].marker}" score: ${players[2].score}`;
  }

  const makeMove = (row, col, cell) => {
    if (gameLocked) {
        return;
    }
    messageAlerts.innerText = "";
    if (checkCell(row, col) === true) {
      return;
    }
    if (row <= 2 && col <= 2 && board[row][col] === "_") {
      board[row][col] = players[activePlayer].marker;
      cell.innerText = players[activePlayer].marker;
      displayBoard();
      if (checkRoundWinCondition(players[activePlayer].marker) === true) {
        scoreGame();
        let gameOver = checkMatchWinCondition();
        if (gameOver) {
          resetMatch();
          gameLocked = true;
          return;
        } else {
          gameLocked = true;
        }
        return;
      } else {
        switchActivePlayer();
      }
      if (checkFullBoard(board) === true) {
        gameLocked = true;
        return;
      }
    }
  };

  return {
    makeMove: makeMove, resetGame: resetGame, resetScores: resetScores, gameLocked: gameLocked,
  };
}

const game = createGameController();

/* game.makeMove(0, 0); // X in top left, switch player
game.makeMove(1, 1); // 0 in bottom right, switch player
game.makeMove(1, 0); // X in middle left, switch player
game.makeMove(1, 0); // attempting 0 in middle left, NO switch player
game.makeMove(2, 2); // 0 in bottom right, switch player
game.makeMove(2, 0); // X in bottom left, X wins
// new game
game.makeMove(2, 0); // NEW GAME, 0 in bottom left
game.makeMove(1, 1); // X in middle
game.makeMove(1, 1); // attempting 0 in middle, NO switch player
game.makeMove(0, 2); // 0 in top right, switch player
game.makeMove(0, 1); // X in top middle, switch
game.makeMove(1, 0); // 0 in middle left, switch
game.makeMove(2, 1); // X in bottom middle, X wins
// new game
game.makeMove(2, 0); // NEW GAME, 0 in bottom left
game.makeMove(1, 1); // X in middle
game.makeMove(1, 1); // attempting 0 in middle, NO switch player
game.makeMove(0, 2); // 0 in top right, switch player
game.makeMove(0, 1); // X in top middle, switch
game.makeMove(1, 0); // 0 in middle left, switch
game.makeMove(2, 1); // X in bottom middle, X wins
// new game if match win condition not yet met
game.makeMove(0, 0); // X in top left, switch player */
