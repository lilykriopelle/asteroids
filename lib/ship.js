(function() {
  var DEFAULTS = {
    color: "black",
    radius: 5,
    vel: [0,0]
  };

  var MAX_SPEED = 15;

  var Ship = window.Asteroids.Ship = function(pos,game) {
    DEFAULTS.pos = pos;
    DEFAULTS.game = game;
    this.lives = window.Asteroids.Game.MAX_LIVES;
    this.dir = Math.random() * 2 * Math.PI;
    this.exhaust = false;
    window.Asteroids.MovingObject.call(this, DEFAULTS);
    this.points = this.generateGeometry();
  };

  window.Asteroids.Util.inherits(Ship, window.Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = game.randomPosition();
    this.velocity = [0,0];
    this.lives--;
    this.points = this.generateGeometry();
  };

  Ship.prototype.generateGeometry = function () {
    p1 = window.Asteroids.Util.rotate([this.pos[0] - 20, this.pos[1] - 7], this.pos, this.dir);
    p2 = window.Asteroids.Util.rotate([this.pos[0] - 20, this.pos[1] + 7], this.pos, this.dir);
    return [this.pos, p1, p2];
  };

  Ship.prototype.power = function (impulse) {
    this.velocity = window.Asteroids.Util.scale([Math.cos(this.dir), Math.sin(this.dir)], 5);
  };

  Ship.prototype.turn = function(dir) {
    this.dir += dir;
  };

  Ship.prototype.fireBullet = function() {
    this.game.bullets.push(new window.Asteroids.Bullet(this.game));
  };

  Ship.prototype.draw = function(ctx) {
    this.points = this.generateGeometry();
    if (key.isPressed("left")) {
      this.turn(-1*(Math.PI * 2)/45);
    } else if (key.isPressed("right")) {
      this.turn((Math.PI * 2)/45);
    }
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.dir);
    ctx.translate(-1 * this.pos[0], -1 * this.pos[1]);
    this.drawShip(ctx);
    ctx.restore();
  };

  Ship.prototype.drawExhaust = function(ctx) {
    ctx.moveTo(this.pos[0] - 25, this.pos[1] - 3);
    ctx.lineTo(this.pos[0] - 30, this.pos[1]);
    ctx.lineTo(this.pos[0] - 25, this.pos[1] + 3);
    ctx.lineTo(this.pos[0] - 25, this.pos[1] - 3);
  };

  Ship.prototype.drawShip = function(ctx) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.pos[0], this.pos[1]);
    ctx.lineTo(this.pos[0] - 20, this.pos[1] - 7);
    ctx.lineTo(this.pos[0] - 20, this.pos[1] + 7);
    ctx.lineTo(this.pos[0], this.pos[1]);
    ctx.fill();
    ctx.stroke();
    if (this.exhaust) {
      this.drawExhaust(ctx);
    }
  };

})();
