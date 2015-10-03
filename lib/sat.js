(function() {

  window.Asteroids = window.Asteroids || {};
  var SAT = window.Asteroids.SAT = window.Asteroids.SAT || {};

  SAT.decompose = function(shape) {
    var triangles = [];
    for (var i = 0; i < shape.points.length; i++) {
      var p1 = [shape.points[i][0] + shape.pos[0], shape.points[i][1] + shape.pos[1]];
      var idx = (i+1) % shape.points.length;
      var p2 = [shape.points[idx][0] + shape.pos[0], shape.points[idx][1] + shape.pos[1]];
      var p3 = shape.pos;
      triangles.push({points: [p1,p2,p3]});
    }

    return triangles;
  };

  SAT.projectCircle = function(circle, axis) {
    var centerProj = SAT.dot(circle.pos, axis);
    return [centerProj - circle.radius, centerProj + circle.radius];
  };

  SAT.project = function(triangle, axis) {
    var vertices = triangle.points;
    var min = SAT.dot(axis, vertices[0]);
    var max = min;
    for (var i = 0; i < vertices.length; i++) {
      var point = SAT.dot(axis, vertices[i]);
      if (point < min) {
        min = point;
      } else if (point > max) {
        max = point;
      }
    }
    return [min, max];
  };

  SAT.overlaps = function(v1, v2) {
    return !(v1[1] <= v2[0] || v1[0] >= v2[1]);
  };

  SAT.polygonCollides = function(shape1, shape2) {
    var axes = SAT.axes(shape1).concat(SAT.axes(shape2))
    for (var i = 0; i < axes.length; i++) {
      var proj1 = SAT.project(shape1, axes[i]);
      var proj2 = SAT.project(shape2, axes[i]);
      if (!SAT.overlaps(proj1, proj2)) {
        return false;
      }
    }
    return true;
  };

  SAT.circleCollides = function(polygon, circle) {
    var axes = SAT.axes(polygon);
    for (var i = 0; i < axes.length; i++) {
      var proj1 = SAT.projectCircle(circle, axes[i]);
      var proj2 = SAT.project(polygon, axes[i]);
      if (!SAT.overlaps(proj1, proj2)) {
        return false;
      }
    }
    return true;
  };

  SAT.axes = function(shape) {
    var axes = [];
    for (var i = 0; i < shape.points.length; i++) {
      var p1 = shape.points[i];
      var p2 = shape.points[(i+1) % shape.points.length];
      var edge = [p1[0] - p2[0], p1[1] - p2[1]]
      var axis = SAT.norm(edge);
      axes.push(axis);
    }

    return axes;
  };

  SAT.dot = function(v1, v2) {
    return (v1[0] * v2[0]) + (v1[1] * v2[1]);
  };

  SAT.norm = function(vector) {
    return [-vector[1], vector[0]];
  };
})();
