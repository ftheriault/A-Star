# A-Star
JavaScript A* implementation

## Goal

Small utility file to help sprites find their way in a map.

## How it works

When using the file a-star.js, the parameters are:

currentX, currentY : current position of sprite  
destinationX, destinationY : destination point  
map : must have the function getWalkableCost(x, y), which must return -1 if a wall, or the cost of passing through that path (10 should be default, 15 could be high ground and 20 could be a sand pit, for example)  
minObstacleSize : in order to jump to next node, how many pixels can we jump over? 1 is ideal, but requires a lot more processing/memory  
isSupportDiagonal : can the sprite move diagonally?  
isRoundDiagonalEdge : is it possible for the sprite to pass near a wall in diagonal? (if true, less cpu intensive, but more error prone). If set to false, a collision detection logic could fail if a sprite attempts to pass through a wall diagonally  
					  
## About the demo

You can click on the map to change the end point.


