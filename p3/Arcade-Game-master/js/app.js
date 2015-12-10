var girl = 'images/char-horn-girl.png';
// The Enemy
var Enemy = function(startX, startY, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = startX;
  this.y = startY;
  this.speed = speed;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + this.speed * dt;
  if (this.x > 500) {
    this.x = -100;
    this.randomSpeed();
  }
  var enemyXleftMax = this.x - 70;
  var enemyXRightMax = this.x + 70;
  var enemyYTopMax = this.y - 60;
  var enemyYBottomMax = this.y + 60;
  if (player.x > enemyXleftMax && player.x < enemyXRightMax && player.y > enemyYTopMax && player.y < enemyYBottomMax) {
    // my alert
	alert("You Lose! Muahahahahahahahah! Start Over!");
    player.resetPlayer();
  }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.randomSpeed = function() {
  var someSpeed = Math.floor(Math.random() * 4 + 1);
  this.speed = 60 * someSpeed;
};
// Player Code //
// 
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//The Player
var startX = 200;
var startY = 400;
var Player = function() {
  this.character = 'images/char-boy.png';
  this.x = startX;
  this.y = startY;
  this.borderCheck = {
    leftWall: false,
    rightWall: false,
    bottomWall: true
  };
};
Player.prototype.changeCharacter = function Switch() {
  var Select = prompt("Pick Your Character.");
  if (Select === girl) {
    Player.character = 'images/char-horn.girl.png';
  } else {
    Player.character = 'images/char-boy.png';
  }
};
Player.prototype.update = function() {

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.character), this.x, this.y);
};
Player.prototype.handleInput = function(keyInput) {
  var moveLeftRight = 100;
  var moveUpDown = 90;
  this.checkPosition();
  if (keyInput === "left") {
    if (this.borderCheck.leftWall) {
      return null;
    }
    this.x -= moveLeftRight;
  } else if (keyInput === "right") {
    if (this.borderCheck.rightWall) {
      return null;
    }
    this.x += moveLeftRight;
  } else if (keyInput === "up") {
    if (this.y === 40) {
	  // my alert
      alert("You Won!...But Can You Do It Again.........?");
      this.resetPlayer();
      return null;
    }
    this.y -= moveUpDown;
  } else if (keyInput === "down") {
    if (this.borderCheck.bottomWall) {
      return null;
    }
    this.y += moveUpDown;
  } else {
    return null;
  }
};
Player.prototype.checkPosition = function() {
  if (this.x === 0) {
    this.HorizontalCheck(true, false);
  } else if (this.x === 400) {
    this.HorizontalCheck(false, true);
  } else {
    this.HorizontalCheck(false, false);
  }
  if (this.y === 400) {
    this.borderCheck.bottomWall = true;
  } else {
    this.borderCheck.bottomWall = false;
  }
};
Player.prototype.resetCheckPosition = function() {
  this.HorizontalCheck(false, false);
  this.borderCheck.bottomWall = true;
};
Player.prototype.HorizontalCheck = function(leftWallState, rightWallState) {
  this.borderCheck.leftWall = leftWallState;
  this.borderCheck.rightWall = rightWallState;
};
Player.prototype.resetPlayer = function() {
  this.x = startX;
  this.y = startY;
  this.checkPosition();
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 0; i < 4; i++) {
  var aSpeed = Math.floor(Math.random() * 4 + 1) * 60;
  allEnemies.push(new Enemy(-80, 60 + 80 * i, aSpeed));

}
// Place the player object in a variable called player
var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});