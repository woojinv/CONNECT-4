/*----- constants -----*/
const gameSlotIds = {
  column1: {
    1: "gs1-1",
    2: "gs1-2",
    3: "gs1-3",
    4: "gs1-4",
    5: "gs1-5",
    6: "gs1-6",
  },
  column2: {
    1: "gs2-1",
    2: "gs2-2",
    3: "gs2-3",
    4: "gs2-4",
    5: "gs2-5",
    6: "gs2-6",
  },
  column3: {
    1: "gs3-1",
    2: "gs3-2",
    3: "gs3-3",
    4: "gs3-4",
    5: "gs3-5",
    6: "gs3-6",
  },
  column4: {
    1: "gs4-1",
    2: "gs4-2",
    3: "gs4-3",
    4: "gs4-4",
    5: "gs4-5",
    6: "gs4-6",
  },
  column5: {
    1: "gs5-1",
    2: "gs5-2",
    3: "gs5-3",
    4: "gs5-4",
    5: "gs5-5",
    6: "gs5-6",
  },
  column6: {
    1: "gs6-1",
    2: "gs6-2",
    3: "gs6-3",
    4: "gs6-4",
    5: "gs6-5",
    6: "gs6-6",
  },
  column7: {
    1: "gs7-1",
    2: "gs7-2",
    3: "gs7-3",
    4: "gs7-4",
    5: "gs7-5",
    6: "gs7-6",
  },
};

const columnNumbersArr = ['column1', 'column2', 'column3', 'column4', 'column5', 'column6', 'column7']

/*----- app's state (variables) -----*/
let currentPlayer;
let piecesInARow;
let gameStatusActive;
let changedGameSlot;

const gameGrid = {
  column1: {
    height: 0,
    gameSlotStatus: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
    },
  },
  column2: {
    height: 0,
    gameSlotStatus: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
    },
  },
  column3: {
    height: 0,
    gameSlotStatus: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
    },
  },
  column4: {
    height: 0,
    gameSlotStatus: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
    },
  },
  column5: {
    height: 0,
    gameSlotStatus: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
    },
  },
  column6: {
    height: 0,
    gameSlotStatus: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
    },
  },
  column7: {
    height: 0,
    gameSlotStatus: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
    },
  },
};

/*----- cached element references -----*/
let column1El = document.querySelector("#column1");
let column2El = document.querySelector("#column2");
let column3El = document.querySelector("#column3");
let column4El = document.querySelector("#column4");
let column5El = document.querySelector("#column5");
let column6El = document.querySelector("#column6");
let column7El = document.querySelector("#column7");

let currentPlayerEl = document.querySelector("#current-player");
let startNewGameEl = document.querySelector("#start-new-game");
let gameSlotEls = document.querySelectorAll(".game-slot");

/*----- event listeners -----*/
column1El.addEventListener("click", updateStateVariables);
column3El.addEventListener("click", updateStateVariables);
column4El.addEventListener("click", updateStateVariables);
column5El.addEventListener("click", updateStateVariables);
column6El.addEventListener("click", updateStateVariables);
column7El.addEventListener("click", updateStateVariables);
column2El.addEventListener("click", updateStateVariables);

/*----- functions -----*/
// START NEW GAME FUNCTION
startNewGameEl.addEventListener("click", initialize);

// FUNCTION 1: INITIALIZE
initialize();
function initialize() {
  currentPlayer = 1;
  piecesInARow = 0;
  gameStatusActive = true;
  changedGameSlot = null;

  // Reset column heights
  for (let i = 1; i <= 7; i++) {
    gameGrid[`column${i}`].height = 0;
  }

  // Reset gameSlotStatus
  for (let i = 1; i <= 7; i++) {
    for (let j = 1; j <= 6; j++) {
      gameGrid[`column${i}`].gameSlotStatus[j] = null;
    }
  }

  // Clear all game slots
  gameSlotEls.forEach((elem) => {
    elem.style.background = "white";
  });

  render();
}

// FUNCTION 2: RENDER
function render() {
  // Place piece of currentPlayer
  let changedGameSlotEl = document.querySelector(`#${changedGameSlot}`);
  if (changedGameSlot !== null) {
    if (currentPlayer === 2) {
      changedGameSlotEl.style.background = "red";
    } else if (currentPlayer === 1) {
      changedGameSlotEl.style.background = "yellow";
    }
  }

  // Display who's turn is next
  if (currentPlayer === 1) {
    currentPlayerEl.style.background = "red";
  } else if (currentPlayer === 2) {
    currentPlayerEl.style.background = "yellow";
  }
}

// FUNCTION 3: CHANGE STATUS OF STATE VARIABLES ON CLICK
function updateStateVariables(e) {
  let column = getColumn(e);
  let emptyGameSlotIndex = getEmptyGameSlotIndex(column);

  // update game slot status based on player
  if (currentPlayer === 2) {
    gameGrid[column].gameSlotStatus[emptyGameSlotIndex] = 2;
  } else if (currentPlayer === 1) {
    gameGrid[column].gameSlotStatus[emptyGameSlotIndex] = 1;
  };

  // update column height
  if (gameGrid[column].height < 6) {
    gameGrid[column].height += 1;
  } else return;

  // update changedGameSlot
  changedGameSlot = gameSlotIds[column][emptyGameSlotIndex];


  // FUNCTION TO CHECK FOR MATCHES
  checkForMatches(column, emptyGameSlotIndex);


  updateCurrentPlayer();
  render();
}

/*----- helper functions -----*/
// RETRIEVES THE COLUMN of the selected game slot or column.
function getColumn(e) {
  if (e.target.classList[1] === "column") {
    return e.target.id;
  } else {
    return e.target.classList[2];
  }
}

// RETRIEVES THE INDEX of the first game slot that is empty, starting from the bottom of a column.
function getEmptyGameSlotIndex(column) {
  let gameSlotStatus = gameGrid[column].gameSlotStatus;
  for (let i = 6; i >= 0; i--) {
    if (gameSlotStatus[i] === null) {
      return i;
    }
  }
}

// UPDATES current player
function updateCurrentPlayer() {
  if (currentPlayer === 1) {
    currentPlayer = 2;
  } else if (currentPlayer === 2) {
    currentPlayer = 1;
  }
}


// CHECK SURROUNDING SLOTS FOR MATCHES
function checkForMatches(column, gameSlot) {
  piecesInARow = 0;

  let currentGameSlotStatus = gameGrid[column].gameSlotStatus[gameSlot];
  let currentIndex = columnNumbersArr.indexOf(column);
  

  let columnToLeftExists = checkIfColumnToLeftExists(currentIndex);
  let columnToRightExists = checkIfColumnToRightExists(currentIndex);

  if (columnToLeftExists && columnToRightExists) {
    checkLeftColumns(currentIndex, currentGameSlotStatus, gameSlot);
    checkRightColumns(currentIndex, currentGameSlotStatus, gameSlot);
    checkDownGameSlots(currentIndex, currentGameSlotStatus, gameSlot);
  } else if (columnToLeftExists === false) {
    checkRightColumns(currentIndex, currentGameSlotStatus, gameSlot);
    checkDownGameSlots(currentIndex, currentGameSlotStatus, gameSlot);
  } else if (columnToRightExists === false) {
    checkLeftColumns(currentIndex, currentGameSlotStatus, gameSlot);
    checkDownGameSlots(currentIndex, currentGameSlotStatus, gameSlot);
  }
  
  console.log(piecesInARow);

}


// function to check if column to LEFT exists 
function checkIfColumnToLeftExists(index) {
  if (gameGrid[columnNumbersArr[index - 1]] === undefined) {
    return false;
  } else if (gameGrid[columnNumbersArr[index - 1]] !== undefined) {
    return true;
  }
}

// function to check if column to RIGHT exists 
function checkIfColumnToRightExists(index) {
  if (gameGrid[columnNumbersArr[index + 1]] === undefined) {
    return false;
  } else if (gameGrid[columnNumbersArr[index + 1]] !== undefined) {
    return true;
  }
}


// function to check columns to the RIGHT
function checkLeftColumns(currentIndex, currentGameSlotStatus, gameSlot) {
  // LEFT and UP
 if (gameGrid[columnNumbersArr[currentIndex - 1]].gameSlotStatus[gameSlot - 1] === currentGameSlotStatus) {
    piecesInARow = 1;
    piecesInARow++;
  }

  // LEFT
  if (gameGrid[columnNumbersArr[currentIndex - 1]].gameSlotStatus[gameSlot] === currentGameSlotStatus) {
    piecesInARow = 1;
    piecesInARow++;
  }

  // LEFT and DOWN
  if (gameGrid[columnNumbersArr[currentIndex - 1]].gameSlotStatus[gameSlot + 1] === currentGameSlotStatus) {
    piecesInARow = 1;
    piecesInARow++;
  } 
}


// function to check columns to the RIGHT
function checkRightColumns(currentIndex, currentGameSlotStatus, gameSlot) {
// RIGHT and DOWN
  if (gameGrid[columnNumbersArr[currentIndex + 1]].gameSlotStatus[gameSlot + 1] === currentGameSlotStatus) {
    piecesInARow = 1;
    piecesInARow++;
  }

  // RIGHT
  if (gameGrid[columnNumbersArr[currentIndex + 1]].gameSlotStatus[gameSlot] === currentGameSlotStatus) {
    piecesInARow = 1;
    piecesInARow++;
  }

  // UP / RIGHT
  if (gameGrid[columnNumbersArr[currentIndex + 1]].gameSlotStatus[gameSlot - 1] === currentGameSlotStatus) {
    piecesInARow = 1;
    piecesInARow++;
  }
}


// function to check DOWN game slots
function checkDownGameSlots(currentIndex, currentGameSlotStatus, gameSlot) {
  if (gameGrid[columnNumbersArr[currentIndex]].gameSlotStatus[gameSlot + 1] === currentGameSlotStatus) {
    piecesInARow = 1;
    piecesInARow++;
  }
}
