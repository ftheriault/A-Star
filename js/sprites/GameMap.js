export default class GameMap {
    constructor(width, height) {
        this.minNodeDistance = 1;
        this.image = new Image();
        this.image.src = "images/water.jpg";

        this.maze = new Array();

        for (let i = 0; i < width; i++) {
            this.maze[i] = new Array();

            for (let j = 0; j < height; j++) {
                this.maze[i].push(0);
            }
        }

        // Add border walls
        for (let i = 0; i < width; i++) {
            this.maze[i][0] = 1;
            this.maze[i][height - 1] = 1;
        }

        for (let j = 0; j < height; j++) {
            this.maze[0][j] = 1;
            this.maze[width - 1][j] = 1;
        }

        // Add obstacle 1
        for (let i = 1; i < width/3 * 2; i++) {
            this.maze[i][height/4] = "1";
        }

        // Add obstacle 2
        for (let i = width/4; i < width; i++) {
            this.maze[parseInt(i)][height/2] = "1";
        }


        // Add obstacle 3
        for (let i = 1; i < height/3; i++) {
            this.maze[width/2][height - i] = "1";
        }

        // end
        this.endPoint = { x : width - 2, y : height - 2};
    }

    // This is the important method
    // Cost to walk on the tile
    // -1 is it is a tile that cannot be walked over
    getWalkableCost(x, y) {
        return this.maze[x][y] != 1 ? 10 : -1;
    }

    drawCell(gameCtx, x, y, color) {
        gameCtx.fillStyle = color;
        gameCtx.fillRect(x * this.getCellWidth(), y * this.getCellHeight(), this.getCellWidth(), this.getCellHeight());
    }

    drawImage(gameCtx, x, y, image) {
        let size = this.getCellWidth() * 7;
        gameCtx.drawImage(image, x * this.getCellWidth() - size/2, y * this.getCellHeight() - size/2, size, size);
    }

    getCellWidth() {
        return canvas.width/this.maze.length
    }

    getCellHeight() {
        return canvas.height/this.maze[0].length
    }

    setEndPoint(evt) {
        let x = evt.offsetX;
        let y = evt.offsetY;

        this.endPoint.x = Math.round((x - this.getCellWidth()/2)/this.getCellWidth());
        this.endPoint.y = Math.round((y - this.getCellHeight()/2)/this.getCellHeight());
    }

    tick(gameCtx) {
        if (this.image.complete) {
            gameCtx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
        }

        for (let i = 0; i < this.maze.length; i++) {
            for (let j = 0; j < this.maze[i].length; j++) {
                let type = this.maze[i][j];

                if (type == "1") {
                    this.drawCell(gameCtx, i, j, "brown");
                }
            }
        }
    }
}