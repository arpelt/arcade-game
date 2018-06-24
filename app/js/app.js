
// gameArea array contains all locations (x,y) which are allowed for the player.
let gameArea = [[2,-15], [102,-15], [202,-15], [302,-15], [402,-15], //water
				[2,70], [102,70], [202,70], [302,70], [402,70],		 //stone
				[2,155], [102,155], [202,155], [302,155], [402,155], //stone
				[2,240], [102,240], [202,240], [302,240], [402,240], //stone
				[2,325], [102,325], [202,325], [302,325], [402,325], //grass
				[2,410], [102,410], [202,410], [302,410], [402,410]];//grass

// This gameAreaTemp array is modified during the game.
// For example if the rock is added to the gameAreaTemp array, the array index is removed from
// gameAreaTemp array and the player can't move to the same position where the rock is located.
let gameAreaTemp = gameArea.slice(0);

// This blockAreaTemp array is used for game block elements like rocks.
// When the rock is added this array is modified (the index is removed).
// So there can be only one rock in one position.
let blockAreaOrig = gameArea.slice(5,20);
let blockAreaTemp = blockAreaOrig.slice(0);


// Draw the enemy on the screen.
// Method randomSpeed randomly generates the enemy speed.
// Update method updates the enemy position on the screen. Every time when the enemy 
// runs off screen the new speed and the starting position (left side off screen position) 
// are generated randomly.
class Enemy {
	constructor (x, y) {
		this.x = x;
		this.y = y;
		this.w = 80; //enemys's width
		this.h = 50; //enemys's height
		this.speed = 0;
		this.sprite = 'images/enemy-bug.png';
		this.randomSpeed();
	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	randomSpeed() {
		this.min = 80;
		this.max = 400;
		this.speed = Math.floor(Math.random() * (this.max - this.min)) + this.min;
		return this.speed;
	}

	update(dt) {
		this.x = this.x + this.speed * dt;
		if (this.x > 500) {
			this.speed = this.randomSpeed();
			let startPosition = Math.floor(Math.random() * Math.floor(25));
			startPosition = -Math.abs((startPosition * 10) + 100);
			this.x = startPosition;
		}
	}
}


// Draw the player on the screen and the game related text information.
// Call gameOver or gameWin functions according the player's lives and score.
// handleInput method receive the player's move (left, up, right, down) when the keyboard
// arrow buttons are pressed.
// checkMove method checks if the player's move is allowed (calculates the next move (x,y) position).
// The player cannot move off screen and not over the rocks. If the player reaches the water, 
// increase the player's score.
// Every time when collision happens between the player and the enemy, the player's lives is reduced.
// When the player die or the player reaches the water, the player's location is reseted.
class Player {
	constructor () {
		this.startX = 202; //player's starting coordinate x
		this.startY = 410; //player's starting coordinate y
		this.x = this.startX;
		this.y = this.startY;
		this.w = 60; //player's width
		this.h = 50; //player's height
		this.water = -15; //water coordinate y
		this.xLeft = -100; //pixels left 
		this.yUp = 85; //pixels up 
		this.xRight = 100; //pixels right 
		this.yDown = -85; //pixels down 
		this.lives = 5;
		this.score = 0;
		this.xTemp = 0;
		this.yTemp = 0;
		this.sprite = 'images/char-boy.png';
	}

	render() {
		ctx.font = "20px Arial";
		ctx.fillText("Score: " + this.score, 5, 40);
		ctx.fillText("Lives: " + this.lives, 410, 40);
		ctx.font = "15px Arial";
		ctx.fillText("Press [Esc] to restart.", 180, 600);
		
		if (this.lives > 0) {
			ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		}
		if (this.lives === 0) {
			ctx.font = "900 30px Arial";
			ctx.fillText("GAME OVER!", 150, 435);
			ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 0, 0);
			gameOver();
		}
		if (this.score === 500) {
			ctx.font = "900 50px Arial";
			ctx.fillText("YOU WON!", 110, 275);
			gameWin();
		}
	}

	handleInput (allowedKeys) {
		if (allowedKeys === "left") {
			this.checkMove(this.xTemp = this.x + this.xLeft, this.yTemp = this.y);
		}
		if (allowedKeys === "up") {
			this.checkMove(this.xTemp = this.x, this.yTemp = this.y - this.yUp);
		}
		if (allowedKeys === "right") {
			this.checkMove(this.xTemp = this.x + this.xRight, this.yTemp = this.y);
		}
		if (allowedKeys === "down") {
			this.checkMove(this.xTemp = this.x, this.yTemp = this.y - this.yDown);
		}
		if (this.y === this.water) {
			this.score += 10;
			gameDifficulty(this.score);
			setTimeout(this.resetLocation.bind(this),50);
		}
	}
	
	checkMove (x, y) {
		let moveXY = [this.xTemp, this.yTemp];
		let movePlayer = gameAreaTemp.find(game => game == moveXY.toString());
		if (movePlayer) {
			this.x = this.xTemp;
			this.y = this.yTemp;
		}
	}

	countLives() {
		this.lives --;
	}

	resetLocation() {
		this.x = this.startX;
		this.y = this.startY;
	}
}


// The rock's coordinates will be selected randomly, based on blockAreaTemp array.
// Adds the rock to the game area, and removes x and y coordinates from 
// the game area (gameAreaTemp array), so the player can't move to this area.
// Removes x and y coordinates from the blockAreaTemp array, so there can't be more 
// than one rock in the same location.
// Draw the rock on the screen.
class Rock {
	constructor () {
	this.blockAreaIndex = 0;
	this.rockXY = {};
	this.w = 90; //rock's width
	this.h = 75; //rock's height
	this.sprite = 'images/Rock.png';
	this.randomRockLocation();
	}
	
	randomRockLocation() {
		this.blockAreaIndex = Math.floor((Math.random() * blockAreaTemp.length));
		if (blockAreaTemp.length > 0) {
			this.rockXY = blockAreaTemp[this.blockAreaIndex];
			this.addRock();
		}
	}

	addRock() {
			let findRockArea = blockAreaTemp.find(rock => rock == this.rockXY.toString());
			let gameAreaIndex = gameAreaTemp.findIndex(game => game == findRockArea.toString());
			if (gameAreaIndex >= 0) {
				gameAreaTemp.splice(gameAreaIndex,1);
				blockAreaTemp.splice(this.blockAreaIndex,1);
		}
	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.rockXY[0], this.rockXY[1], 101, 160);
	}
}


// Checks if there is collision between the player and the enemy.
// If collison happens, call the player's methods countLives and resetLocation.
// The enemy and the player have height, width, x and y properties.
function checkCollisions() {
	allEnemies.forEach(function(enemy) {
		if (enemy.x < player.x + player.w && enemy.x + enemy.w > player.x &&
			enemy.y < player.y + player.h && enemy.h + enemy.y > player.y) {
			player.countLives();
			player.resetLocation();
		}
	});
}


// Adds enemies and rocks to the game area, according the player's score.
function gameDifficulty(score) {
	if (score === 60 || score === 180 || score === 300 || score === 440) {
		allRocks.push(new Rock());
	}
	if (score === 120) {
		allEnemies.push(new Enemy(-100, 64));
	}
	if (score === 210) {
		allEnemies.push(new Enemy(-100, 147));
	}
	if (score === 400) {
		allEnemies.push(new Enemy(-100, 230));
	}
}


// If the player lose the game, the game will stop all enemies.
function gameOver() {
	allEnemies.forEach(function(enemy) {
		enemy.speed = 0;
	});
	document.removeEventListener("keyup", keyUp);
}


// If the player wins, the game area is cleared from the rocks and enemies.
function gameWin() {
	allEnemies.splice(0);
	allRocks.splice(0);
	document.removeEventListener("keyup", keyUp);
}


// This listens for key presses and sends the keys to
// player.handleInput() method.
document.addEventListener("keyup", keyUp);

function keyUp(e) {
    var allowedKeys = {
		37: "left",
		38: "up",
		39: "right",
		40: "down"
    };
	player.handleInput(allowedKeys[e.keyCode]);
}


// When the player press the "ESC" key the game will restart.
document.addEventListener("keyup", esc);

function esc(e) {
	if (e.key === "Escape") {
		allEnemies.splice(0);
		allRocks.splice(0);
		gameAreaTemp = gameArea.slice(0);
		blockAreaTemp = blockAreaOrig.slice(0);
		allEnemies = [new Enemy(-100, 64), new Enemy(-100, 147), new Enemy(-100, 230)];
		allRocks = [];
		player.x = 202;
		player.y = 410;
		player.lives = 5;
		player.score = 0;
		document.addEventListener("keyup", keyUp);
	}
}


// Instantiate objects.
let player = new Player();
let allEnemies = [new Enemy(-100, 64), new Enemy(-100, 147), new Enemy(-100, 230)];
let allRocks = [];
