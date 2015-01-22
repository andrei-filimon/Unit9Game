// We are creating the canvas first
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
//setting the canvas sizes
canvas.width = 900;
canvas.height = 450;
document.body.appendChild(canvas);
// Background image
var backgroundReady = false;
var backgroundImage = new Image();
    backgroundImage.onload = function () {
	backgroundReady = true;
};
backgroundImage.src = "png/background.png";

// player image
var playerReady = false;
var playerImage = new Image();
    playerImage.onload = function () {
	playerReady = true;
};
playerImage.src = "png/player.png";

// enemy image
var enemyReady = false;
var enemyImage = new Image();
    enemyImage.onload = function () {
	enemyReady = true;
};
enemyImage.src = "png/enemy.png";

//second enemy
var enemy1Ready = false;
var enemy1Image = new Image();
enemy1Image.onload = function () {
    enemy1Ready = true;
}
enemy1Image.src = "png/enemy.png";

//third enemy
var enemy2Ready = false;
var enemy2Image = new Image();
    enemy2Image.onload = function () {
    enemy2Ready = true;
};
enemy2Image.src = "png/enemy.png";

//bullet image
var bulletReady = false;
var bulletImage = new Image();
    bulletImage.onload = function () {
	bulletReady = true;
};
bulletImage.src = "png/bullet.png";

//parameters
var player = {
	speed: 300
};
var bullet = {
    speedofbull:600
};
//setting the pre configured values of the variables we gonna use
var youwin=0;
var enemy = {};
var enemy1 ={};
var enemy2 ={};
var bulletcount = 10;
//main function
var past = Date.now();

//obstacle position and height
var obstacle1 = {x:100,y:260,w:170,h:80,type:"obstacle"};
var obstacle2 = {x:600,y:250,w:150,h:60,type:"obstacle"};
var obstacle3 = {x:370,y:120,w:80,h:70,type:"obstacle"};
//the obstacles are being stored to an array so later we can access them through a loop
var obstacles=[obstacle1,obstacle2,obstacle3];

// Handle keyboard controls
var keysDown = {};
//we use events for keydown and key up
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


// Bullet constant position acording to the players position
var bulletpos = function() {
	bullet.x = player.x+80;
	bullet.y = player.y+40;
	};
//initial player/enemies parameters when the game starts
var playerpos = function() {
	player.x = 20;
	player.y = 355;
    player.w = 32;
    player.h = 32;

	};
var enemypos = function() {
    enemy.x = 700;
    enemy.y = 180;
};
var enemy1pos = function() {
    enemy1.x = 415;
    enemy1.y = 50;
};
var enemy2pos = function(){
    enemy2.x = 200;
    enemy2.y = 200;
};

//dead enemy function when the bullet reaches the enemy position the baground enemy image will change to a
//sleeping enemy :D
var deadenemy = function() {
    if (
        bullet.x <= (enemy.x + 10)
        && enemy.x <= (bullet.x + 50)
        && bullet.y <= (enemy.y + 70)
        && enemy.y <= (bullet.y + 70)
    ) {
        enemyImage.src = "png/enemydead.png";
        youwin++;
    }

    if (
        bullet.x <= (enemy1.x + 10)
        && enemy1.x <= (bullet.x + 50)
        && bullet.y <= (enemy1.y + 70)
        && enemy1.y <= (bullet.y + 70)
    ) {
        enemy1Image.src = "png/enemydead.png";
        youwin++;
    }

    if (
        bullet.x <= (enemy2.x + 10)
        && enemy2.x <= (bullet.x + 50)
        && bullet.y <= (enemy2.y + 70)
        && enemy2.y <= (bullet.y + 70)
    ) {
        enemy2Image.src = "png/enemydead.png";
        youwin++;
    }

};



// the way objects are updated in this game is by keep rendering the last present position of the object.
//this way is not the most efficient but at least the background image covers up the rest of unwanted objects
var update = function (constant) {
    //call the functions for enemies position
    enemypos();
    enemy1pos();
    enemy2pos();
    //this are the coresponding codes for buttons : 32 - space, 38 - up, 40 - down, 37 - left
    if (32 in keysDown) {                                                    //space
        //while the button is down the x axis of bullet will change according to the constant and bulletspeed
        bullet.x += bullet.speedofbull * constant;
        for (i=0;i < obstacles.length ;i++ )
        {
            //update the player position if it touches any obstacle
            if (playerTouch(player,obstacles[i]))
            {
                player.y = obstacles[i].y + obstacles[i].h +1;

            }
        }
        bulletcount--;
    }

	if (38 in keysDown) {                                                   //up
        player.y -= player.speed*constant;

		bulletpos();
        for (i=0;i<obstacles.length ;i++ )
        {
            if (playerTouch(player,obstacles[i]))
            {
                player.y = obstacles[i].y + obstacles[i].h +1;
            }
        }

	}

	if (40 in keysDown) {                                                     // down

		player.y += player.speed * constant;
		bulletpos();

        for (var i=0;i<obstacles.length ;i++ )
        {
            if (playerTouch(player,obstacles[i]))
            {
                player.y = obstacles[i].y - player.h -1;
            }
        }


	}
	if (37 in keysDown) {                                                   // left
		player.x -= player.speed * constant;
		bulletpos();

        for (i=0;i<obstacles.length ;i++ )
        {
            if (playerTouch(player,obstacles[i]))
            {
                player.x = obstacles[i].x + obstacles[i].w +1;
            }
        }

	}
	if (39 in keysDown) {                                                   // right
		player.x += player.speed * constant;
		bulletpos();

        for (i=0;i<obstacles.length ;i++ )
        {
            if (playerTouch(player,obstacles[i]))
            {
                player.x = obstacles[i].x - player.w -1;
            }
        }

	}
    // call the function when the bullet reaches the enemy
    deadenemy();
};



//update the players position function when it touches the obstacles
var playerTouch = function(temp1,temp2) {
    if(
        temp1.x <= (temp2.x + temp2.w)
        && temp2.x <= (temp1.x + temp1.w)
        && temp1.y <= (temp2.y + temp2.h)
        && temp2.y <= (temp1.y + temp1.h) )
    {
        return true;
    }
    else {
        return false

    }
};

// Function to draw everyfhing ctx
var render = function () {

    if (backgroundReady) {
        ctx.drawImage(backgroundImage, 0, 0);
    }
    if (playerReady) {
        ctx.drawImage(playerImage, player.x, player.y);
    }
    if (enemyReady) {
        ctx.drawImage(enemyImage, enemy.x, enemy.y);
    }
    if (enemy1Ready) {
        ctx.drawImage(enemy1Image, enemy1.x, enemy1.y);
    }
    if (enemy2Ready) {
        ctx.drawImage(enemy2Image, enemy2.x, enemy2.y);
    }
    if (bulletReady) {
        ctx.drawImage(bulletImage,bullet.x,bullet.y);
    }
    // bullets remaining disply formatting
    ctx.fillStyle = "rgb(100, 250, 100)";
    ctx.font = "30px Times new roman";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    if (youwin!=3) {
        ctx.fillText("Bullets remaining: " + bulletcount+ "  " +youwin, 550, 20);
    }
    else if (youwin = 3)
        ctx.fillText("You won! ", 550, 20);
};
//set window for multiple platforms(mozilla,ms,ie
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var main = function () {
    //take the time value and uppdates the objects everey perios of time
    var present = Date.now();
    var time = present - past;
    //passing data : position, size from update so later will be rendered
    //divided by 1500 so it will not move so fast on the screen
    update(time/1500);
    render();
    past = present;
    requestAnimationFrame(main);
    ctx.fillText("date" + present + time, 30, 20);
};
playerpos();
main();
