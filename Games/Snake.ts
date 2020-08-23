export default class Snake {
    private score: number = 0;
    private speed: number = 20;
    private gameWidth: number = 0;
    private gameHeight: number = 0;
    private snakeWidth: number = 20;
    private snakeHeight: number = 20;
    private foodTimeLimit: number = 0;
    private food: Game.ISnakeProps;
    private head: Game.ISnakeProps;
    private up: boolean = false;
    private right: boolean = true;
    private left: boolean = false;
    private down: boolean = false;
    private tailsList: Array<Game.ISnakeProps> = [];
    private ctx: CanvasRenderingContext2D = undefined;
    private isAlgorithmRunning = new Array<boolean>(1);
    constructor(ctx: CanvasRenderingContext2D, gameWidth: number, gameHeight: number, isAlgorithmRunning: Array<boolean>) {
        this.ctx = ctx;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.isAlgorithmRunning = isAlgorithmRunning;

        let food: Game.ISnakeProps = {
            x: Math.floor(Math.random() * gameWidth),
            y: Math.floor(Math.random() * gameHeight),
            width: this.snakeWidth,
            height: this.snakeHeight
        }
        let head: Game.ISnakeProps = {
            x: Math.floor(gameWidth / 2),
            y: Math.floor(gameHeight / 2),
            width: this.snakeWidth,
            height: this.snakeHeight
        }
        this.food = food;
        this.head = head;

        this.Play();
        this.Stop();

    }

    private async sleep(msec: number) { return new Promise(resolve => setTimeout(resolve, msec)); }
    private KeyEvent() {
        // keyboard input
        document.addEventListener('keydown', (event) => {
            if (event.keyCode == 87 || event.keyCode == 38) {
                // up
                if (!this.down) {
                    this.up = true; this.down = false; this.left = false; this.right = false;
                }
            }
            else if (event.keyCode == 83 || event.keyCode == 40) {
                // down
                if (!this.up) {
                    this.up = false; this.down = true; this.left = false; this.right = false;
                }
            }
            else if (event.keyCode == 68 || event.keyCode == 39) {
                // right
                if (!this.left) {
                    this.up = false; this.down = false; this.left = false; this.right = true;
                }
            }
            else if (event.keyCode == 65 || event.keyCode == 37) {
                // left
                if (!this.right) {
                    this.up = false; this.down = false; this.left = true; this.right = false;
                }
            }
        });
    }
    private async Draw() {
        if (!this.isAlgorithmRunning[0]) { return; }
        await this.sleep(80);
        this.foodTimeLimit++;
        this.ctx.clearRect(0, 0, 1000, 1000);

        // random colours
        let r = Math.floor(Math.random() * 255).toString();
        let g = Math.floor(Math.random() * 255).toString();
        let b = Math.floor(Math.random() * 255).toString();
        let rgb = "rgba(" + r + "," + g + "," + b + "," + "255)";

        this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
        // draw head and food
        this.ctx.fillStyle = "Red";
        this.ctx.fillRect(this.food.x, this.food.y, this.food.width, this.food.height);
        this.ctx.fillStyle = "Blue";
        this.ctx.fillRect(this.head.x, this.head.y, this.head.width, this.head.height);

        // draw tails
        for (let i = 0; i < this.tailsList.length; i++) {
            this.ctx.fillStyle = rgb;
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
            if (this.right) this.head.x += this.speed;
            else if (this.left) this.head.x -= this.speed;
            else if (this.up) this.head.y -= this.speed;
            else if (this.down) this.head.y += this.speed;

            // check if hit wall
            if (this.head.x > this.gameWidth) this.head.x = 0;
            else if (this.head.x < 0) this.head.x = this.gameWidth;
            else if (this.head.y < 0) this.head.y = this.gameHeight;
            else if (this.head.y > this.gameHeight) this.head.y = 0;
            if (this.foodTimeLimit > 50) {
                this.foodTimeLimit = 0;
                let food: Game.ISnakeProps = {
                    x: Math.floor(Math.random() * this.gameWidth),
                    y: Math.floor(Math.random() * this.gameHeight),
                    width: this.snakeWidth,
                    height: this.snakeHeight
                }
                this.food = food;
            }
        }

        // check if hit the tails then game over!
        for (let i = 0; i < this.tailsList.length; i++) {
            let box1: Game.ISnakeProps = { x: this.head.x, y: this.head.y, width: this.head.width, height: this.head.height };
            let box2: Game.ISnakeProps = { x: this.tailsList[i].x, y: this.tailsList[i].y, width: this.tailsList[i].width, height: this.tailsList[i].height };
            if (this.Collision(box1, box2)) {
                this.ctx.font = "250px Comic Sans MS";
                this.ctx.fillStyle = rgb;
                this.ctx.textAlign = "center";
                this.ctx.fillText("Game Over!", this.gameWidth / 2, this.gameHeight / 2 + (this.gameHeight / 8));
                this.speed = 0;
            }
        }
        // check if food eaten
        let box1: Game.ISnakeProps = { x: this.head.x, y: this.head.y, width: this.head.width, height: this.head.height };
        let box2: Game.ISnakeProps = { x: this.food.x, y: this.food.y, width: this.food.width, height: this.food.height };
        if (this.Collision(box1, box2)) {
            let food: Game.ISnakeProps = {
                x: Math.floor(Math.random() * this.gameWidth),
                y: Math.floor(Math.random() * this.gameHeight),
                width: this.snakeWidth,
                height: this.snakeHeight
            }
            this.food = food;
            let tail: Game.ISnakeProps = {
                x: this.head.x,
                y: this.head.y,
                width: this.snakeWidth,
                height: this.snakeHeight
            }
            this.tailsList.push(tail);
            this.score++;
            this.foodTimeLimit = 0;
            document.getElementById("SnakeScore").innerHTML = "Score: " + this.score.toString();
        }
        this.Draw();
    }
    private Collision(box1: Game.ISnakeProps, box2: Game.ISnakeProps) {
        if (!(box1.x < box2.x + box2.width)) return false;
        if (!(box1.x + box1.width > box2.x)) return false;
        if (!(box1.y < box2.y + box2.height)) return false;
        if (!(box1.height + box1.y > box2.y)) return false;
        return true;
    }
    public Play() {
        this.isAlgorithmRunning[0] = true;
        this.KeyEvent();
        this.Draw();
    }
    public Stop() {
        this.isAlgorithmRunning[0] = false;
    }
    public Reset() {
        this.tailsList = [];
        this.speed = 20;
        this.score = 0;
        document.getElementById("SnakeScore").innerHTML = "Score: " + this.score.toString();
        let food: Game.ISnakeProps = {
            x: Math.floor(Math.random() * this.gameWidth),
            y: Math.floor(Math.random() * this.gameHeight),
            width: this.snakeWidth,
            height: this.snakeHeight
        }
        let head: Game.ISnakeProps = {
            x: Math.floor(this.gameWidth / 2),
            y: Math.floor(this.gameHeight / 2),
            width: this.snakeWidth,
            height: this.snakeHeight
        }
        this.food = food;
        this.head = head;
    }
}