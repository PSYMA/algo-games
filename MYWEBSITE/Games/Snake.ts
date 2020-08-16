export default class Snake {
    private speed: number = 20;
    private gameWidth: number = 0;
    private gameHeight: number = 0;
    private snakeWidth: number = 20;
    private snakeHeight: number = 20;
    private food: Game.SnakeNode;
    private head: Game.SnakeNode;
    private up: boolean = false;
    private right: boolean = true;
    private left: boolean = false;
    private down: boolean = false;
    private tailsList: Array<Game.SnakeNode> = [];
    private ctx: CanvasRenderingContext2D = undefined;
    private isAlgorithmRunning = new Array<boolean>(1);
     
    constructor(ctx: CanvasRenderingContext2D, gameWidth: number, gameHeight: number, isAlgorithmRunning: Array<boolean>) {
        this.ctx = ctx;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.isAlgorithmRunning = isAlgorithmRunning;

        let food: Game.SnakeNode = {
            x: Math.floor(Math.random() * gameWidth),
            y: Math.floor(Math.random() * gameHeight),
            width: this.snakeWidth,
            height: this.snakeHeight
        }
        let head: Game.SnakeNode = {
            x: Math.floor(gameWidth / 2),
            y: Math.floor(gameHeight / 2),
            width: this.snakeWidth,
            height: this.snakeHeight
        }
        this.food = food;
        this.head = head;
    }
    private KeyEvent() {
        document.addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                case 87: // up
                    this.up = true; this.down = false; this.left = false; this.right = false;
                    break;
                case 83: // down
                    this.up = false; this.down = true; this.left = false; this.right = false;
                    break;
                case 68: // right
                    this.up = false; this.down = false; this.left = false; this.right = true;
                    break;
                case 65: // left
                    this.up = false; this.down = false; this.left = true; this.right = false;
                    break;
            }
        });
    }
    private async sleep(msec: number) { return new Promise(resolve => setTimeout(resolve, msec)); }

    private async Draw() {
        if (!this.isAlgorithmRunning[0]) { return; }
        await this.sleep(80);
        this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
        this.ctx.fillStyle = "Red";
        this.ctx.fillRect(this.food.x, this.food.y, this.food.width, this.food.height);
        this.ctx.fillStyle = "Blue";
        this.ctx.fillRect(this.head.x, this.head.y, this.head.width, this.head.height);

        // draw tails
        for (let i = 0; i < this.tailsList.length; i++) {
            let prev = this.tailsList[i];
            let r = Math.floor(Math.random() * 255).toString();
            let g = Math.floor(Math.random() * 255).toString();
            let b = Math.floor(Math.random() * 255).toString();
            let rgb = "rgba(" + r + "," + g + "," + b + "," + "255)";
            this.ctx.fillStyle = rgb;
            this.ctx.fillRect(prev.x, prev.y, prev.width, prev.height);
        }

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

        // check if food eaten
        if (this.head.x - this.head.width / 2 < this.food.x - this.food.width / 2 + this.food.width &&
            this.head.x - this.head.width / 2 + this.head.width > this.food.x - this.food.width / 2 &&
            this.head.y - this.head.height / 2 < this.food.y - this.food.height / 2 + this.food.height &&
            this.head.y - this.head.height / 2 + this.head.width > this.food.y - this.food.height / 2) {
            let food: Game.SnakeNode = {
                x: Math.floor(Math.random() * this.gameWidth),
                y: Math.floor(Math.random() * this.gameHeight),
                width: this.snakeWidth,
                height: this.snakeHeight
            }
            this.food = food;
            let tail: Game.SnakeNode = {
                x: this.head.x,
                y: this.head.y,
                width: this.snakeWidth,
                height: this.snakeHeight
            }
            this.tailsList.push(tail);
        }

        this.Draw();

    }
    public Play() {
        this.isAlgorithmRunning[0] = true;
        this.KeyEvent();
        this.Draw();
    }
}