let sequence = [];
let playerSequence = [];
let glow; //flsh brightness
let turn; //keep track of turns
let good; // wheater player doing good or not
let compTurn;
let intervalId;
let noise = true;
let win;

const changeCounter = document.querySelector("#scorebg");

const flash = document.querySelector("#one");
const batMan = document.querySelector("#two");
const superMan = document.querySelector("#three");
const wonderWoman = document.querySelector("#four");

const startButton = document.querySelector(".start");

startButton.addEventListener("click", (event) => {
  darkHero();
  clearInterval(intervalId);
  play();
});

changeCounter.innerHTML = 0; 
function play() {
  win = false;
  sequence = [];
  playerSequence = [];
  glow = 0;
  intervalId = 0;
  turn = 1;
  changeCounter.innerHTML = 1;
  good = true;
  for (var i = 0; i < 10; i++) {
    // round
    sequence.push(Math.floor(Math.random() * 4) + 1);
  }
  // console.log(sequence);
  compTurn = true;
  intervalId = setInterval(gameTurn, 800); //run function after 800 ms
}

function gameTurn() {
  if (glow == turn) {
    clearInterval(intervalId);
    compTurn = false;
    darkHero();
  }
  if (compTurn) {
    darkHero();
    setTimeout(() => {
      if (sequence[glow] == 1) one();
      if (sequence[glow] == 2) two();
      if (sequence[glow] == 3) three();
      if (sequence[glow] == 4) four();
      glow++;
    }, 200);
  }
}
function one() {
  if (noise) {
    let audio = document.getElementById("beep1");
    audio.play();
  }
  noise = true;

  flash.style.filter = "brightness(100%)";
}

function two() {
  if (noise) {
    let audio = document.getElementById("beep2");
    audio.play();
  }
  noise = true;
  batMan.style.filter = "brightness(100%)";
}
function three() {
  if (noise) {
    let audio = document.getElementById("beep3");
    audio.play();
  }
  noise = true;
  superMan.style.filter = "brightness(100%)";
}

function four() {
  if (noise) {
    let audio = document.getElementById("beep4");
    audio.play();
  }
  noise = true;
  wonderWoman.style.filter = "brightness(100%)";
}
function gameOver(){
  if (noise ) {
    let audio = document.getElementById("endGamesound");
    audio.play();
  }
  noise = true 
    
}

function darkHero() {
  flash.style.filter = "brightness(10%)";
  batMan.style.filter = "brightness(10%)";
  superMan.style.filter = "brightness(10%)";
  wonderWoman.style.filter = "brightness(10%)";
}

function glowSuperHero() {
  flash.style.filter = "brightness(100%)";
  batMan.style.filter = "brightness(100%)";
  superMan.style.filter = "brightness(100%)";
  wonderWoman.style.filter = "brightness(100%)";
}

flash.addEventListener("click", (event) => {
  playerSequence.push(1);
  check();
  one();
  if (!win) {
    setTimeout(() => {
      darkHero();
    }, 200);
  }
});
batMan.addEventListener("click", (event) => {
  playerSequence.push(2);
  check();
  two();
  if (!win) {
    setTimeout(() => {
      darkHero();
    }, 300);
  }
});
superMan.addEventListener("click", (event) => {
  playerSequence.push(3);
  check();
  three();
  if (!win) {
    setTimeout(() => {
      darkHero();
    }, 300);
  }
});
wonderWoman.addEventListener("click", (event) => {
  playerSequence.push(4);
  check();
  four();
  if (!win) {
    setTimeout(() => {
      darkHero();
    }, 300);
  }
});

function check() {
  if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) good = false;
  if (playerSequence.length == 10 && good == true) {
    winGame();
  }
  if (good == false) { //if player is wrong
    glowSuperHero();
    changeCounter.innerHTML = " DARKSIDE WIN!";
    gameOver();
    setTimeout(() => {
      changeCounter.innerHTML = turn;
      darkHero(); 
      
    }, 800);

    noise = false
   
  }

  if (turn == playerSequence.length && good && !win) {
    turn++;
    playerSequence = [];
    compTurn = true;
    glow = 0;
    darkHero.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }
}

function winGame() {
  glowSuperHero();
  changeCounter.innerHTML = "HEROES WIN!";
  win = true;
  intervalId = setInterval(reset, 1800);
 
}

function reset(){
  changeCounter.innerHTML = 0; 
}