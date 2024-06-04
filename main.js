const gameBoard = () => {
  const board = [];

  const resetBoard = () => {
    for (let i = 0; i < 9; i++) {
      board.pop();
    }
    for (let i = 0; i < 9; i++) {
      board.push(null);
    }
  };

  const printBoard = () => {
    for (let i = 0; i < 3; i++) {
      console.log(`
      ${board[3 * i] === null ? 3 * i : board[3 * i]} , ${
        board[3 * i + 1] === null ? 3 * i + 1 : board[3 * i + 1]
      } , ${board[3 * i + 2] === null ? 3 * i + 2 : board[3 * i + 2]}`);
    }
  };

  const changeCellValue = (index, value) => {
    board[index] = value;
  };

  const getCellValue = (index) => board[index]

  resetBoard();

  return { resetBoard, printBoard, changeCellValue , getCellValue };
};

const gameController = (
  playerOneName = "player1",
  playerTwoName = "player2"
) => {
  const winners = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let winner = null;
  const board = gameBoard();
  let gameStart = false;
  const players = [
    {
      playerName: playerOneName,
      playerSymbol: "X",
      playerScore: 0,
    },
    {
      playerName: playerTwoName,
      playerSymbol: "O",
      playerScore: 0,
    },
  ];
  let turn = players[0];

  const switchPlayerTurn = () => {
    turn = turn === players[0] ? players[1] : players[0];
  };

  const printTurn = () => {
    board.printBoard();
    if(winner) console.log(`${winner.playerName} is the winner`)
    else console.log(`it is ${turn.playerSymbol}'s turn now`);
  };

  const play = (place) => {
    if (winner) {
      console.log(`${winner.playerName} has already won, you must restart if you want to play agian`);
    } else if (board.getCellValue(place)) {
      console.log("you can't play here as this place is already occupied");
    }else{
      if (!gameStart) gameStart = !gameStart;
      place = parseInt(place);
      board.changeCellValue(place, turn.playerSymbol);
      checkWinner();
      switchPlayerTurn();
      printTurn();
      console.log(board.getCellValue(0))
    }
  };
  // SOMETHING WRONG WITH WINNER CODE
  const checkWinner = () => {
    for (let i = 0; i < winners.length; i++) {
      const element = winners[i];
      if (
        board.getCellValue(element[0]) &&
        board.getCellValue(element[0]) === board.getCellValue(element[1])&&
        board.getCellValue(element[0]) === board.getCellValue(element[2])
      ) {
        winner = turn
      }
    }

  };

  const resetRound = () => {
    board.resetBoard();
    winner = null;
    gameStart = false;
    turn = players[0];
    printTurn()
  };

  printTurn();

  return { gameStart, turn, play, printTurn, switchPlayerTurn, resetRound };
};

const game = gameController();
