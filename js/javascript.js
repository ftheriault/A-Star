import Ship from "./sprites/Ship.js";
import GameMap from "./sprites/GameMap.js";

let width = 160;
let height = 160;
let canvas = document.querySelector("canvas");
let gameCtx = canvas.getContext("2d");
let map = new GameMap(width, height);
let ship = new Ship(map);
ship.recalculatePath();
let treasureImage = new Image();
treasureImage.src = "images/treasure.webp";

canvas.onclick = function (event) {
    map.setEndPoint(event);
    ship.recalculatePath();
}

function tick() {
    gameCtx.clearRect(0, 0, canvas.width, canvas.height);
    map.tick(gameCtx);

    if (treasureImage.complete) {
        map.drawImage(gameCtx, map.endPoint.x, map.endPoint.y, treasureImage);
    }

    ship.tick(gameCtx);

    window.requestAnimationFrame(tick);
}

tick();