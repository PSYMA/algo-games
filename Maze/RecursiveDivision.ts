export default class RecursiveDivision {
    private row: number = 0;
    private column: number = 0;
    private startNode: HTMLDivElement = undefined;
    private targetNode: HTMLDivElement = undefined;
    private wallList: Array<HTMLDivElement> = [];
    private buttonArray: Array<HTMLDivElement>[] = [];
    private doorX: Array<HTMLDivElement> = [];
    private doorY: Array<HTMLDivElement> = [];
    private turn: boolean = true;
    private isAlgorithmRunning = new Array<boolean>(1);
    constructor(buttonArray: Array<HTMLDivElement>[], wallList: Array<HTMLDivElement>, startNode: HTMLDivElement, targetNode: HTMLDivElement, row: number, column: number, isAlgorithmRunning: Array<boolean>) {
        this.row = row;
        this.column = column;
        this.wallList = wallList;
        this.startNode = startNode;
        this.targetNode = targetNode;
        this.buttonArray = buttonArray;
        this.isAlgorithmRunning = isAlgorithmRunning;

        let r = Math.floor(Math.random() * 100);
        if (r % 2 == 1) { this.turn = false; }
        else { this.turn = true; }
    }
    private async sleep(msec) { return new Promise(resolve => setTimeout(resolve, msec)); }
    // source https://stackoverflow.com/questions/23530756/maze-recursive-division-algorithm-design
    private Finish() {
        this.isAlgorithmRunning[0] = false;

    }
    private RandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    private async Division(h: boolean, minX: number, maxX: number, minY: number, maxY: number) {
        if (h) {
            this.turn = !this.turn;
            if (maxX - minX < 1) { return; }
            let y = Math.floor(this.RandomNumber(minY, maxY) / 2) * 2;
            if (this.turn) {
                await this.AddHWall(minX, maxX, y);
                await this.Division(!h, minX, maxX, y + 1, maxY);
                await this.Division(!h, minX, maxX, minY, y - 1);
            }
            else {
                await this.AddHWall(minX, maxX, y);
                await this.Division(!h, minX, maxX, minY, y - 1);
                await this.Division(!h, minX, maxX, y + 1, maxY);
            }

        } else {
            this.turn = !this.turn;
            if (maxY - minY < 1) { return; }
            let x = Math.floor(this.RandomNumber(minX, maxX) / 2) * 2;
            if (this.turn) {
                await this.AddVWall(minY, maxY, x);
                await this.Division(!h, x + 1, maxX, minY, maxY);
                await this.Division(!h, minX, x - 1, minY, maxY);
            }
            else {
                await this.AddVWall(minY, maxY, x);
                await this.Division(!h, minX, x - 1, minY, maxY);
                await this.Division(!h, x + 1, maxX, minY, maxY);
            }
        }
    }
    private async AddHWall(minX: number, maxX: number, y: number) {
        let hole = Math.floor(this.RandomNumber(minX, maxX) / 2) * 2 + 1;
        for (let i = minX; i <= maxX; i++) {
            if (i != hole && this.buttonArray[y][i] != this.startNode && this.buttonArray[y][i] != this.targetNode) {
                await this.sleep(10);
                if (this.doorX.indexOf(this.buttonArray[y][i]) == -1) {
                    this.buttonArray[y][i].style.background = 'black';
                    this.wallList.push(this.buttonArray[y][i]);
                }
            }
            else {
                this.doorX.push(this.buttonArray[y][i]);
            }
        }
    }
    private async AddVWall(minY: number, maxY: number, x: number) {
        let hole = Math.floor(this.RandomNumber(minY, maxY) / 2) * 2 + 1;
        for (let i = minY; i <= maxY; i++) {
            if (i != hole && this.buttonArray[i][x] != this.startNode && this.buttonArray[i][x] != this.targetNode) {
                await this.sleep(10);
                if (this.doorY.indexOf(this.buttonArray[i][x]) == -1) {
                    this.buttonArray[i][x].style.background = 'black';
                    this.wallList.push(this.buttonArray[i][x]);
                }
            }
            else {
                this.doorY.push(this.buttonArray[i][x]);
            }
        }
    }
    public async StartRecursiveDivision() {
        document.getElementById("PathFindingMessage").innerHTML = "Creating Maze...";
        await this.Division(false, 0, this.column - 1, 0, this.row - 1);
        this.Finish();
        document.getElementById("PathFindingMessage").innerHTML = "Maze Created!";
    }
}