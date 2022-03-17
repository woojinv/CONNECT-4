console.log("JS linked");

/*----- constants -----*/
/*----- app's state (variables) -----*/

let currentPlayer;
let piecesInARow;
let gameStatusActive;

let column1Height;
let column2Height;
let column3Height;
let column4Height;
let column5Height;
let column6Height;
let column7Height;

/*----- cached element references -----*/
/*----- event listeners -----*/
/*----- functions -----*/

// INITIALIZE
initialize();

function initialize() {
  currentPlayer = 1;
  piecesInARow = 0;
  gameStatusActive = true;

  column1Height = 0;
  column2Height = 0;
  column3Height = 0;
  column4Height = 0;
  column5Height = 0;
  column6Height = 0;
  column7Height = 0;

  render();
}


// RENDER
function render() {
    console.log("render is working")
}