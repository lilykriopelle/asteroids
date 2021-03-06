;(function() {
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var GameView = window.Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.paused = true;
  };

  GameView.prototype.start = function() {
    window.setInterval(function(){
      this.game.draw(this.ctx);
    }.bind(this), 20);
    this.bindKeys();
  };

  GameView.prototype.bindKeys = function() {
    key('p', function() { this.togglePause(); }.bind(this));
    $("body").keydown(function(event) {
      if (event.keyCode == 38) {
        this.game.ship.power(1);
        this.game.ship.exhaust = true;
      }
    }.bind(this));

    $("body").keyup(function(event) {
      if (event.keyCode == 38) {
        this.game.ship.exhaust = false;
      }
    }.bind(this));

    var firing = false;
    $("body").keydown(function(event) {
      if (! this.paused && event.keyCode == 32 && !firing) {
        this.game.ship.fireBullet();
        firing = true;
      }
    }.bind(this));

    $("body").keyup(function(event) {
      if (event.keyCode == 32) {
        firing = false;
      }
    }.bind(this));

    $(window).resize(function() {
      window.Asteroids.Game.DIM_X = $(window).width();
      window.Asteroids.Game.DIM_Y = $(window).height();
      $("canvas").attr("width", window.Asteroids.Game.DIM_X);
      $("canvas").attr("height", window.Asteroids.Game.DIM_Y);
    });

    key('enter', function() { this.game.reset(); }.bind(this));
  };

  GameView.prototype.togglePause = function() {
    if (this.game.ship.lives > 0) {
      this.paused = !this.paused;
      if (this.paused) {
        window.clearInterval(this.stepInt);
        $(".instructions").addClass("active");
      } else {
        $(".instructions").removeClass("active");
        this.stepInt = window.setInterval(this.game.step.bind(this.game), 20);
      }
    }
  };

})();
