export default class PrimsAlgorithm {
    private row: number = 0;
    private column: number = 0;
    private startNode: HTMLDivElement = undefined;
    private targetNode: HTMLDivElement = undefined;
    private visited: Array<HTMLDivElement> = [];
    private wallList: Array<HTMLDivElement> = [];
    private otherWallList: Array<HTMLDivElement> = [];
    private buttonArray: Array<HTMLDivElement>[] = [];
    private isAlgorithmRunning = new Array<boolean>(1);
    constructor(buttonArray: Array<HTMLDivElement>[], wallList: Array<HTMLDivElement>, startNode: HTMLDivElement, targetNode: HTMLDivElement, row: number, column: number, isAlgorithmRunning: Array<boolean>) {
        this.row = row;
        this.column = column;
        this.wallList = wallList;
        this.startNode = startNode;
        this.targetNode = targetNode;
        this.buttonArray = buttonArray;
        this.isAlgorithmRunning = isAlgorithmRunning;

        this.visited.push(this.buttonArray[Math.floor(row / 2)][Math.floor(column / 2)]);
        // this.visited.push(this.buttonArray[0][column-1]);
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                let btn = this.buttonArray[i][j];
                if (btn != this.startNode && btn != this.targetNode) {
                    this.buttonArray[i][j].style.background = 'black';
                }
            }
        }
    }
    private async sleep(msec) { return new Promise(resolve => setTimeout(resolve, msec)); }
    private PushNode(arr: Array<HTMLDivElement>, arr1: Array<HTMLDivElement>, r: number, c: number, r1: number, c1: number) {
        let btn1 = this.buttonArray[r][c];
        let btn2 = this.buttonArray[r1][c1];
        if (!this.otherWallList.find(x => x == btn1)) {
            arr.push(btn1);
            arr1.push(btn2);
        }
    }
    private async RandomizedPrimsAlgorithm() {
        let arr = [];
        let arr1 = [];
        for (let i = 0; i < this.visited.length; i++) {
            let pos = this.GetIndex(this.visited[i]);
            if (pos[0] - 2 >= 0) { // north
                let r = pos[0] - 2;
                let c = pos[1];
                this.PushNode(arr, arr1, r, c, pos[0] - 1, pos[1]);
            }
            if (pos[0] + 2 < this.row) { // south
                let r = pos[0] + 2;
                let c = pos[1];
                this.PushNode(arr, arr1, r, c, pos[0] + 1, pos[1]);
            }
            if (pos[1] + 2 < this.column) { // east
                let r = pos[0];
                let c = pos[1] + 2;
                this.PushNode(arr, arr1, r, c, pos[0], pos[1] + 1);
            }
            if (pos[1] - 2 >= 0) { // west
                let r = pos[0];
                let c = pos[1] - 2;
                this.PushNode(arr, arr1, r, c, pos[0], pos[1] - 1);
            }
        }
        // let index = Math.floor(Math.random() * arr.length);
        let index = Math.floor(Math.floor(Math.random() * arr.length) / 2) * 2;
        let btn1 = arr[index];
        let btn2 = arr1[index];
        if (!this.visited.find(x => x == btn1)) {
            this.visited.push(btn1);
        }
        if (btn1 != this.startNode && btn1 != this.targetNode) {
            await this.sleep(10);
            this.otherWallList.push(btn1);
            btn1.style.background = 'white';
        }
        if (btn2 != this.startNode && btn2 != this.targetNode) {
            await this.sleep(10);
            this.otherWallList.push(btn2);
            btn2.style.background = 'white';
        }
        if (this.visited.length >= 341) {
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
        this.RandomizedPrimsAlgorithm();
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
    public async StartRandomizedPrims() {
        $("#PathFindingMessage").html("Creating Maze...");
        await this.RandomizedPrimsAlgorithm();
    }
}