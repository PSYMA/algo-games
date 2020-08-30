var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class RecursiveBacktracker {
    constructor(buttonArray, wallList, startNode, targetNode, row, column, isAlgorithmRunning) {
        this.row = 0;
        this.column = 0;
        this.startNode = undefined;
        this.targetNode = undefined;
        this.visited = [];
        this.wallList = [];
        this.openList = [];
        this.stackList = [];
        this.buttonArray = [];
        this.isAlgorithmRunning = new Array(1);
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
    sleep(msec) {
        return __awaiter(this, void 0, void 0, function* () { return new Promise(resolve => setTimeout(resolve, msec)); });
    }
    PushNode(r, c, arr, arr1, r1, c1) {
        let find = this.visited.find(x => x == this.buttonArray[r][c]);
        if (!find) {
            arr.push(this.buttonArray[r][c]);
            arr1.push(this.buttonArray[r1][c1]);
        }
    }
    RecursiveBacktracker() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sleep(50);
            let arr = [];
            let arr1 = [];
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
                else if (this.stackList.length == 0) {
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
            }
            this.RecursiveBacktracker();
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
        $("#PathFindingMessage").html("Maze Created!");
        this.isAlgorithmRunning[0] = false;
    }
    StartRecursiveBacktracker() {
        return __awaiter(this, void 0, void 0, function* () {
            $("#PathFindingMessage").html("Creating Maze...");
            yield this.RecursiveBacktracker();
        });
    }
}
//# sourceMappingURL=RecursiveBacktracker.js.map