console.log("JS linked");

/*----- constants -----*/
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
    gameSlotId: {
        1: "gs1-1",
        2: "gs1-2",
        3: "gs1-3",
        4: "gs1-4",
        5: "gs1-5",
        6: "gs1-6"
    }
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
    gameSlotId: {
        1: "gs2-1",
        2: "gs2-2",
        3: "gs2-3",
        4: "gs2-4",
        5: "gs2-5",
        6: "gs2-6"
    }
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
    gameSlotId: {
        1: "gs3-1",
        2: "gs3-2",
        3: "gs3-3",
        4: "gs3-4",
        5: "gs3-5",
        6: "gs3-6"
    }
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
    gameSlotId: {
        1: "gs4-1",
        2: "gs4-2",
        3: "gs4-3",
        4: "gs4-4",
        5: "gs4-5",
        6: "gs4-6"
    }
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
    gameSlotId: {
        1: "gs5-1",
        2: "gs5-2",
        3: "gs5-3",
        4: "gs5-4",
        5: "gs5-5",
        6: "gs5-6"
    }
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
    gameSlotId: {
        1: "gs6-1",
        2: "gs6-2",
        3: "gs6-3",
        4: "gs6-4",
        5: "gs6-5",
        6: "gs6-6"
    }
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
    gameSlotId: {
        1: "gs7-1",
        2: "gs7-2",
        3: "gs7-3",
        4: "gs7-4",
        5: "gs7-5",
        6: "gs7-6"
    }
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

// game slot selectors
let gameSlot1_1El = document.querySelector("#gs1-1");
let gameSlot1_2El = document.querySelector("#gs1-2");
let gameSlot1_3El = document.querySelector("#gs1-3");
let gameSlot1_4El = document.querySelector("#gs1-4");
let gameSlot1_5El = document.querySelector("#gs1-5");
let gameSlot1_6El = document.querySelector("#gs1-6");

let gameSlot2_2El = document.querySelector("#gs2-2");
let gameSlot2_3El = document.querySelector("#gs2-3");
let gameSlot2_1El = document.querySelector("#gs2-1");
let gameSlot2_4El = document.querySelector("#gs2-4");
let gameSlot2_5El = document.querySelector("#gs2-5");
let gameSlot2_6El = document.querySelector("#gs2-6");

let gameSlot3_1El = document.querySelector("#gs3-1");
let gameSlot3_2El = document.querySelector("#gs3-2");
let gameSlot3_3El = document.querySelector("#gs3-3");
let gameSlot3_4El = document.querySelector("#gs3-4");
let gameSlot3_5El = document.querySelector("#gs3-5");
let gameSlot3_6El = document.querySelector("#gs3-6");

let gameSlot4_1El = document.querySelector("#gs4-1");
let gameSlot4_2El = document.querySelector("#gs4-2");
let gameSlot4_3El = document.querySelector("#gs4-3");
let gameSlot4_4El = document.querySelector("#gs4-4");
let gameSlot4_5El = document.querySelector("#gs4-5");
let gameSlot4_6El = document.querySelector("#gs4-6");

let gameSlot5_1El = document.querySelector("#gs5-1");
let gameSlot5_2El = document.querySelector("#gs5-2");
let gameSlot5_3El = document.querySelector("#gs5-3");
let gameSlot5_4El = document.querySelector("#gs5-4");
let gameSlot5_5El = document.querySelector("#gs5-5");
let gameSlot5_6El = document.querySelector("#gs5-6");

let gameSlot6_1El = document.querySelector("#gs6-1");
let gameSlot6_2El = document.querySelector("#gs6-2");
let gameSlot6_3El = document.querySelector("#gs6-3");
let gameSlot6_4El = document.querySelector("#gs6-4");
let gameSlot6_5El = document.querySelector("#gs6-5");
let gameSlot6_6El = document.querySelector("#gs6-6");

let gameSlot7_1El = document.querySelector("#gs7-1");
let gameSlot7_2El = document.querySelector("#gs7-2");
let gameSlot7_3El = document.querySelector("#gs7-3");
let gameSlot7_4El = document.querySelector("#gs7-4");
let gameSlot7_5El = document.querySelector("#gs7-5");
let gameSlot7_6El = document.querySelector("#gs7-6");

/*----- event listeners -----*/
column1El.addEventListener("click", updateStateVariables);
column3El.addEventListener("click", testEventLlistener);
column4El.addEventListener("click", testEventLlistener);
column5El.addEventListener("click", testEventLlistener);
column6El.addEventListener("click", testEventLlistener);
column7El.addEventListener("click", testEventLlistener);
column2El.addEventListener("click", testEventLlistener);

/*----- functions -----*/

// FUNCTION 1: INITIALIZE
initialize();
function initialize() {
  currentPlayer = 1;
  piecesInARow = 0;
  gameStatusActive = true;


  render();
}




// FUNCTION 2: RENDER
function render() {
  console.log("render is working");
  // function to place the piece. 


}













function testEventLlistener() {
  console.log("event listener working");
}



// FUNCTION 3: CHANGE GAME SLOT STATUS
function updateStateVariables(e) {
  let column = getColumn(e);
  let emptyGameSlotIndex = getEmptyGameSlotIndex(column);

  // update game slot status
  gameGrid[column].gameSlotStatus[emptyGameSlotIndex] = 1;

  // update colum height
  gameGrid[column].height += 1;
  console.log(emptyGameSlotIndex);

  let changedGameSlot = 
  // update changedGameSlot



  render();
}

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
