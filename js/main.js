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
let column1El = document.querySelector('#column-1');
let column2El = document.querySelector('#column-2');
let column3El = document.querySelector('#column-3');
let column4El = document.querySelector('#column-4');
let column5El = document.querySelector('#column-5');
let column6El = document.querySelector('#column-6');
let column7El = document.querySelector('#column-7');

/*----- event listeners -----*/
column1El.addEventListener('click', testEventLlistener);
column2El.addEventListener('click', testEventLlistener);
column3El.addEventListener('click', testEventLlistener);
column4El.addEventListener('click', testEventLlistener);
column5El.addEventListener('click', testEventLlistener);
column6El.addEventListener('click', testEventLlistener);
column7El.addEventListener('click', testEventLlistener);



/*----- functions -----*/

// FUNCTION 1: INITIALIZE
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

// FUNCTION 2: RENDER
function render() {
  console.log("render is working");
}


function testEventLlistener() {
    console.log("event listener working");
}