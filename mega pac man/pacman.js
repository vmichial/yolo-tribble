/* models */

function Player() {}
Player.prototype.x = 0;
Player.prototype.y = 0;
Player.prototype.width = 30;
Player.prototype.height = 30;
Player.prototype.orientation = "right";

Player.prototype.queue = "";
Player.prototype.queueTimer = 0;

Player.prototype.img = '';
Player.prototype.tag = '';
Player.prototype.alive = true;
Player.prototype.draw = function() {
	ctx.drawImage(this.img, this.x, this.y)
};
Player.prototype.update = function()
{
	if (this.queue != "")
	{
		//left
		if (this.queue == "left" && this.checkWall(-30, 0, GameMap.Tiles) == 1)
			this.orientation = "left";
		//right
		if (this.queue == "right" && this.checkWall(30, 0, GameMap.Tiles) == 1)
			this.orientation = "right";
		//up
		if (this.queue == "up" && this.checkWall(0, -30, GameMap.Tiles) == 1)
			this.orientation = "up";
		//down
		if (this.queue == "down" && this.checkWall(0, 30, GameMap.Tiles) == 1)
			this.orientation = "down";

		this.queueTimer -= 1; 
		if (this.queueTimer <= 0)
			this.queue = "";	
	}
	if (this.orientation == "right")
		this.x += 2
	else if(this.orientation == "left")
		this.x -= 2
	else if(this.orientation == "up")
		this.y -= 2
	else if(this.orientation == "down")
		this.y += 2
}
Player.prototype.wallCollision = function(array) {
	//The hero
	var HeroTop = this.y;
	var HeroBot = this.y + this.height;
	var HeroLef = this.x;
	var HeroRit = this.x + this.width;
	for (var i = 0; i < array.length; i++)
	{
		//Let's use these variables to get all the info about our squares

			//The wall we're on in the for loop
			var WallTop = array[i].posy;
			var WallBot = array[i].posy + array[i].height;
			var WallLef = array[i].posx;
			var WallRit = array[i].posx + array[i].width;
			
			if ((HeroTop >= WallBot || HeroBot <= WallTop || HeroRit <= WallLef || HeroLef >= WallRit) == false)
			{
				//COLLISION
					if (this.orientation == "right")
						this.x -= 2
					else if(this.orientation == "left")
						this.x += 2
					else if(this.orientation == "up")
						this.y += 2
					else if(this.orientation == "down")
						this.y -= 2
			}
	}
}
Player.prototype.checkWall = function(x, y, array) {
	//Let's use these variables to get all the info about our squares
	//The hero
	var HeroTop = this.y + y;
	var HeroBot = this.y + y + this.height;
	var HeroLef = this.x + x;
	var HeroRit = this.x + x + this.width;	
	for (var i = 0; i < array.length; i++)
	{

		//The wall we're on in the for loop
		var WallTop = array[i].posy;
		var WallBot = array[i].posy + array[i].height;
		var WallLef = array[i].posx;
		var WallRit = array[i].posx + array[i].width;
		
		if ((HeroTop >= WallBot || HeroBot <= WallTop || HeroRit <= WallLef || HeroLef >= WallRit) == false)
		{
			return -1;
		}
	}
	
	return 1;
}

function Pacman(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
	this.orientation = "right";
}
Pacman.prototype = Object.create(Player.prototype);
Pacman.prototype.tag = "Pacman";
Pacman.prototype.lives = 3; //just a number I came up with
Pacman.prototype.getPellet = function(array)
{
	//Let's use these variables to get all the info about our squares
	//The hero
	var HeroTop = this.y;
	var HeroBot = this.y + this.height;
	var HeroLef = this.x;
	var HeroRit = this.x + this.width;	
	for (var i = 0; i < array.length; i++)
	{

		//The wall we're on in the for loop
		var WallTop = array[i].posy;
		var WallBot = array[i].posy + array[i].height;
		var WallLef = array[i].posx;
		var WallRit = array[i].posx + array[i].width;
		
		if ((HeroTop >= WallBot || HeroBot <= WallTop || HeroRit <= WallLef || HeroLef >= WallRit) == false)
		{
			array.splice(i, 1);
		}
	}
};

Pacman.prototype.collision = function() {
    this.lives -= 1;
    if(this.lives <= 0) {
	this.alive = false;
    }
};

function Ghost(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
}
Ghost.prototype = Object.create(Player.prototype);
Ghost.prototype.tag = "Ghost";
Ghost.prototype.scared = false;
Ghost.prototype.PacCollision = function(pacman) {
	//Let's use these variables to get all the info about our squares
	//The hero
	//ctx.fillRect(this.posx + sizeConst/4, this.posy + sizeConst/4, this.width/2, this.height/2);
	var HeroTop = this.y + this.height/4;
	var HeroBot = this.y + this.height/2;
	var HeroLef = this.x + this.width/4;
	var HeroRit = this.x + this.width/2;	
	
	//The wall we're on in the for loop
	var WallTop = pacman.y + pacman.height/4;
	var WallBot = pacman.y + pacman.height/2;
	var WallLef = pacman.x + pacman.width/4;
	var WallRit = pacman.x + pacman.width/2;
		
	if ((HeroTop >= WallBot || HeroBot <= WallTop || HeroRit <= WallLef || HeroLef >= WallRit) == false)
	{
		return 1;
	}
	
	return -1;
};

/* controller logic */
//var canvas = document.getElementById('GameCanvas');
//var context = canvas.getContext('2d');
