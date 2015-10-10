#Asteroids
[Play it here!](http://www.lilykriopelle.com/asteroids)

An implementation of everyone's favorite arcade classic, built with HTML5's canvas element, as well as JavaScript and jQuery.


##Asteroid Geometry
To generate each asteroid's geometry, I start at the origin, rotate by 45 degrees, and scale the resulting unit vector by the asteroid's radius and by a random coefficient.  I repeat 8 times, and store an array of those eight points in the asteroid.

Rendering each asteroid is as simple as translating each of those points along the asteroid's position vector, and connecting the dots.

##Collision Detection
Because asteroids can be either convex or concave polygons, bounding circle collision detecion does not suffice.  Instead, I've written a lightweight implementation of the Separating Axis Theorem, which I use to check the asteroids for collisions.  Since SAT only works on convex polygons, I decompose each asteroid into a series of triangles, and check each of those for collisions with the ship and with bullets.  At present, this collision detection is O(n^2) in the number of collidable objects. This does not create any visible lag, but I'd still like to implement a hash grid to reduce collision detecion's complexity to O(number of collisions) in the near future.   

##Tools
I use [keymaster](https://github.com/madrobby/keymaster) to simplify listening for keyboard events, and supplement it with jQuery to achieve more customized behavior where necessary.
