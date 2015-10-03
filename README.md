#Asteroids
[Play it here!](http://www.lilykriopelle.com/asteroids)

An implementation of everyone's favorite arcade classic, built with HTML5's canvas element, as well as JavaScript and jQuery.


##Asteroid Geometry
To generate each asteroid's geometry, I start at the origin, rotate by 45 degrees, and scale the resulting unit vector by the asteroid's radius and by a random coefficient.  I repeat 8 times, and store an array of those eight points in the asteroid.

Rendering each asteroid is as simple as translating each of those points along the asteroid's position vector, and connecting the dots.

##Collision Detection
Currently, objects are represented by bounding circles for the purposes of approximate collision detection. I plan to implement an optimized per-pixel collision detection algorithm in the future.

##Tools
I use [keymaster](https://github.com/madrobby/keymaster) to simplify listening for keyboard events, and supplement it with jQuery to achieve more customized behavior where necessary.
