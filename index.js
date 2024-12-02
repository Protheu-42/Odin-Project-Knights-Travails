const knightTravails = function (knightStartPosition, target) {
  let board = generateBoard();
  let knightPosition = [knightStartPosition[0], knightStartPosition[1]];
  let knightHistory = [knightPosition];
  putTargetOnBoard();
  knightMoves();

  // Create a board of chess full of 0 for easy changing later
  function generateBoard() {
    let emptyBoard = [];
    for (let i = 0; i < 8; i++) {
      emptyBoard[i] = [];
      for (let j = 0; j < 8; j++) {
        emptyBoard[i].push(0);
      }
    }
    return emptyBoard;
  }

  // Dev way to have a visual look at the board for DEV reasons
  function printBoard() {
    for (let i = board.length - 1; i > -1; i--) {
      let line = "";
      for (let j = 0; j < board[i].length; j++) {
        if (j === 7) {
          line = line.concat(`${board[i][j]}`);
        } else {
          line = line.concat(`${board[i][j]} - `);
        }
      }
      console.log(line);
    }
  }

  // Algorithm to change board numeration using the target (A) input, used for the knightMoves as reference to find shortest path
  function putTargetOnBoard() {
    let line = target[0];
    let column = target[1];
    board[line][column] = "A";
    // Change numerations at "A" line
    if (column > 0) {
      // Left Side of the Line
      let counter = 0;
      for (let i = column - 1; i > -1; i--) {
        board[line][i] = ++counter;
      }
    }
    if (column < 7) {
      // Right Side of the Line
      let counter = 0;
      for (let i = column + 1; i < 8; i++) {
        board[line][i] = ++counter;
      }
    }

    // Change numerations off lines at down (higher)
    for (let i = line + 1; i < 8; i++) {
      if (board[i - 1][column] === "A") {
        board[i][column] = 1;
      } else {
        board[i][column] = board[i - 1][column] + 1;
      }
      for (let j = column - 1; j > -1; j--) {
        // Change numerations at line [i] from the column to the left
        board[i][j] = board[i][j + 1] + 1;
      }
      for (let j = column + 1; j < 8; j++) {
        // Change numerations at line [i] from column to the right
        board[i][j] = board[i][j - 1] + 1;
      }
    }

    // Change numerations off lines at up (lower)
    for (let i = line - 1; i > -1; i--) {
      if (board[i + 1][column] === "A") {
        board[i][column] = 1;
      } else {
        board[i][column] = board[i + 1][column] + 1;
      }
      for (let j = column - 1; j > -1; j--) {
        // Change numerations at line [i] from the column to the left
        board[i][j] = board[i][j + 1] + 1;
      }
      for (let j = column + 1; j < 8; j++) {
        // Change numerations at line [i] from column to the right
        board[i][j] = board[i][j - 1] + 1;
      }
    }
  }

  // Function that store updated objects for each movement and they value
  function movement() {
    // It's a function that return a function that return object to avoid initialize unused variables while checking just one
    function verticalLeftUpper() {
      let obj;
      try {
        obj = {
          value: board[knightPosition[0] + 2][knightPosition[1] - 1],
          knightPositionUpdated: [knightPosition[0] + 2, knightPosition[1] - 1],
        };
      } catch {
        obj = {
          value: null,
          knightPositionUpdated: [knightPosition[0] + 2, knightPosition[1] - 1],
        };
      }

      return obj;
    }
    function verticalRightUpper() {
      let obj;
      try {
        obj = {
          value: board[knightPosition[0] + 2][knightPosition[1] + 1],
          knightPositionUpdated: [knightPosition[0] + 2, knightPosition[1] + 1],
        };
      } catch {
        obj = {
          value: null,
          knightPositionUpdated: [knightPosition[0] + 2, knightPosition[1] + 1],
        };
      }
      return obj;
    }
    function horizontalLeftUpper() {
      let obj;
      try {
        obj = {
          value: board[knightPosition[0] - 1][knightPosition[1] - 2],
          knightPositionUpdated: [knightPosition[0] - 1, knightPosition[1] - 2],
        };
      } catch {
        obj = {
          value: null,
          knightPositionUpdated: [knightPosition[0] - 1, knightPosition[1] - 2],
        };
      }
      return obj;
    }

    function horizontalLeftDown() {
      let obj;
      try {
        obj = {
          value: board[knightPosition[0] + 1][knightPosition[1] - 2],
          knightPositionUpdated: [knightPosition[0] + 1, knightPosition[1] - 2],
        };
      } catch {
        obj = {
          value: null,
          knightPositionUpdated: [knightPosition[0] + 1, knightPosition[1] - 2],
        };
      }
      return obj;
    }

    function horizontalRightUpper() {
      let obj;
      try {
        obj = {
          value: board[knightPosition[0] - 1][knightPosition[1] + 2],
          knightPositionUpdated: [knightPosition[0] - 1, knightPosition[1] + 2],
        };
      } catch {
        obj = {
          value: null,
          knightPositionUpdated: [knightPosition[0] - 1, knightPosition[1] + 2],
        };
      }
      return obj;
    }

    function horizontalRightDown() {
      let obj;
      try {
        obj = {
          value: board[knightPosition[0] + 1][knightPosition[1] + 2],
          knightPositionUpdated: [knightPosition[0] + 1, knightPosition[1] + 2],
        };
      } catch {
        obj = {
          value: null,
          knightPositionUpdated: [knightPosition[0] + 1, knightPosition[1] + 2],
        };
      }
      return obj;
    }

    function verticalLeftDown() {
      let obj;
      try {
        obj = {
          value: board[knightPosition[0] - 2][knightPosition[1] - 1],
          knightPositionUpdated: [knightPosition[0] - 2, knightPosition[1] - 1],
        };
      } catch {
        obj = {
          value: null,
          knightPositionUpdated: [knightPosition[0] - 2, knightPosition[1] - 1],
        };
      }
      return obj;
    }

    function verticalRightDown() {
      let obj;
      try {
        obj = {
          value: board[knightPosition[0] - 2][knightPosition[1] + 1],
          knightPositionUpdated: [knightPosition[0] - 2, knightPosition[1] + 1],
        };
      } catch {
        obj = {
          value: null,
          knightPositionUpdated: [knightPosition[0] - 2, knightPosition[1] + 1],
        };
      }
      return obj;
    }
    return {
      verticalLeftUpper,
      verticalRightUpper,
      horizontalLeftUpper,
      horizontalLeftDown,
      horizontalRightUpper,
      horizontalRightDown,
      verticalLeftDown,
      verticalRightDown,
    };
  }

  // Function that make the chooses which move is the best
  function makeNextMove() {
    let move = {
      value: 100,
      position: [0, 0],
    };
    let movementFunctionArray = [
      movement().verticalLeftUpper(),
      movement().verticalRightUpper(),
      movement().horizontalLeftUpper(),
      movement().horizontalLeftDown(),
      movement().horizontalRightUpper(),
      movement().horizontalRightDown(),
      movement().verticalLeftDown(),
      movement().verticalRightDown(),
    ];

    // Switch case it's the one that check and do the movement
    // At 'case 3' it checks if it's in the same line that the target, that been the case it can been stuck in a infinite loop, if else will prevent this to happen
    for (let i = 0; i < movementFunctionArray.length; i++) {
      let actualMovement = movementFunctionArray[i];
      switch (actualMovement.value) {
        case null:
          break;
        case "A":
          knightHistory.push(actualMovement.knightPositionUpdated);
          knightPosition = "A";
          return;
        case 3:
          if (
            actualMovement.knightPositionUpdated[0] === target[0] ||
            actualMovement.knightPositionUpdated[1] === target[1]
          ) {
            break; // simply break to don't get stuck in a infinite loop
          } else {
            move.value = 3;
            move.position = actualMovement.knightPositionUpdated;
            break;
          }
        default:
          if (actualMovement.value < move.value && move.value != 3) {
            move.value = actualMovement.value;
            move.position = actualMovement.knightPositionUpdated;
            break;
          }
          break;
      }
    }
    knightPosition = move.position;
    knightHistory.push(knightPosition);
    // UPDATE knightPosition and KnightHistory with the move.KnightPositionUpdated,
    // Test to see if the loop conclude with him finding the answer
    // !!!!
  }

  function knightMoves() {
    while (knightPosition != "A") {
      makeNextMove();
    }
    console.log(knightHistory);
  }
};

knightTravails([0, 0], [7, 7]);
