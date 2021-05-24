'use strict'

let state = 'title';
let cnv;
let points = 0;
let w = 600;
let h = 600;

function setup(){
 cnv = createCanvas(w, h);

 textFont('monospace');

}

function draw() {

  switch (state) {
    case 'title':
      title();
      cnv.mouseClicked(titleMouseClicked);
      break;
    case 'level 1':
      level1();
      cnv.mouseClicked(level1MouseClicked);
      break;
    case 'you win':
      youWin();
      cnv.mouseClicked(youWinMouseClicked);
      break;
    default:
      break;
  }
}


function title() {
  background(22, 12, 66);
  textSize(30);
  fill(255, 214, 10);
  text('Shadow Saves The Milky Way!', 60, h/3);

  textSize(35);
  text('click anywhere to start', 60, h/2);
}

function titleMouseClicked() {
    console.log('canvas is clicked on title page');
    state = 'level 1'
  }



function level1() {
  background(22, 12, 66);
  text('click for points', 125, h - 300);
}

function level1MouseClicked() {
  points++;
  console.log('points = ' + points);

  if (points >= 10){
    state = 'you win';
  }
}

function youWin(){
  background(22, 12, 66);
  textSize(100);
  stroke(255);
  text('YOU WIN!', 70, 200);

  textSize(35);
  text('click anywhere to restart', 40, h - 300);
}


function youWinMouseClicked(){
  state = 'level 1';
  points = 0;
}
