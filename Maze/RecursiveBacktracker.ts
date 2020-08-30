export default class RecursiveBacktracker {
    private row: number = 0;
    private column: number = 0;
    private startNode: HTMLDivElement = undefined;
    private targetNode: HTMLDivElement = undefined;
    private visited: Array<HTMLDivElement> = [];
    private wallList: Array<HTMLDivElement> = [];
    private openList: Array<HTMLDivElement> = [];
    private stackList: Array<HTMLDivElement> = [];
    private buttonArray: Array<HTMLDivElement>[] = [];
    private isAlgorithmRunning = new Array<boolean>(1);

    constructor(buttonArray: Array<HTMLDivElement>[], wallList: Array<HTMLDivElement>, startNode: HTMLDivElement, targetNode: HTMLDivElement, row: number, column: number, isAlgorithmRunning: Array<boolean>) {
        this.row = row;
        this.column = column;
        this.startNode = startNode;
        this.targetNode = targetNode;
        this.wallList = wallList;
        this.buttonArray = buttonArray;
        this.isAlgorithmRunning = isAlgorithmRunning;

        this.openList.push(this.buttonArray[0][0]);
        // this.openList.push(this.buttonArray[Math.floor(Math.random() * row)][Math.floor(Math.random() * column)]);
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                let btn = this.buttonArray[i][j];
                if (btn != this.startNode && btn != this.targetNode) {
                    this.buttonArray[i][j].style.background = 'black';
                }
            }
        }
        this.RecursiveBacktracker();
    }
    private async sleep(msec) { return new Promise(resolve => setTimeout(resolve, msec)); }
    private PushNode(r: number, c: number, arr: Array<HTMLDivElement>, arr1: Array<HTMLDivElement>, r1: number, c1: number) {
        let find = this.visited.find(x => x == this.buttonArray[r][c]);
        if (!find) {
            arr.push(this.buttonArray[r][c]);
            arr1.push(this.buttonArray[r1][c1]);
        }
    }
    private async RecursiveBacktracker() {
        await this.sleep(50);
        let arr: Array<HTMLDivElement> = [];
        let arr1: Array<HTMLDivElement> = [];
        if (this.openList.length != 0) {
            let btn = this.openList.pop();
            this.visited.push(btn);
            let pos = this.GetIndex(btn);
            if (pos[0] - 2 >= 0) { // north
                let r = pos[0] - 2;
                let c = pos[1];
                this.PushNode(r, c, arr, arr1, pos[0] - 1, c);
            }
            if (pos[0] + 2 < this.row) { // south
                let r = pos[0] + 2;
                let c = pos[1];
                this.PushNode(r, c, arr, arr1, pos[0] + 1, c);
            }
            if (pos[1] + 2 < this.column) { // east
                let r = pos[0];
                let c = pos[1] + 2;
                this.PushNode(r, c, arr, arr1, r, pos[1] + 1);
            }
            if (pos[1] - 2 >= 0) { // west
                let r = pos[0];
                let c = pos[1] - 2;
                this.PushNode(r, c, arr, arr1, r, pos[1] - 1);
            }
            if (arr.length != 0) {
                let index = Math.floor(Math.random() * arr.length);
                let btn = arr[index];
                let btn1 = arr1[index];
                if (btn != this.startNode && btn != this.targetNode) {
                    btn.style.background = "blue";
                    setTimeout(function () {
                        btn.style.background = "white";
                    }, 25);
                }
                if (btn1 != this.startNode && btn1 != this.targetNode) {
                    btn1.style.background = "white";
                }
                this.openList.push(btn);
                this.stackList.push(btn);
            }
            else {
                let btn = this.stackList.pop();
                if (btn != this.startNode && btn != this.targetNode) {
                    btn.style.background = "blue";
                    setTimeout(function () {
                        btn.style.background = "white";
                    }, 25);
                }
                this.openList.push(btn);
            }
            if (this.stackList.length == 0) {
                this.Finish();
                for (let i = 0; i < this.row; i++) {
                    for (let j = 0; j < this.column; j++) {
                        if (this.buttonArray[i][j].style.background == 'black') {
                            this.wallList.push(this.buttonArray[i][j]);
                        }
                    }
                }
                return;
            }
        }
        this.RecursiveBacktracker();
    }
    private GetIndex(item) {
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.column; j++) {
                if (this.buttonArray[i][j] == item) {
                    return [i, j];
                }
            }
        }
        return [-1, -1];
    }
    private Finish() {
        $("#PathFindingMessage").html("Maze Created!");
        this.isAlgorithmRunning[0] = false;
    }
    public async StartRecursiveBacktracker() {
        $("#PathFindingMessage").html("Creating Maze...");
        await this.RecursiveBacktracker();
    }
}