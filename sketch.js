'use strict'

let state = 'title';
let cnv;
let points = 1;
let lives = 3;
let w = 600;
let h = 600;
let player = 1;
let coins = [];
let enemies = [];
let coinImg;
let playerImg;
let enemyImg;
let bgImg;


function preload(){

  bgImg = loadImage('assets/gamebg.png');
  playerImg = loadImage('assets/space kitty.png');
  coinImg = loadImage('assets/enemyET.png');
  enemyImg = loadImage('assets/meteor.png');

}

function setup(){
 cnv = createCanvas(w, h);

 textFont('monospace');

 player = new Player();

 coins.push(new Coin());
 enemies.push(new Enemy());

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
    case 'game over':
        gameOver();
        cnv.mouseClicked(gameOverMouseClicked);
        break;
    default:
      break;
  }
}

function keyPressed(){
  if (keyCode == LEFT_ARROW){
    player.direction = 'left'
  } else if (keyCode == RIGHT_ARROW){
    player.direction = 'right'
  } else if (keyCode == UP_ARROW){
    player.direction = 'up'
  } else if (keyCode == DOWN_ARROW){
    player.direction = 'down'
  } else if (key = ' '){
    player.direction = 'still';
  }
}

function keyReleased(){

  let numberKeysPressed = 0;

if (keyIsDown (LEFT_ARROW)){
  numberKeysPressed++;
}

if (keyIsDown (RIGHT_ARROW)){
  numberKeysPressed++;
}

if (keyIsDown (DOWN_ARROW)){
  numberKeysPressed++;
}

if (keyIsDown (UP_ARROW)){
  numberKeysPressed++;
}

if (numberKeysPressed == 0){
player.direction = 'still'

}
}

function title() {
  background(22, 12, 66);
  textSize(30);
  fill(255, 214, 10);
  text('🌌Shadow Saves The Milky Way🌌', 40, h/4);

  textSize(20);
  text('👽use arrow keys to collide with enemy aliens🛸', 22, h/2);

  textSize(20);
  text('☄️watch out for meteors!☄️', 150, 355);

  textSize(35);
  text('click anywhere to start', 60, 500);
}

function titleMouseClicked() {
    console.log('canvas is clicked on title page');
    state = 'level 1'
  }

function level1() {
  background(22, 12, 66);
  //text('click for points', 125, h - 300);

  if (random(1) <= 0.04){
    coins.push(new Coin());
  }

  if (random(1) <= 0.06){
    enemies.push(new Enemy());
  }

  player.display();
  player.move();

//iterating through coins array to display/move
  for (let i = 0; i < coins.length; i++) {
    coins[i].display();
    coins[i].move();
  }

  for (let i = 0; i < enemies.length; i++) {
    enemies[i].display();
    enemies[i].move();
  }

// forEach loop
  //coins.forEach(function(coin){
    //coin.display();
    //coin.move();
  //})

  //of loop
  //for (let coin of coins){
    //coin.display();
    //coin.move();
  //}

//check for collision, if collision, increase points by 1 and splice coin out
//iterate backwards
for (let i = coins.length - 1; i >= 0; i--) {
  if (dist(player.x, player.y, coins[i].x, coins[i].y) <= (player.r + coins[i].r) / 2){
    points++;
    coins.splice(i, 1);
  } else if (coins[i].y > h){
    coins.splice(i, 1)
    console.log('coin out of bounds');
    }
  }

for (let i = enemies.length - 1; i >= 0; i--) {
  if (dist(player.x, player.y, enemies[i].x, enemies[i].y) <= (player.r + enemies[i].r) / 2){
    points--;
    enemies.splice(i, 1);
  } else if (enemies[i].y > h){
    enemies.splice(i, 1)
    console.log('enemy out of bounds');
    }
  }


 text(`points: ${points}`, w / 10, h - 30);

 if (points >= 10) {
   state = 'you win';
 } else if (points <= -1){
   state = 'game over';
 }
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
  textSize(70);
  stroke(255);
  text('⭐YOU WIN!⭐', 65, 250);

  textSize(35);
  text('click anywhere to restart', 40, 400);
}


function youWinMouseClicked(){
  state = 'title';
  points = 1;
}

function gameOver(){

  background(22, 12, 66);
  textSize(100);

  if (lives >= 0){
    lives--;
    stroke(255);
    text(`Lives left: ${lives}`, 70, 200);

    textSize(20);
    text('click anywhere to play again', 40, h - 300);
  } else {
    stroke(255);
    text('😾', 250, 200);
    text('Game Over', 30, 300);

    textSize(35);
    text('click anywhere to restart', 40, 400);

  }

}


function gameOverMouseClicked(){
  if (lives >= 0){
    lives--;
  state = 'level1';
} else {
  state = 'title'
}
  points = 1;
  }
