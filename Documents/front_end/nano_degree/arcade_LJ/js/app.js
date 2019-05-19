// Enemies our player must avoid
var Enemy = function enemy(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = (Math.random() + 1) * 150;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.speed * dt + this.x;

    if(this.x > 505) {
        this.x = this.x - 505;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
let Player = function player(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This class requires an update(), render() and
Player.prototype.update = function() {
 
}

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
}

function checkCollisions(){
    //console.log(player.x);
    allEnemies.forEach(function(enemy){
        if(player.y < enemy.y + 30 && player.y + 30 > enemy.y && 
            player.x < enemy.x + 30 && player.x + 30 > enemy.x){
            player.reset();
        }
    });
}

// a handleInput() method.
Player.prototype.handleInput = function(key){
    if(this.y > 400){
        //the player cannot be off-screen
        this.reset();
    } else if (this.y <= 30) {
        //when the player reaches the water
        this.reset();
        alert("Congrats, you win!");
    } else {
        //the player cannot be off-screen
        if(key == "left" && this.x > 0){
            this.x = this.x - 100;
        }
        if(key == "right"&& this.x < 400){
            this.x = this.x + 100;
        }
        if(key == "up"){
            this.y = this.y - 90;
        }
        if(key == "down" && this.y < 400){
            this.y = this.y + 90;
        }
    }
}



// Now instantiate your objects.
let enemyA = new Enemy(0, 65);
let enemyB = new Enemy(0, 145);
let enemyC = new Enemy(0, 230);


// Place all enemy objects in an array called allEnemies
let allEnemies = [enemyA, enemyB, enemyC];

// Place the player object in a variable called player
let player = new Player(200, 400);

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

(window.logGame = function(){
    console.log(player);
})()

