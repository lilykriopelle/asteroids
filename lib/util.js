(function(){
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }
  if (typeof Asteroids.Util === "undefined"){
    window.Asteroids.Util = {};
  }

  window.Asteroids.Util.inherits = function(ChildClass, ParentClass){
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  window.Asteroids.Util.normalize = function(vector) {
    var dX = vector[0], dY = vector[1];
    var magnitude = Math.sqrt( (dX * dX) + (dY * dY) );
    return [vector[0]/magnitude, vector[1]/magnitude];
  };

  window.Asteroids.Util.scale = function(vector, scalar) {
    return [vector[0] * scalar, vector[1] * scalar];
  };

  window.Asteroids.Util.rotate = function(point, pivot, angle) {
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);

    var pointX = point[0], pointY = point[1];
    var pivotX = pivot[0], pivotY = pivot[1];

    return [cos * (pointX - pivotX) - sin * (pointY - pivotY) + pivotX,
            sin * (pointX - pivotX) + cos * (pointY - pivotY) + pivotY];
  };
})();
