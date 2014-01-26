var effects = new Array();

function Pawa(parent) {
	this.mother = parent;
	this.skin = new Image();
	this.draw = function(ctx) {}
	this.effect;
}

function Effect(parent) {
	this.mother = parent;
	this.particle = new Image();
	this.draw = function(ctx) {}
	this.expired = false;
	this.lifeSpan;
	this.age = 0;
	this.update = function() {
		this.age++;
		if (this.age >= this.lifeSpan) {
			this.expired = true;
		}
	}
}

function Eat(parent) {
	this.__proto__ = new Pawa(parent);
	this.skin.src = "capman.png";
	this.draw = function(ctx) {
		ctx.drawImage(this.skin, this.mother.x, this.mother.y);
	}
}

function Swift(parent) {
	this.__proto__ = new Pawa(parent);
	this.skin.src = "capman.png";
	effects.push(new Whoosh(this, this.mother.x, this.mother.y));
	this.draw = function(ctx) {
		ctx.drawImage(this.skin, this.mother.x, this.mother.y);
		this.effect.draw(ctx);
	}
}

function Whoosh(parent, x, y) {
	this.__proto__ = new Effect(parent);
	this.particle.src = "moveLines.png";
	this.lifeSpan = 15;
	this.draw = function(ctx) {
		ctx.drawImage(this.particle, x, y);
	}
}

