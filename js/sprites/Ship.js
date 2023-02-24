
import calculatePath from './../utils/a-star.js';

export default class Ship {

    constructor(map) {
        this.map = map;
        this.location = {x : 1, y : 1}
        this.path = new Array();
        this.speed = 0;
        this.maxSpeed = 0.7;
        this.velocity = 0.005;
        this.nextPoint = null;
        this.image = new Image();
        this.image.src = "images/ship.png";
        this.angle = 0;
    }

    recalculatePath() {
        this.path = calculatePath(Math.round(this.location.x), Math.round(this.location.y),
                                this.map.endPoint.x, this.map.endPoint.y, this.map, 1, true, true);

        if (this.path.length > 0) {
            this.nextPoint = this.path[0];
        }
    }

    tick(gameCtx) {
        if (Math.abs(this.map.endPoint.x - this.location.x) > 1.1 || Math.abs(this.map.endPoint.y - this.location.y) > 1.1) {
            if (this.nextPoint != null) {
                this.speed += this.velocity;

                if (this.speed > this.maxSpeed) {
                    this.speed = this.maxSpeed;
                }

                this.angle = Math.atan2(this.nextPoint.y - this.location.y, this.nextPoint.x - this.location.x);
                this.location.y += Math.sin(this.angle) * this.speed;
                this.location.x += Math.cos(this.angle) * this.speed;
            }

            if (this.path.length > 0 && Math.abs(this.nextPoint.x - this.location.x) <= 1.1 &&
                Math.abs(this.nextPoint.y - this.location.y) <= 1.1) {
                this.nextPoint = this.path.shift();
            }
        }
        else {
            this.speed = 0;
            gameCtx.fillStyle = "white";
            gameCtx.font = "20px Arial";
            gameCtx.fillText("YARGG!!", (this.location.x + 5) * this.map.getCellWidth(), this.location.y * this.map.getCellHeight());
        }

        if (this.image.complete) {
            let size = this.map.getCellWidth() * 10;
            gameCtx.save();
            gameCtx.translate(this.location.x * this.map.getCellWidth(), this.location.y * this.map.getCellHeight());
            gameCtx.rotate(this.angle - Math.PI/2);
            gameCtx.drawImage(this.image, -size/2, -size/2, size, size);
            gameCtx.restore();
        }
    }
}