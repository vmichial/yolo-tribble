
var canvas = document.getElementById("GameScreen");
var ctx = canvas.getContext("2d");

var pellet_hdl = new Image()
pellet_hdl.src = "pellet.png"

var pac_hdl = new Image()
pac_hdl.src = "capman.png"

var rgho_hdl = new Image()
rgho_hdl.src = "RedGhost.png"
var bgho_hdl = new Image()
bgho_hdl.src = "BlueGhost.png"
var ogho_hdl = new Image()
ogho_hdl.src = "OrangeGhost.png"
var pgho_hdl = new Image()
pgho_hdl.src = "PinkGhost.png"

var sizeConst = 30

setInterval(Game, 1000/60);

function Tile(x, y)
{
	this.posx = x;
	this.posy = y;
	this.width = sizeConst;
	this.height = sizeConst;
	
	this.draw = function()
	{
		ctx.fillStyle = "#0000ff";
		ctx.fillRect(this.posx, this.posy, this.width, this.height);
	};
}

function Pellet(x, y)
{
	this.posx = x;
	this.posy = y;
	this.width = sizeConst;
	this.height = sizeConst;
	
	this.draw = function()
	{
		//ctx.fillStyle = "#00ffff";
		//ctx.fillRect(this.posx + sizeConst/4, this.posy + sizeConst/4, this.width/2, this.height/2);
		ctx.drawImage(pellet_hdl, this.posx, this.posy)
	};
}

function Map()
{
	this.Tiles = new Array();
	this.Pellets = new Array();
	
	this.addTile = function(tile)
	{
		this.Tiles[this.Tiles.length] = tile
	};
	
	this.addPellet = function(pellet)
	{
		this.Pellets[this.Pellets.length] = pellet
	};
	
	this.makeMap = function(array)
	{
		var xplace = sizeConst;
		var yplace = sizeConst;
		
		for (var i = 0; i < array.length; i++)
		{
			var data = array[i];
			for (var j = 0; j < data.length; j++)
			{
				var t = data[j];
				if (t == 'b')
				{
					this.addTile(new Tile(xplace, yplace));
				}
				if (t == ' ')
				{
					this.addPellet(new Pellet(xplace, yplace));
				}
				
				xplace += sizeConst;
			}
			
			xplace = sizeConst;
			yplace += sizeConst;
		}
	};
	
	this.DrawMap = function()
	{
		for (var i = 0; i < this.Tiles.length; i++)
			this.Tiles[i].draw();
		for (var i = 0; i < this.Pellets.length; i++)
			this.Pellets[i].draw();
		
	};

}

GameMap = new Map()

function PoppulateMap()
{
	GameMap.makeMap(BaseMap);
}
PoppulateMap();

pac = new Pacman(sizeConst * 2, sizeConst * 2, pac_hdl)
document.addEventListener("keydown", buttons, false);
//Button code!
function buttons(e) {
	//console.log("Hi!");
	var key = e.keyCode;
	//left
	if (key == 37)
	{
		if (pac.checkWall(-30, 0, GameMap.Tiles) == 1)
			pac.orientation = "left";
		else
		{
			pac.queue = "left";
			pac.queueTimer = 30;
		}
	}
	//right
	if (key == 39)
	{	
		if (pac.checkWall(30, 0, GameMap.Tiles) == 1)
			pac.orientation = "right";
		else
		{
			pac.queue = "right";
			pac.queueTimer = 30;
		}
	}
	//up
	if (key == 38)
	{
		if (pac.checkWall(0, -30, GameMap.Tiles) == 1)
			pac.orientation = "up";
		else
		{
			pac.queue = "up";
			pac.queueTimer = 30;
		}
	}
	//down
	if (key == 40)
	{
		if (pac.checkWall(0, 30, GameMap.Tiles) == 1)
			pac.orientation = "down";
		else
		{
			pac.queue = "down";
			pac.queueTimer = 30;
		}
	}
}

Ghosts = new Array()

Ghosts[1] = new Ghost(sizeConst * 4, sizeConst * 11, rgho_hdl)
document.addEventListener("keydown", Red_buttons, false);
//Button code!
function Red_buttons(e) {
	//console.log("Hi!");
	var key = e.keyCode;
		//left
	if (key == 65)
	{
		if (Ghosts[1].checkWall(-30, 0, GameMap.Tiles) == 1)
			Ghosts[1].orientation = "left";
		else
		{
			Ghosts[1].queue = "left";
			Ghosts[1].queueTimer = 30;
		}
	}
	//right
	if (key == 68)
	{	
		if (Ghosts[1].checkWall(30, 0, GameMap.Tiles) == 1)
			Ghosts[1].orientation = "right";
		else
		{
			Ghosts[1].queue = "right";
			Ghosts[1].queueTimer = 30;
		}
	}
	//up
	if (key == 87)
	{
		if (Ghosts[1].checkWall(0, -30, GameMap.Tiles) == 1)
			Ghosts[1].orientation = "up";
		else
		{
			Ghosts[1].queue = "up";
			Ghosts[1].queueTimer = 30;
		}
	}
	//down
	if (key == 83)
	{
		if (Ghosts[1].checkWall(0, 30, GameMap.Tiles) == 1)
			Ghosts[1].orientation = "down";
		else
		{
			Ghosts[1].queue = "down";
			Ghosts[1].queueTimer = 30;
		}
	}
}
Ghosts[2] = new Ghost(sizeConst * 4, sizeConst * 15, bgho_hdl)
Ghosts[3] = new Ghost(sizeConst * 4, sizeConst * 19, ogho_hdl)
Ghosts[4] = new Ghost(sizeConst * 4, sizeConst * 23, pgho_hdl)

function Game()
{
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	pac.update();
	for (var i = 1; i <= 4; i++)
		Ghosts[i].update();
	
	pac.wallCollision(GameMap.Tiles);
	pac.getPellet(GameMap.Pellets);
	
	for (var i = 1; i <= 4; i++)
		Ghosts[i].wallCollision(GameMap.Tiles);
		
	for (var i = 1; i <= 4; i++)
	{
		if (Ghosts[i].PacCollision(pac) == 1)
		{
			alert("GAME OVER");
		}
	}
	
	GameMap.DrawMap();
	pac.draw();
	
	for (var i = 1; i <= 4; i++)
		Ghosts[i].draw();
		
	//levelMap.drawMap(_globalDrawOffsetX, _globalDrawOffsetY);

}