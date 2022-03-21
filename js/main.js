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

const columnNumbersArr = [
  "column1",
  "column2",
  "column3",
  "column4",
  "column5",
  "column6",
  "column7",
];

/*----- app's state (variables) -----*/
let currentPlayer;
let gameStatusActive;
let changedGameSlot;

  // COLUMN HEIGHT and GAME SLOT STATUS.
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
  let gameGridEl = document.querySelector("#game-grid");

  // parts of the page.
  let mainDisplayEl = document.querySelector('#main-display');
  let currentPlayerEl = document.querySelector("#current-player");
  let startNewGameEl = document.querySelector("#start-new-game");
  let gameSlotEls = document.querySelectorAll(".game-slot");


/*----- event listeners -----*/
  // MOUSEOVER
  gameGridEl.addEventListener("mouseover", displayGhostPiece);

  // MOUSEOUT
  gameGridEl.addEventListener("mouseout", removeGhostPiece);
  

  // CLICK
  gameGridEl.addEventListener("click", updateStateVariables);

  // START NEW GAME
  startNewGameEl.addEventListener("click", initialize);

  
/*----- functions -----*/
// 1. DISPLAY GHOST PIECE
function displayGhostPiece(e) {
  if (e.target.classList[1] === "column") {
    let column = getColumn(e);
    let emptyGameSlotIndex = getEmptyGameSlotIndex(column);
    let emptyGameSlot = gameSlotIds[column][emptyGameSlotIndex];
    let emptyGameSlotEl = document.querySelector(`#${emptyGameSlot}`);
    if (gameStatusActive === true) {
      if (currentPlayer === 2) {
        emptyGameSlotEl.style.backgroundColor = "rgb(40 107 48)";
      } else if (currentPlayer === 1) {
        emptyGameSlotEl.style.backgroundColor = "rgb(128 207 116)	";
      }
    }
  }
}

// 2. REMOVE GHOST PIECE
function removeGhostPiece(e) {
  if (e.target.classList[1] === "column") {
    let column = getColumn(e);
    let emptyGameSlotIndex = getEmptyGameSlotIndex(column);
    let emptyGameSlot = gameSlotIds[column][emptyGameSlotIndex];
    let emptyGameSlotEl = document.querySelector(`#${emptyGameSlot}`);
    if (gameStatusActive === true) {
      if (currentPlayer === 1) {
        emptyGameSlotEl.style.backgroundColor = "rgb(101	108	119	)";
      } else if (currentPlayer === 2) {
        emptyGameSlotEl.style.backgroundColor = "rgb(101	108	119	)	";
      }
    }
  }
}

// 3. INITIALIZE
initialize();
function initialize() {
  currentPlayer = 1;
  gameStatusActive = true;
  changedGameSlot = null;
  resetColumnHeights();
  resetGameSlotStatus();
  emptyGameSlots();
  resetMainDisplay();
  render();
}
  // helper functions for initialize():~~~~~~~~~~~~~~
    function resetColumnHeights() {
      for (let i = 1; i <= 7; i++) {
        gameGrid[`column${i}`].height = 0;
      }
    }

    function resetGameSlotStatus() {
      for (let i = 1; i <= 7; i++) {
        for (let j = 1; j <= 6; j++) {
          gameGrid[`column${i}`].gameSlotStatus[j] = null;
        }
      }
    }

    function emptyGameSlots() {
      gameSlotEls.forEach(elem => elem.style.backgroundColor = "rgb(99	108	120	)");
    }

    function resetMainDisplay() {
      mainDisplayEl.innerText = "Connect Four";
      mainDisplayEl.parentElement.style.backgroundColor = "rgb(48	51	57)";
      mainDisplayEl.style.color = "rgb(225 225 225)";
    }
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// 4. RENDER
function render() {
  placePiece();
  displayWhoseTurn();
  displayWinner();
  displayDraw();
}
  // helper functions for render():~~~~~~~~~~~~~~
  function placePiece() {
    let changedGameSlotEl = document.querySelector(`#${changedGameSlot}`);
    if (changedGameSlot !== null && gameStatusActive === true) {
      if (currentPlayer === 1) {
        changedGameSlotEl.style.backgroundColor = "rgb(40 107 48)";
      } else if (currentPlayer === 2) {
        changedGameSlotEl.style.backgroundColor = "rgb(128 207 116)	";
      }
    } else if (gameStatusActive === false) {
      if (currentPlayer === 1) {
        changedGameSlotEl.style.backgroundColor = "rgb(128 207 116)";
      } else if (currentPlayer === 2) {
        changedGameSlotEl.style.backgroundColor = "rgb(40 107 48)";
      }
    }
  }

  function displayWhoseTurn() {
    if (currentPlayer === 2) {
      currentPlayerEl.style.backgroundColor = "rgb(40 107 48)";
      currentPlayerEl.style.color = "rgb(225 225 225)";
    } else if (currentPlayer === 1) {
      currentPlayerEl.style.backgroundColor = "rgb(128 207 116)";
      currentPlayerEl.style.color = "rgb(46 51 57)";
    }
  }

  function displayWinner() {
    if (gameStatusActive === false) {
      mainDisplayEl.innerText = `Player ${currentPlayer} Wins!`;
      if (currentPlayer === 2) {
        mainDisplayEl.parentElement.style.backgroundColor = "rgb(40 107 48)";
        mainDisplayEl.style.color = "rgb(225 225 225)";
        currentPlayerEl.style.backgroundColor = "rgb(238	225	112)";
        currentPlayerEl.style.color = "rgb(46 51 57)";
      } else if (currentPlayer === 1) {
        mainDisplayEl.parentElement.style.backgroundColor = "rgb(128 207 116)";
        mainDisplayEl.style.color = "rgb(46 51 57)";
        currentPlayerEl.style.backgroundColor = "rgb(238	225	112)";
        currentPlayerEl.style.color = "rgb(46 51 57)";
      }
    }
  }

  function displayDraw() {
    let gameSlotArr = [];
    for (let i = 1; i <= 7; i++) {
      for (let j = 1; j <= 6; j++) {
        gameSlotArr.push(gameGrid[`column${i}`].gameSlotStatus[j]);
        }
      }
    if (gameSlotArr.includes(null) === false && mainDisplayEl.innerText !== `Player ${currentPlayer} Wins!`) {
      mainDisplayEl.innerText = `It's a Draw!`;
      mainDisplayEl.parentElement.style.backgroundColor = "rgb(238	225	112)";
      mainDisplayEl.style.color = "rgb(46 51 57)";
    }
  }
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



// 5. UPDATESTATEVARIABLES
function updateStateVariables(e) {
  let column = getColumn(e);
  let emptyGameSlotIndex = getEmptyGameSlotIndex(column);
  if (gameStatusActive === false) {
    initialize();
  } else if (gameStatusActive === true) {
    updateGameSlotStatus(column, emptyGameSlotIndex);
    updateColumnHeight(column);
    updateChangedGameSlot(column, emptyGameSlotIndex);
    updateCurrentPlayer();
    checkWinCondition();
    render();
  }
  }
  // helper functions for updateStateVariables()
  function getColumn(e) {
    return e.target.classList[1] === "column" ? e.target.id : e.target.classList[2];
  }

  function getEmptyGameSlotIndex(column) {
    let gameSlotStatus = gameGrid[column].gameSlotStatus;
    for (let i = 6; i >= 0; i--) {
      if (gameSlotStatus[i] === null) {
        return i;
      }
    }
  }  

  function updateGameSlotStatus(column, emptyGameSlotIndex) {
    if (currentPlayer === 2) {
      gameGrid[column].gameSlotStatus[emptyGameSlotIndex] = 2;
    } else if (currentPlayer === 1) {
      gameGrid[column].gameSlotStatus[emptyGameSlotIndex] = 1;
    }
  }

  function updateColumnHeight(column) {
    if (gameGrid[column].height < 6) {
      gameGrid[column].height += 1;
    } else return;
  }

  function updateChangedGameSlot(column, emptyGameSlotIndex) {
    changedGameSlot = gameSlotIds[column][emptyGameSlotIndex];
  }

  function updateCurrentPlayer() {
    if (gameStatusActive === false) {
      if (currentPlayer === 1) {
        return;
      } else if (currentPlayer === 2) {
        return;
        } 
      } else if (gameStatusActive === true) {
        if (currentPlayer === 1) {
          currentPlayer = 2;
        } else if (currentPlayer === 2) {
          currentPlayer = 1;
      }
    }
  }

  function checkWinCondition() {
    let column1 = gameGrid.column1.gameSlotStatus;
    let column2 = gameGrid.column2.gameSlotStatus;
    let column3 = gameGrid.column3.gameSlotStatus;
    let column4 = gameGrid.column4.gameSlotStatus;
    let column5 = gameGrid.column5.gameSlotStatus;
    let column6 = gameGrid.column6.gameSlotStatus;
    let column7 = gameGrid.column7.gameSlotStatus;

    // column 1
    if ((column1[1] === 1 && column1[2] === 1 && column1[3] === 1 && column1[4] === 1) 
    || (column1[2] === 1 && column1[3] === 1 && column1[4] === 1 && column1[5] === 1)
    || (column1[3] === 1 && column1[4] === 1 && column1[5] === 1 && column1[6] === 1)

    // column 2
    || (column2[1] === 1 && column2[2] === 1 && column2[3] === 1 && column2[4] === 1)
    || (column2[2] === 1 && column2[3] === 1 && column2[4] === 1 && column2[5] === 1)
    || (column2[3] === 1 && column2[4] === 1 && column2[5] === 1 && column2[6] === 1)

    // column 3
    || (column3[1] === 1 && column3[2] === 1 && column3[3] === 1 && column3[4] === 1)
    || (column3[2] === 1 && column3[3] === 1 && column3[4] === 1 && column3[5] === 1)
    || (column3[3] === 1 && column3[4] === 1 && column3[5] === 1 && column3[6] === 1)

    // column 4 
    || (column4[1] === 1 && column4[2] === 1 && column4[3] === 1 && column4[4] === 1)
    || (column4[2] === 1 && column4[3] === 1 && column4[4] === 1 && column4[5] === 1)
    || (column4[3] === 1 && column4[4] === 1 && column4[5] === 1 && column4[6] === 1)

    // column 5
    || (column5[1] === 1 && column5[2] === 1 && column5[3] === 1 && column5[4] === 1)
    || (column5[2] === 1 && column5[3] === 1 && column5[4] === 1 && column5[5] === 1)
    || (column5[3] === 1 && column5[4] === 1 && column5[5] === 1 && column5[6] === 1)

    // column 6
    || (column6[1] === 1 && column6[2] === 1 && column6[3] === 1 && column6[4] === 1)
    || (column6[2] === 1 && column6[3] === 1 && column6[4] === 1 && column6[5] === 1)
    || (column6[3] === 1 && column6[4] === 1 && column6[5] === 1 && column6[6] === 1)

    // column 7
    || (column7[1] === 1 && column7[2] === 1 && column7[3] === 1 && column7[4] === 1)
    || (column7[2] === 1 && column7[3] === 1 && column7[4] === 1 && column7[5] === 1)
    || (column7[3] === 1 && column7[4] === 1 && column7[5] === 1 && column7[6] === 1)

    // Row 1 (top row)
    || (gameGrid.column1.gameSlotStatus[1] === 1 && gameGrid.column2.gameSlotStatus[1] === 1 && gameGrid.column3.gameSlotStatus[1] === 1 && gameGrid.column4.gameSlotStatus[1] === 1)
    || (gameGrid.column2.gameSlotStatus[1] === 1 && gameGrid.column3.gameSlotStatus[1] === 1 && gameGrid.column4.gameSlotStatus[1] === 1 && gameGrid.column5.gameSlotStatus[1] === 1)
    || (gameGrid.column3.gameSlotStatus[1] === 1 && gameGrid.column4.gameSlotStatus[1] === 1 && gameGrid.column5.gameSlotStatus[1] === 1 && gameGrid.column6.gameSlotStatus[1] === 1)
    || (gameGrid.column4.gameSlotStatus[1] === 1 && gameGrid.column5.gameSlotStatus[1] === 1 && gameGrid.column6.gameSlotStatus[1] === 1 && gameGrid.column7.gameSlotStatus[1] === 1)
    
    // Row 2 
    || (gameGrid.column1.gameSlotStatus[2] === 1 && gameGrid.column2.gameSlotStatus[2] === 1 && gameGrid.column3.gameSlotStatus[2] === 1 && gameGrid.column4.gameSlotStatus[2] === 1)
    || (gameGrid.column2.gameSlotStatus[2] === 1 && gameGrid.column3.gameSlotStatus[2] === 1 && gameGrid.column4.gameSlotStatus[2] === 1 && gameGrid.column5.gameSlotStatus[2] === 1)
    || (gameGrid.column3.gameSlotStatus[2] === 1 && gameGrid.column4.gameSlotStatus[2] === 1 && gameGrid.column5.gameSlotStatus[2] === 1 && gameGrid.column6.gameSlotStatus[2] === 1)
    || (gameGrid.column4.gameSlotStatus[2] === 1 && gameGrid.column5.gameSlotStatus[2] === 1 && gameGrid.column6.gameSlotStatus[2] === 1 && gameGrid.column7.gameSlotStatus[2] === 1)
    
    // Row 3
    || (gameGrid.column1.gameSlotStatus[3] === 1 && gameGrid.column2.gameSlotStatus[3] === 1 && gameGrid.column3.gameSlotStatus[3] === 1 && gameGrid.column4.gameSlotStatus[3] === 1)
    || (gameGrid.column2.gameSlotStatus[3] === 1 && gameGrid.column3.gameSlotStatus[3] === 1 && gameGrid.column4.gameSlotStatus[3] === 1 && gameGrid.column5.gameSlotStatus[3] === 1)
    || (gameGrid.column3.gameSlotStatus[3] === 1 && gameGrid.column4.gameSlotStatus[3] === 1 && gameGrid.column5.gameSlotStatus[3] === 1 && gameGrid.column6.gameSlotStatus[3] === 1)
    || (gameGrid.column4.gameSlotStatus[3] === 1 && gameGrid.column5.gameSlotStatus[3] === 1 && gameGrid.column6.gameSlotStatus[3] === 1 && gameGrid.column7.gameSlotStatus[3] === 1)
    
    // Row 4
    || (gameGrid.column1.gameSlotStatus[4] === 1 && gameGrid.column2.gameSlotStatus[4] === 1 && gameGrid.column3.gameSlotStatus[4] === 1 && gameGrid.column4.gameSlotStatus[4] === 1)
    || (gameGrid.column2.gameSlotStatus[4] === 1 && gameGrid.column3.gameSlotStatus[4] === 1 && gameGrid.column4.gameSlotStatus[4] === 1 && gameGrid.column5.gameSlotStatus[4] === 1)
    || (gameGrid.column3.gameSlotStatus[4] === 1 && gameGrid.column4.gameSlotStatus[4] === 1 && gameGrid.column5.gameSlotStatus[4] === 1 && gameGrid.column6.gameSlotStatus[4] === 1)
    || (gameGrid.column4.gameSlotStatus[4] === 1 && gameGrid.column5.gameSlotStatus[4] === 1 && gameGrid.column6.gameSlotStatus[4] === 1 && gameGrid.column7.gameSlotStatus[4] === 1)
    
    // Row 5
    || (gameGrid.column1.gameSlotStatus[5] === 1 && gameGrid.column2.gameSlotStatus[5] === 1 && gameGrid.column3.gameSlotStatus[5] === 1 && gameGrid.column4.gameSlotStatus[5] === 1)
    || (gameGrid.column2.gameSlotStatus[5] === 1 && gameGrid.column3.gameSlotStatus[5] === 1 && gameGrid.column4.gameSlotStatus[5] === 1 && gameGrid.column5.gameSlotStatus[5] === 1)
    || (gameGrid.column3.gameSlotStatus[5] === 1 && gameGrid.column4.gameSlotStatus[5] === 1 && gameGrid.column5.gameSlotStatus[5] === 1 && gameGrid.column6.gameSlotStatus[5] === 1)
    || (gameGrid.column4.gameSlotStatus[5] === 1 && gameGrid.column5.gameSlotStatus[5] === 1 && gameGrid.column6.gameSlotStatus[5] === 1 && gameGrid.column7.gameSlotStatus[5] === 1)
    
    // Row 6
    || (gameGrid.column1.gameSlotStatus[6] === 1 && gameGrid.column2.gameSlotStatus[6] === 1 && gameGrid.column3.gameSlotStatus[6] === 1 && gameGrid.column4.gameSlotStatus[6] === 1)
    || (gameGrid.column2.gameSlotStatus[6] === 1 && gameGrid.column3.gameSlotStatus[6] === 1 && gameGrid.column4.gameSlotStatus[6] === 1 && gameGrid.column5.gameSlotStatus[6] === 1)
    || (gameGrid.column3.gameSlotStatus[6] === 1 && gameGrid.column4.gameSlotStatus[6] === 1 && gameGrid.column5.gameSlotStatus[6] === 1 && gameGrid.column6.gameSlotStatus[6] === 1)
    || (gameGrid.column4.gameSlotStatus[6] === 1 && gameGrid.column5.gameSlotStatus[6] === 1 && gameGrid.column6.gameSlotStatus[6] === 1 && gameGrid.column7.gameSlotStatus[6] === 1)
    

    // Diagonals "/"" from left
    || (gameGrid.column1.gameSlotStatus[4] === 1 && gameGrid.column2.gameSlotStatus[3] === 1 && gameGrid.column3.gameSlotStatus[2] === 1 && gameGrid.column4.gameSlotStatus[1] === 1)

    || (gameGrid.column1.gameSlotStatus[5] === 1 && gameGrid.column2.gameSlotStatus[4] === 1 && gameGrid.column3.gameSlotStatus[3] === 1 && gameGrid.column4.gameSlotStatus[2] === 1)
    || (gameGrid.column2.gameSlotStatus[4] === 1 && gameGrid.column3.gameSlotStatus[3] === 1 && gameGrid.column4.gameSlotStatus[2] === 1 && gameGrid.column5.gameSlotStatus[1] === 1)
    
    || (gameGrid.column1.gameSlotStatus[6] === 1 && gameGrid.column2.gameSlotStatus[5] === 1 && gameGrid.column3.gameSlotStatus[4] === 1 && gameGrid.column4.gameSlotStatus[3] === 1)
    || (gameGrid.column2.gameSlotStatus[5] === 1 && gameGrid.column3.gameSlotStatus[4] === 1 && gameGrid.column4.gameSlotStatus[3] === 1 && gameGrid.column5.gameSlotStatus[2] === 1)
    || (gameGrid.column3.gameSlotStatus[4] === 1 && gameGrid.column4.gameSlotStatus[3] === 1 && gameGrid.column5.gameSlotStatus[2] === 1 && gameGrid.column6.gameSlotStatus[1] === 1)
    
    || (gameGrid.column2.gameSlotStatus[6] === 1 && gameGrid.column3.gameSlotStatus[5] === 1 && gameGrid.column4.gameSlotStatus[4] === 1 && gameGrid.column5.gameSlotStatus[3] === 1)
    || (gameGrid.column3.gameSlotStatus[5] === 1 && gameGrid.column4.gameSlotStatus[4] === 1 && gameGrid.column5.gameSlotStatus[3] === 1 && gameGrid.column6.gameSlotStatus[2] === 1)
    || (gameGrid.column4.gameSlotStatus[4] === 1 && gameGrid.column5.gameSlotStatus[3] === 1 && gameGrid.column6.gameSlotStatus[2] === 1 && gameGrid.column7.gameSlotStatus[1] === 1)
    
    || (gameGrid.column3.gameSlotStatus[6] === 1 && gameGrid.column4.gameSlotStatus[5] === 1 && gameGrid.column5.gameSlotStatus[4] === 1 && gameGrid.column6.gameSlotStatus[3] === 1)
    || (gameGrid.column4.gameSlotStatus[5] === 1 && gameGrid.column5.gameSlotStatus[4] === 1 && gameGrid.column6.gameSlotStatus[3] === 1 && gameGrid.column7.gameSlotStatus[2] === 1)

    || (gameGrid.column4.gameSlotStatus[6] === 1 && gameGrid.column5.gameSlotStatus[5] === 1 && gameGrid.column6.gameSlotStatus[4] === 1 && gameGrid.column7.gameSlotStatus[3] === 1)


    // Diagonals "\" from left
    || (gameGrid.column1.gameSlotStatus[3] === 1 && gameGrid.column2.gameSlotStatus[4] === 1 && gameGrid.column3.gameSlotStatus[5] === 1 && gameGrid.column4.gameSlotStatus[6] === 1)

    || (gameGrid.column1.gameSlotStatus[2] === 1 && gameGrid.column2.gameSlotStatus[3] === 1 && gameGrid.column3.gameSlotStatus[4] === 1 && gameGrid.column4.gameSlotStatus[5] === 1)
    || (gameGrid.column2.gameSlotStatus[3] === 1 && gameGrid.column3.gameSlotStatus[4] === 1 && gameGrid.column4.gameSlotStatus[5] === 1 && gameGrid.column5.gameSlotStatus[6] === 1)
    
    || (gameGrid.column1.gameSlotStatus[1] === 1 && gameGrid.column2.gameSlotStatus[2] === 1 && gameGrid.column3.gameSlotStatus[3] === 1 && gameGrid.column4.gameSlotStatus[4] === 1)
    || (gameGrid.column2.gameSlotStatus[2] === 1 && gameGrid.column3.gameSlotStatus[3] === 1 && gameGrid.column4.gameSlotStatus[4] === 1 && gameGrid.column5.gameSlotStatus[5] === 1)
    || (gameGrid.column3.gameSlotStatus[3] === 1 && gameGrid.column4.gameSlotStatus[4] === 1 && gameGrid.column5.gameSlotStatus[5] === 1 && gameGrid.column6.gameSlotStatus[6] === 1)
    
    || (gameGrid.column2.gameSlotStatus[1] === 1 && gameGrid.column3.gameSlotStatus[2] === 1 && gameGrid.column4.gameSlotStatus[3] === 1 && gameGrid.column5.gameSlotStatus[4] === 1)
    || (gameGrid.column3.gameSlotStatus[2] === 1 && gameGrid.column4.gameSlotStatus[3] === 1 && gameGrid.column5.gameSlotStatus[4] === 1 && gameGrid.column6.gameSlotStatus[5] === 1)
    || (gameGrid.column4.gameSlotStatus[3] === 1 && gameGrid.column5.gameSlotStatus[4] === 1 && gameGrid.column6.gameSlotStatus[5] === 1 && gameGrid.column7.gameSlotStatus[6] === 1)
    
    || (gameGrid.column3.gameSlotStatus[1] === 1 && gameGrid.column4.gameSlotStatus[2] === 1 && gameGrid.column5.gameSlotStatus[3] === 1 && gameGrid.column6.gameSlotStatus[4] === 1)
    || (gameGrid.column4.gameSlotStatus[2] === 1 && gameGrid.column5.gameSlotStatus[3] === 1 && gameGrid.column6.gameSlotStatus[4] === 1 && gameGrid.column7.gameSlotStatus[5] === 1)

    || (gameGrid.column4.gameSlotStatus[1] === 1 && gameGrid.column5.gameSlotStatus[2] === 1 && gameGrid.column6.gameSlotStatus[3] === 1 && gameGrid.column7.gameSlotStatus[4] === 1)
  ) 
    
    {
      currentPlayer = 1;
      gameStatusActive = false;



    } else if (
    // column 1
    (column1[1] === 2 && column1[2] === 2 && column1[3] === 2 && column1[4] === 2) 
    || (column1[2] === 2 && column1[3] === 2 && column1[4] === 2 && column1[5] === 2)
    || (column1[3] === 2 && column1[4] === 2 && column1[5] === 2 && column1[6] === 2)

    // column 2
    || (column2[1] === 2 && column2[2] === 2 && column2[3] === 2 && column2[4] === 2)
    || (column2[2] === 2 && column2[3] === 2 && column2[4] === 2 && column2[5] === 2)
    || (column2[3] === 2 && column2[4] === 2 && column2[5] === 2 && column2[6] === 2)

    // column 3
    || (column3[1] === 2 && column3[2] === 2 && column3[3] === 2 && column3[4] === 2)
    || (column3[2] === 2 && column3[3] === 2 && column3[4] === 2 && column3[5] === 2)
    || (column3[3] === 2 && column3[4] === 2 && column3[5] === 2 && column3[6] === 2)

    // column 4 
    || (column4[1] === 2 && column4[2] === 2 && column4[3] === 2 && column4[4] === 2)
    || (column4[2] === 2 && column4[3] === 2 && column4[4] === 2 && column4[5] === 2)
    || (column4[3] === 2 && column4[4] === 2 && column4[5] === 2 && column4[6] === 2)

    // column 2
    || (column5[1] === 2 && column5[2] === 2 && column5[3] === 2 && column5[4] === 2)
    || (column5[2] === 2 && column5[3] === 2 && column5[4] === 2 && column5[5] === 2)
    || (column5[3] === 2 && column5[4] === 2 && column5[5] === 2 && column5[6] === 2)

    // column 6
    || (column6[1] === 2 && column6[2] === 2 && column6[3] === 2 && column6[4] === 2)
    || (column6[2] === 2 && column6[3] === 2 && column6[4] === 2 && column6[5] === 2)
    || (column6[3] === 2 && column6[4] === 2 && column6[5] === 2 && column6[6] === 2)

    // column 7
    || (column7[1] === 2 && column7[2] === 2 && column7[3] === 2 && column7[4] === 2)
    || (column7[2] === 2 && column7[3] === 2 && column7[4] === 2 && column7[5] === 2)
    || (column7[3] === 2 && column7[4] === 12&& column7[5] === 2 && column7[6] === 2)

    // Row 1 (top row)
    || (gameGrid.column1.gameSlotStatus[1] === 2 && gameGrid.column2.gameSlotStatus[1] === 2 && gameGrid.column3.gameSlotStatus[1] === 2 && gameGrid.column4.gameSlotStatus[1] === 2)
    || (gameGrid.column2.gameSlotStatus[1] === 2 && gameGrid.column3.gameSlotStatus[1] === 2 && gameGrid.column4.gameSlotStatus[1] === 2 && gameGrid.column5.gameSlotStatus[1] === 2)
    || (gameGrid.column3.gameSlotStatus[1] === 2 && gameGrid.column4.gameSlotStatus[1] === 2 && gameGrid.column5.gameSlotStatus[1] === 2 && gameGrid.column6.gameSlotStatus[1] === 2)
    || (gameGrid.column4.gameSlotStatus[1] === 2 && gameGrid.column5.gameSlotStatus[1] === 2 && gameGrid.column6.gameSlotStatus[1] === 2 && gameGrid.column7.gameSlotStatus[1] === 2)
    
    // Row 2 
    || (gameGrid.column1.gameSlotStatus[2] === 2 && gameGrid.column2.gameSlotStatus[2] === 2 && gameGrid.column3.gameSlotStatus[2] === 2 && gameGrid.column4.gameSlotStatus[2] === 2)
    || (gameGrid.column2.gameSlotStatus[2] === 2 && gameGrid.column3.gameSlotStatus[2] === 2 && gameGrid.column4.gameSlotStatus[2] === 2 && gameGrid.column5.gameSlotStatus[2] === 2)
    || (gameGrid.column3.gameSlotStatus[2] === 2 && gameGrid.column4.gameSlotStatus[2] === 2 && gameGrid.column5.gameSlotStatus[2] === 2 && gameGrid.column6.gameSlotStatus[2] === 2)
    || (gameGrid.column4.gameSlotStatus[2] === 2 && gameGrid.column5.gameSlotStatus[2] === 2 && gameGrid.column6.gameSlotStatus[2] === 2 && gameGrid.column7.gameSlotStatus[2] === 2)
    
    // Row 3
    || (gameGrid.column1.gameSlotStatus[3] === 2 && gameGrid.column2.gameSlotStatus[3] === 2 && gameGrid.column3.gameSlotStatus[3] === 2 && gameGrid.column4.gameSlotStatus[3] === 2)
    || (gameGrid.column2.gameSlotStatus[3] === 2 && gameGrid.column3.gameSlotStatus[3] === 2 && gameGrid.column4.gameSlotStatus[3] === 2 && gameGrid.column5.gameSlotStatus[3] === 2)
    || (gameGrid.column3.gameSlotStatus[3] === 2 && gameGrid.column4.gameSlotStatus[3] === 2 && gameGrid.column5.gameSlotStatus[3] === 2 && gameGrid.column6.gameSlotStatus[3] === 2)
    || (gameGrid.column4.gameSlotStatus[3] === 2 && gameGrid.column5.gameSlotStatus[3] === 2 && gameGrid.column6.gameSlotStatus[3] === 2 && gameGrid.column7.gameSlotStatus[3] === 2)
    
    // Row 4
    || (gameGrid.column1.gameSlotStatus[4] === 2 && gameGrid.column2.gameSlotStatus[4] === 2 && gameGrid.column3.gameSlotStatus[4] === 2 && gameGrid.column4.gameSlotStatus[4] === 2)
    || (gameGrid.column2.gameSlotStatus[4] === 2 && gameGrid.column3.gameSlotStatus[4] === 2 && gameGrid.column4.gameSlotStatus[4] === 2 && gameGrid.column5.gameSlotStatus[4] === 2)
    || (gameGrid.column3.gameSlotStatus[4] === 2 && gameGrid.column4.gameSlotStatus[4] === 2 && gameGrid.column5.gameSlotStatus[4] === 2 && gameGrid.column6.gameSlotStatus[4] === 2)
    || (gameGrid.column4.gameSlotStatus[4] === 2 && gameGrid.column5.gameSlotStatus[4] === 2 && gameGrid.column6.gameSlotStatus[4] === 2 && gameGrid.column7.gameSlotStatus[4] === 2)
    
    // Row 5
    || (gameGrid.column1.gameSlotStatus[5] === 2 && gameGrid.column2.gameSlotStatus[5] === 2 && gameGrid.column3.gameSlotStatus[5] === 2 && gameGrid.column4.gameSlotStatus[5] === 2)
    || (gameGrid.column2.gameSlotStatus[5] === 2 && gameGrid.column3.gameSlotStatus[5] === 2 && gameGrid.column4.gameSlotStatus[5] === 2 && gameGrid.column5.gameSlotStatus[5] === 2)
    || (gameGrid.column3.gameSlotStatus[5] === 2 && gameGrid.column4.gameSlotStatus[5] === 2 && gameGrid.column5.gameSlotStatus[5] === 2 && gameGrid.column6.gameSlotStatus[5] === 2)
    || (gameGrid.column4.gameSlotStatus[5] === 2 && gameGrid.column5.gameSlotStatus[5] === 2 && gameGrid.column6.gameSlotStatus[5] === 2 && gameGrid.column7.gameSlotStatus[5] === 2)
    
    // Row 6
    || (gameGrid.column1.gameSlotStatus[6] === 2 && gameGrid.column2.gameSlotStatus[6] === 2 && gameGrid.column3.gameSlotStatus[6] === 2 && gameGrid.column4.gameSlotStatus[6] === 2)
    || (gameGrid.column2.gameSlotStatus[6] === 2 && gameGrid.column3.gameSlotStatus[6] === 2 && gameGrid.column4.gameSlotStatus[6] === 2 && gameGrid.column5.gameSlotStatus[6] === 2)
    || (gameGrid.column3.gameSlotStatus[6] === 2 && gameGrid.column4.gameSlotStatus[6] === 2 && gameGrid.column5.gameSlotStatus[6] === 2 && gameGrid.column6.gameSlotStatus[6] === 2)
    || (gameGrid.column4.gameSlotStatus[6] === 2 && gameGrid.column5.gameSlotStatus[6] === 2 && gameGrid.column6.gameSlotStatus[6] === 2 && gameGrid.column7.gameSlotStatus[6] === 2)
    
    
    // Diagonals "/"" from left
    || (gameGrid.column1.gameSlotStatus[4] === 2 && gameGrid.column2.gameSlotStatus[3] === 2 && gameGrid.column3.gameSlotStatus[2] === 2 && gameGrid.column4.gameSlotStatus[1] === 2)

    || (gameGrid.column1.gameSlotStatus[5] === 2 && gameGrid.column2.gameSlotStatus[4] === 2 && gameGrid.column3.gameSlotStatus[3] === 2 && gameGrid.column4.gameSlotStatus[2] === 2)
    || (gameGrid.column2.gameSlotStatus[4] === 2 && gameGrid.column3.gameSlotStatus[3] === 2 && gameGrid.column4.gameSlotStatus[2] === 2 && gameGrid.column5.gameSlotStatus[1] === 2)
    
    || (gameGrid.column1.gameSlotStatus[6] === 2 && gameGrid.column2.gameSlotStatus[5] === 2 && gameGrid.column3.gameSlotStatus[4] === 2 && gameGrid.column4.gameSlotStatus[3] === 2)
    || (gameGrid.column2.gameSlotStatus[5] === 2 && gameGrid.column3.gameSlotStatus[4] === 2 && gameGrid.column4.gameSlotStatus[3] === 2 && gameGrid.column5.gameSlotStatus[2] === 2)
    || (gameGrid.column3.gameSlotStatus[4] === 2 && gameGrid.column4.gameSlotStatus[3] === 2 && gameGrid.column5.gameSlotStatus[2] === 2 && gameGrid.column6.gameSlotStatus[1] === 2)
    
    || (gameGrid.column2.gameSlotStatus[6] === 2 && gameGrid.column3.gameSlotStatus[5] === 2 && gameGrid.column4.gameSlotStatus[4] === 2 && gameGrid.column5.gameSlotStatus[3] === 2)
    || (gameGrid.column3.gameSlotStatus[5] === 2 && gameGrid.column4.gameSlotStatus[4] === 2 && gameGrid.column5.gameSlotStatus[3] === 2 && gameGrid.column6.gameSlotStatus[2] === 2)
    || (gameGrid.column4.gameSlotStatus[4] === 2 && gameGrid.column5.gameSlotStatus[3] === 2 && gameGrid.column6.gameSlotStatus[2] === 2 && gameGrid.column7.gameSlotStatus[1] === 2)
    
    || (gameGrid.column3.gameSlotStatus[6] === 2 && gameGrid.column4.gameSlotStatus[5] === 2 && gameGrid.column5.gameSlotStatus[4] === 2 && gameGrid.column6.gameSlotStatus[3] === 2)
    || (gameGrid.column4.gameSlotStatus[5] === 2 && gameGrid.column5.gameSlotStatus[4] === 2 && gameGrid.column6.gameSlotStatus[3] === 2 && gameGrid.column7.gameSlotStatus[2] === 2)

    || (gameGrid.column4.gameSlotStatus[6] === 2 && gameGrid.column5.gameSlotStatus[5] === 2 && gameGrid.column6.gameSlotStatus[4] === 2 && gameGrid.column7.gameSlotStatus[3] === 2)


    // Diagonals "\" from left
    || (gameGrid.column1.gameSlotStatus[3] === 2 && gameGrid.column2.gameSlotStatus[4] === 2 && gameGrid.column3.gameSlotStatus[5] === 2 && gameGrid.column4.gameSlotStatus[6] === 2)

    || (gameGrid.column1.gameSlotStatus[2] === 2 && gameGrid.column2.gameSlotStatus[3] === 2 && gameGrid.column3.gameSlotStatus[4] === 2 && gameGrid.column4.gameSlotStatus[5] === 2)
    || (gameGrid.column2.gameSlotStatus[3] === 2 && gameGrid.column3.gameSlotStatus[4] === 2 && gameGrid.column4.gameSlotStatus[5] === 2 && gameGrid.column5.gameSlotStatus[6] === 2)
    
    || (gameGrid.column1.gameSlotStatus[1] === 2 && gameGrid.column2.gameSlotStatus[2] === 2 && gameGrid.column3.gameSlotStatus[3] === 2 && gameGrid.column4.gameSlotStatus[4] === 2)
    || (gameGrid.column2.gameSlotStatus[2] === 2 && gameGrid.column3.gameSlotStatus[3] === 2 && gameGrid.column4.gameSlotStatus[4] === 2 && gameGrid.column5.gameSlotStatus[5] === 2)
    || (gameGrid.column3.gameSlotStatus[3] === 2 && gameGrid.column4.gameSlotStatus[4] === 2 && gameGrid.column5.gameSlotStatus[5] === 2 && gameGrid.column6.gameSlotStatus[6] === 2)
    
    || (gameGrid.column2.gameSlotStatus[1] === 2 && gameGrid.column3.gameSlotStatus[2] === 2 && gameGrid.column4.gameSlotStatus[3] === 2 && gameGrid.column5.gameSlotStatus[4] === 2)
    || (gameGrid.column3.gameSlotStatus[2] === 2 && gameGrid.column4.gameSlotStatus[3] === 2 && gameGrid.column5.gameSlotStatus[4] === 2 && gameGrid.column6.gameSlotStatus[5] === 2)
    || (gameGrid.column4.gameSlotStatus[3] === 1 && gameGrid.column5.gameSlotStatus[4] === 2 && gameGrid.column6.gameSlotStatus[5] === 2 && gameGrid.column7.gameSlotStatus[6] === 2)
    
    || (gameGrid.column3.gameSlotStatus[1] === 2 && gameGrid.column4.gameSlotStatus[2] === 2 && gameGrid.column5.gameSlotStatus[3] === 2 && gameGrid.column6.gameSlotStatus[4] === 2)
    || (gameGrid.column4.gameSlotStatus[2] === 2 && gameGrid.column5.gameSlotStatus[3] === 2 && gameGrid.column6.gameSlotStatus[4] === 2 && gameGrid.column7.gameSlotStatus[5] === 2)

    || (gameGrid.column4.gameSlotStatus[1] === 2 && gameGrid.column5.gameSlotStatus[2] === 2 && gameGrid.column6.gameSlotStatus[3] === 2 && gameGrid.column7.gameSlotStatus[4] === 2)
  ) 
    
    {
      currentPlayer = 2;
      gameStatusActive = false;
    } 

  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  
