var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class PrimsAlgorithm {
    constructor(buttonArray, wallList, startNode, targetNode, row, column, isAlgorithmRunning) {
        this.row = 0;
        this.column = 0;
        this.startNode = undefined;
        this.targetNode = undefined;
        this.visited = [];
        this.wallList = [];
        this.otherWallList = [];
        this.buttonArray = [];
        this.isAlgorithmRunning = new Array(1);
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
    sleep(msec) {
        return __awaiter(this, void 0, void 0, function* () { return new Promise(resolve => setTimeout(resolve, msec)); });
    }
    PushNode(arr, arr1, r, c, r1, c1) {
        let btn1 = this.buttonArray[r][c];
        let btn2 = this.buttonArray[r1][c1];
        if (!this.otherWallList.find(x => x == btn1)) {
            arr.push(btn1);
            arr1.push(btn2);
        }
    }
    RandomizedPrimsAlgorithm() {
        return __awaiter(this, void 0, void 0, function* () {
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
                yield this.sleep(10);
                this.otherWallList.push(btn1);
                btn1.style.background = 'white';
            }
            if (btn2 != this.startNode && btn2 != this.targetNode) {
                yield this.sleep(10);
                this.otherWallList.push(btn2);
                btn2.style.background = 'white';
            }
            if (this.visited.length >= 341) {
                document.getElementById("PathFindingMessage").innerHTML = "Maze Created!";
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
        });
    }
    GetIndex(item) {
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.column; j++) {
                if (this.buttonArray[i][j] == item) {
                    return [i, j];
                }
            }
        }
        return [-1, -1];
    }
    Finish() {
        this.isAlgorithmRunning[0] = false;
    }
    StartRandomizedPrims() {
        return __awaiter(this, void 0, void 0, function* () {
            document.getElementById("PathFindingMessage").innerHTML = "Creating Maze...";
            yield this.RandomizedPrimsAlgorithm();
        });
    }
}
//# sourceMappingURL=PrimsAlgorithm.js.map