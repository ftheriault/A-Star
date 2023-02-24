// =========================================
// Author : Frederic Theriault
// URL    : http://www.frederictheriault.com
// -----------------------------------------

/**
 * Calculates a path array using the A* algorithm
 *
 * currentX/Y : current position of sprite
 * destinationYX : destination point
 * map : must have the function getWalkableCost(x, y), which must return -1 if a wall, or the cost of passing through that path
 *		 (10 should be default, 15 could be high ground and 20 could be a sand pit, for example)
 * minObstacleSize : in order to jump to next node, how many pixels can we jump over? 1 is ideal, but requires a lot more processing/memory
 * isRoundDiagonalEdge : is it possible for the sprite to pass near a wall in diagonal? (if true, less cpu intensive, but more error prone).
 *						 If set to false, a collision detection logic could fail if a sprite attempts to pass through a wall diagonally
 *
 * returns the path of points to follow
 */
const calculatePath = (currentX, currentY, destinationX, destinationY, map, minObstacleSize, isSupportDiagonal, isRoundDiagonalEdge) => {
	let Node = function (x, y, cost, parent) {
		this.x = x;
		this.y = y;
		this.parent = parent;

		this.cost = cost;	// g
		this.h = (Math.abs(this.x - destinationX) + Math.abs(this.y - destinationY)) * 1;	// Heuristic (Manhattan method) cost to reach dest.

		this.score = this.cost + (this.parent != null ? this.parent.score : 0 ) + this.h;
	}

	let path = [];
	let openList = [];
	let closedList = [];
	let resultNode = null;
	let currentNode;
	let x, y;
	let cost = 0;
	let inListNode = null;
	let node = null;
	let currentNodeIdx = null;
	let diagAccepted = false;

	openList.push(new Node(currentX, currentY, 0, null));

	// while exist not found or there are nodes to visit
	while (openList.length > 0) {
		currentNodeIdx = 0;
		currentNode = openList[currentNodeIdx];

		for (let j = 0; j < openList.length; j++) {
			if (currentNode.score > openList[j].score) {
				currentNode = openList[j];
				currentNodeIdx = j;
			}
		}

		openList.splice(currentNodeIdx, 1);
		closedList[currentNode.x + "-" + currentNode.y] = 1;

		// for all adjacent node
		for (let i = 0; i < (isSupportDiagonal ? 8 : 4); i++) {
			diagAccepted = true;

			if (i == 0) {x = 0; y = -1 * minObstacleSize}
			else if (i == 1) {x = 1 * minObstacleSize; y = 0;}
			else if (i == 2) {x = 0; y = 1 * minObstacleSize;}
			else if (i == 3) {x = -1 * minObstacleSize; y = 0;}
			else if (i == 4) {x = -1 * minObstacleSize; y = -1  * minObstacleSize;}
			else if (i == 5) {x = 1 * minObstacleSize; y = -1  * minObstacleSize;}
			else if (i == 6) {x = -1 * minObstacleSize; y =  1 * minObstacleSize;}
			else if (i == 7) {x = 1 * minObstacleSize; y =  1 * minObstacleSize;}

			if (i > 3 && isSupportDiagonal && !isRoundDiagonalEdge) {
				if ((i == 4 && (map.getWalkableCost(currentNode.x - 1 * minObstacleSize, currentNode.y) == -1 || (map.getWalkableCost(currentNode.x, currentNode.y - 1 * minObstacleSize) == -1))) ||
					(i == 5 && (map.getWalkableCost(currentNode.x + 1 * minObstacleSize, currentNode.y) == -1 || (map.getWalkableCost(currentNode.x, currentNode.y - 1 * minObstacleSize) == -1))) ||
					(i == 6 && (map.getWalkableCost(currentNode.x - 1 * minObstacleSize, currentNode.y) == -1 || (map.getWalkableCost(currentNode.x, currentNode.y + 1 * minObstacleSize) == -1))) ||
					(i == 7 && (map.getWalkableCost(currentNode.x + 1 * minObstacleSize, currentNode.y) == -1 || (map.getWalkableCost(currentNode.x, currentNode.y + 1 * minObstacleSize) == -1)))) {
					diagAccepted = false;
				}
			}

			// if the node isn't an obstacle or part of closed list
			cost = map.getWalkableCost(currentNode.x + x, currentNode.y + y);

			if (cost != -1 && diagAccepted &&
				closedList[(currentNode.x + x) + "-" + (currentNode.y + y)] == null) {
				node = new Node(currentNode.x + x, currentNode.y + y, Math.round(cost * (i > 3 ? 1.7 : 1)), currentNode);
				inListNode = null;

				for (let j = 0; j < openList.length; j++) {
					if (openList[j].x == node.x && openList[j].y == node.y) {
						inListNode = openList[j];
						break;
					}
				}

				if (inListNode == null) {
					openList.push(node);
				}
				else {
					if (node.score < inListNode.score) {
						inListNode = node;
					}
				}

				// check if node is target node. If so, done!
				if (Math.abs(node.x - destinationX) <  minObstacleSize &&
					Math.abs(node.y - destinationY) <  minObstacleSize) {
					resultNode = node;
					break;
				}
			}
		}

		if (resultNode != null) {
			break;
		}
	}

	// If the resultNode exists, backtrack and create a path
	if (resultNode != null) {
		path.unshift(resultNode);

		while (resultNode.parent != null) {
			resultNode = resultNode.parent;
			path.unshift(resultNode);
		}
	}

	return path;
}

export default calculatePath;