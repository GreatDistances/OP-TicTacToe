
function createBoard() {
    console.log(`new game board created`)
    const createBoard = () => {
        const gameBoard = [];
            for (i = 0; i < 3; i++) {
                gameBoard.push([]);
                for (j = 0; j < 3; j++) {
                    gameBoard[i].push("_");
                }
            };
        return gameBoard;
    }
    return createBoard();
}

function createGameController() {

    let board = createBoard();

    const createPlayerOrder = () => {
        let randomPlayer = Math.floor(Math.random() * 2 + 1); // random player starts match
        console.log(`Player ${randomPlayer} starts match`);
        return randomPlayer;

    }

    let activePlayer = createPlayerOrder();
    
    const createPlayer = (marker) => {
        const score = 0; // initialize player score
        return {marker, score};
    }

    const players = {1: createPlayer("X", 0), 2: createPlayer("O", 0)};
    console.log(players);

    const switchActivePlayer = () => {
        if (activePlayer === 1) {
            activePlayer = 2
        } else {
            activePlayer = 1;
        }
        console.log(`Player ${activePlayer} now active`);
    }

    const checkWinCondition = (m) => {
        if (board[0][0] === m && board[0][0] === board[1][0] && board[1][0] === board[2][0] // horiz top row
            || board[1][0] === m && board[1][0] === board[1][1] && board[1][1] === board[1][2] // horiz middle row
            || board[2][0] === m && board[2][0] === board[2][1] && board[2][1] === board[2][2] // horiz bottom row
            || board[0][0] === m && board[0][0] === board[0][1] && board[0][1] === board[0][2] // vertical left row
            || board[0][1] === m && board[0][1] === board[1][1] && board[1][1] === board[2][1] // vertical middle row
            || board[0][2] === m && board[0][2] === board[1][2] && board[1][2] === board[2][2] // vertical right row
            || board[0][0] === m && board[0][0] === board[1][1] && board[1][1] === board[2][2] // diagonal from top left to bottom right
            || board[2][0] === m && board[2][0] === board[1][1] && board[1][1] === board[0][2] // diagonal from bottom left to top right */
            ) {
                return true;
            }
            return false;
        }

    const scoreGame = () => {
        players[activePlayer].score++;
        console.log(`Player ${activePlayer}, "${players[activePlayer].marker}" wins this round`)
        console.log(`Player 1 score: ${players[1].score}, Player 2 score: ${players[2].score}`)
    }

    const resetGame = () => {
        board = createBoard();
        activePlayer = createPlayerOrder();
    }

    const displayBoard = () => {
        console.log(board.map(row => row.join(' ')).join('\n'));
    }

    const makeMove = (row, col) => {
        if (row <= 2 && col <= 2 && board[row][col] === "_") {
            board[row][col] = players[activePlayer].marker;
            displayBoard();
            if (checkWinCondition(players[activePlayer].marker) === true) {
                scoreGame();
                resetGame();
                return;
            } else {
                switchActivePlayer();
            }

        }
    }

    return {
        makeMove: makeMove,
    };
}

const game = createGameController();

game.makeMove(0,0); // X in top left, switch player
game.makeMove(1,1); // 0 in bottom right, switch player
game.makeMove(1,0); // X in middle left, switch player
game.makeMove(1,0); // attempting 0 in middle left, NO switch player
game.makeMove(2,2) // 0 in bottom right, switch player
game.makeMove(2,0) // X in bottom left, X wins
// new game
game.makeMove(2,0) // NEW GAME, 0 in bottom left
game.makeMove(1,1) // X in middle
game.makeMove(1,1) // attempting 0 in middle, NO switch player
game.makeMove(0,2) // 0 in top right, switch player
game.makeMove(0,1) // X in top middle, switch
game.makeMove(1,0) // 0 in middle left, switch
game.makeMove(2,1) // X in bottom middle, X wins
// new game