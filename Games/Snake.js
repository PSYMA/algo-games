var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class Snake {
    constructor(ctx, gameWidth, gameHeight, isAlgorithmRunning) {
        this.score = 0;
        this.speed = 20;
        this.gameWidth = 0;
        this.gameHeight = 0;
        this.snakeWidth = 20;
        this.snakeHeight = 20;
        this.foodTimeLimit = 0;
        this.up = false;
        this.right = true;
        this.left = false;
        this.down = false;
        this.tailsList = [];
        this.ctx = undefined;
        this.isAlgorithmRunning = new Array(1);
        this.ctx = ctx;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.isAlgorithmRunning = isAlgorithmRunning;
        let food = {
            x: Math.floor(Math.random() * gameWidth),
            y: Math.floor(Math.random() * gameHeight),
            width: this.snakeWidth,
            height: this.snakeHeight
        };
        let head = {
            x: Math.floor(gameWidth / 2),
            y: Math.floor(gameHeight / 2),
            width: this.snakeWidth,
            height: this.snakeHeight
        };
        this.food = food;
        this.head = head;
        this.Play();
        this.Stop();
    }
    sleep(msec) {
        return __awaiter(this, void 0, void 0, function* () { return new Promise(resolve => setTimeout(resolve, msec)); });
    }
    KeyEvent() {
        // keyboard input
        document.addEventListener('keydown', (event) => {
            if (event.keyCode == 87 || event.keyCode == 38) {
                // up
                if (!this.down) {
                    this.up = true;
                    this.down = false;
                    this.left = false;
                    this.right = false;
                }
            }
            else if (event.keyCode == 83 || event.keyCode == 40) {
                // down
                if (!this.up) {
                    this.up = false;
                    this.down = true;
                    this.left = false;
                    this.right = false;
                }
            }
            else if (event.keyCode == 68 || event.keyCode == 39) {
                // right
                if (!this.left) {
                    this.up = false;
                    this.down = false;
                    this.left = false;
                    this.right = true;
                }
            }
            else if (event.keyCode == 65 || event.keyCode == 37) {
                // left
                if (!this.right) {
                    this.up = false;
                    this.down = false;
                    this.left = true;
                    this.right = false;
                }
            }
        });
        this.ClickButtons();
    }
    ClickButtons() {
        $("#UP").click(() => {
            // up
            if (!this.down) {
                this.up = true;
                this.down = false;
                this.left = false;
                this.right = false;
            }
        });
        $("#DOWN").click(() => {
            // down
            if (!this.up) {
                this.up = false;
                this.down = true;
                this.left = false;
                this.right = false;
            }
        });
        $("#LEFT").click(() => {
            // left
            if (!this.right) {
                this.up = false;
                this.down = false;
                this.left = true;
                this.right = false;
            }
        });
        $("#RIGHT").click(() => {
            // right
            if (!this.left) {
                this.up = false;
                this.down = false;
                this.left = false;
                this.right = true;
            }
        });
    }
    Draw() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isAlgorithmRunning[0]) {
                return;
            }
            yield this.sleep(80);
            this.foodTimeLimit++;
            this.ctx.clearRect(0, 0, 1000, 1000);
            this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
            // draw head and food
            this.ctx.fillStyle = "Red";
            this.ctx.fillRect(this.food.x, this.food.y, this.food.width, this.food.height);
            this.ctx.fillStyle = "Blue";
            this.ctx.fillRect(this.head.x, this.head.y, this.head.width, this.head.height);
            // draw tails
            for (let i = 0; i < this.tailsList.length; i++) {
                this.ctx.fillStyle = "rgb(0, 77, 170)";
                this.ctx.fillRect(this.tailsList[i].x, this.tailsList[i].y, this.tailsList[i].width, this.tailsList[i].height);
            }
            if (this.speed != 0) {
                // shifting segment of tails to follow the head
                for (let i = 0; i < this.tailsList.length - 1; i++) {
                    let next = this.tailsList[i + 1];
                    this.tailsList[i].x = next.x;
                    this.tailsList[i].y = next.y;
                }
                if (this.tailsList.length != 0) {
                    this.tailsList[this.tailsList.length - 1].x = this.head.x;
                    this.tailsList[this.tailsList.length - 1].y = this.head.y;
                }
                // check direction
                if (this.right)
                    this.head.x += this.speed;
                else if (this.left)
                    this.head.x -= this.speed;
                else if (this.up)
                    this.head.y -= this.speed;
                else if (this.down)
                    this.head.y += this.speed;
                // check if hit wall
                if (this.head.x > this.gameWidth)
                    this.head.x = 0;
                else if (this.head.x < 0)
                    this.head.x = this.gameWidth;
                else if (this.head.y < 0)
                    this.head.y = this.gameHeight;
                else if (this.head.y > this.gameHeight)
                    this.head.y = 0;
                if (this.foodTimeLimit > 50) {
                    this.foodTimeLimit = 0;
                    let food = {
                        x: Math.floor(Math.random() * this.gameWidth),
                        y: Math.floor(Math.random() * this.gameHeight),
                        width: this.snakeWidth,
                        height: this.snakeHeight
                    };
                    this.food = food;
                }
                // check if hit the tails then game over!
                for (let i = 0; i < this.tailsList.length; i++) {
                    let box1 = { x: this.head.x, y: this.head.y, width: this.head.width, height: this.head.height };
                    let box2 = { x: this.tailsList[i].x, y: this.tailsList[i].y, width: this.tailsList[i].width, height: this.tailsList[i].height };
                    if (this.Collision(box1, box2)) {
                        // random colours
                        this.speed = 0;
                    }
                }
                // check if food eaten
                let box1 = { x: this.head.x, y: this.head.y, width: this.head.width, height: this.head.height };
                let box2 = { x: this.food.x, y: this.food.y, width: this.food.width, height: this.food.height };
                if (this.Collision(box1, box2)) {
                    let food = {
                        x: Math.floor(Math.random() * this.gameWidth),
                        y: Math.floor(Math.random() * this.gameHeight),
                        width: this.snakeWidth,
                        height: this.snakeHeight
                    };
                    this.food = food;
                    let tail = {
                        x: this.head.x,
                        y: this.head.y,
                        width: this.snakeWidth,
                        height: this.snakeHeight
                    };
                    this.tailsList.push(tail);
                    this.score++;
                    this.foodTimeLimit = 0;
                    document.getElementById("SnakeScore").innerHTML = "Score: " + this.score.toString();
                }
            }
            else {
                let r = Math.floor(Math.random() * 255).toString();
                let g = Math.floor(Math.random() * 255).toString();
                let b = Math.floor(Math.random() * 255).toString();
                let rgb = "rgba(" + r + "," + g + "," + b + "," + "255)";
                this.ctx.font = "10vw Comic Sans MS";
                this.ctx.fillStyle = rgb;
                this.ctx.textAlign = "center";
                this.ctx.fillText("Game Over!", this.gameWidth / 2, this.gameHeight / 2);
            }
            this.Draw();
        });
    }
    Collision(box1, box2) {
        if (!(box1.x < box2.x + box2.width))
            return false;
        if (!(box1.x + box1.width > box2.x))
            return false;
        if (!(box1.y < box2.y + box2.height))
            return false;
        if (!(box1.height + box1.y > box2.y))
            return false;
        return true;
    }
    Play() {
        this.isAlgorithmRunning[0] = true;
        this.KeyEvent();
        this.Draw();
    }
    Stop() {
        this.isAlgorithmRunning[0] = false;
    }
    Reset() {
        this.tailsList = [];
        this.speed = 20;
        this.score = 0;
        document.getElementById("SnakeScore").innerHTML = "Score: " + this.score.toString();
        let food = {
            x: Math.floor(Math.random() * this.gameWidth),
            y: Math.floor(Math.random() * this.gameHeight),
            width: this.snakeWidth,
            height: this.snakeHeight
        };
        let head = {
            x: Math.floor(this.gameWidth / 2),
            y: Math.floor(this.gameHeight / 2),
            width: this.snakeWidth,
            height: this.snakeHeight
        };
        this.food = food;
        this.head = head;
    }
}
//# sourceMappingURL=Snake.js.map