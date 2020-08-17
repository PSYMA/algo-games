var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class FloodFill {
    constructor(buttonArray, wallList, startNode, targetNode, row, column, isAlgorithmRunning) {
        this.row = 0;
        this.count = 1;
        this.column = 0;
        this.isCreatePath = false;
        this.startNode = undefined;
        this.targetNode = undefined;
        this.wallList = [];
        this.buttonArray = [];
        this.openList = [];
        this.visited = [];
        this.isAlgorithmRunning = new Array(1);
        this.row = row;
        this.column = column;
        this.startNode = startNode;
        this.targetNode = targetNode;
        this.wallList = wallList;
        this.buttonArray = buttonArray;
        this.isAlgorithmRunning = isAlgorithmRunning;
        this.openList.push(targetNode);
        this.wallList.push(startNode);
    }
    sleep(msec) {
        return __awaiter(this, void 0, void 0, function* () { return new Promise(resolve => setTimeout(resolve, msec)); });
    }
    Finish() {
        document.getElementById("PathFindingMessage").innerHTML = "Path Created!";
        this.isAlgorithmRunning[0] = false;
    }
    PushNode(r, c, arr) {
        if (!this.isCreatePath) {
            if (this.visited.indexOf(this.buttonArray[r][c]) == -1 && this.wallList.indexOf(this.buttonArray[r][c]) == -1) {
                arr.push(this.buttonArray[r][c]);
                this.visited.push(this.buttonArray[r][c]);
                this.buttonArray[r][c].textContent = this.count.toString();
                if (this.buttonArray[r][c] != this.startNode && this.buttonArray[r][c] != this.targetNode) {
                    this.buttonArray[r][c].className = "visited";
                }
            }
        }
        else {
            if (this.visited.indexOf(this.buttonArray[r][c]) != -1 && this.wallList.indexOf(this.buttonArray[r][c]) == -1) {
                arr.push(this.buttonArray[r][c]);
                this.visited.push(this.buttonArray[r][c]);
            }
        }
    }
    FloodValues() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sleep(15);
            if (this.openList.length <= 0) {
                this.isCreatePath = true;
                this.CreatePath();
                return;
            }
            this.targetNode.textContent = '0';
            this.targetNode.style.background = 'red';
            let arr = [];
            for (let i = 0; i < this.openList.length; i++) {
                // pos[0] = row, pos[1] = column;
                let pos = this.GetIndex(this.openList[i]);
                if (pos[0] - 1 >= 0) { // north
                    let r = pos[0] - 1;
                    let c = pos[1];
                    this.PushNode(r, c, arr);
                }
                if (pos[0] + 1 < this.row) { // south
                    let r = pos[0] + 1;
                    let c = pos[1];
                    this.PushNode(r, c, arr);
                }
                if (pos[1] + 1 < this.column) { // east
                    let r = pos[0];
                    let c = pos[1] + 1;
                    this.PushNode(r, c, arr);
                }
                if (pos[1] - 1 >= 0) { // west
                    let r = pos[0];
                    let c = pos[1] - 1;
                    this.PushNode(r, c, arr);
                }
                if (pos[0] - 1 >= 0 && pos[1] + 1 < this.column) { // northeast
                    let r = pos[0] - 1;
                    let c = pos[1] + 1;
                    this.PushNode(r, c, arr);
                }
                if (pos[0] - 1 >= 0 && pos[1] - 1 >= 0) { // northeast
                    let r = pos[0] - 1;
                    let c = pos[1] - 1;
                    this.PushNode(r, c, arr);
                }
                if (pos[0] + 1 < this.row && pos[1] + 1 < this.column) { // southeast
                    let r = pos[0] + 1;
                    let c = pos[1] + 1;
                    this.PushNode(r, c, arr);
                }
                if (pos[0] + 1 < this.row && pos[1] - 1 >= 0) { // southwest
                    let r = pos[0] + 1;
                    let c = pos[1] - 1;
                    if (this.visited.indexOf(this.buttonArray[r][c]) == -1 && this.wallList.indexOf(this.buttonArray[r][c]) == -1) {
                        arr.push(this.buttonArray[r][c]);
                        this.visited.push(this.buttonArray[r][c]);
                        this.buttonArray[r][c].textContent = this.count.toString();
                        if (this.buttonArray[r][c] != this.startNode && this.buttonArray[r][c] != this.targetNode) {
                            this.buttonArray[r][c].className = "visited";
                        }
                    }
                }
            }
            this.count++;
            this.openList = arr;
            this.FloodValues();
        });
    }
    CreatePath() {
        return __awaiter(this, void 0, void 0, function* () {
            document.getElementById("PathFindingMessage").innerHTML = "Creating Path...";
            yield this.sleep(15);
            if (this.startNode == this.targetNode) {
                this.Finish();
                this.targetNode.style.background = 'red';
                return;
            }
            let arr = [];
            let pos = this.GetIndex(this.startNode);
            // pos[0] = row, pos[1] = column;
            if (pos[0] - 1 >= 0) { // north
                let r = pos[0] - 1;
                let c = pos[1];
                this.PushNode(r, c, arr);
            }
            if (pos[0] + 1 < this.row) { // south
                let r = pos[0] + 1;
                let c = pos[1];
                this.PushNode(r, c, arr);
            }
            if (pos[1] + 1 < this.column) { // east
                let r = pos[0];
                let c = pos[1] + 1;
                this.PushNode(r, c, arr);
            }
            if (pos[1] - 1 >= 0) { // west
                let r = pos[0];
                let c = pos[1] - 1;
                this.PushNode(r, c, arr);
            }
            if (pos[0] - 1 >= 0 && pos[1] + 1 < this.column) { // northeast
                let r = pos[0] - 1;
                let c = pos[1] + 1;
                this.PushNode(r, c, arr);
            }
            if (pos[0] - 1 >= 0 && pos[1] - 1 >= 0) { // northeast
                let r = pos[0] - 1;
                let c = pos[1] - 1;
                this.PushNode(r, c, arr);
            }
            if (pos[0] + 1 < this.row && pos[1] + 1 < this.column) { // southeast
                let r = pos[0] + 1;
                let c = pos[1] + 1;
                this.PushNode(r, c, arr);
            }
            if (pos[0] + 1 < this.row && pos[1] - 1 >= 0) { // southwest
                let r = pos[0] + 1;
                let c = pos[1] - 1;
                this.PushNode(r, c, arr);
            }
            if (arr.length != 0) {
                arr.sort((a, b) => parseInt(a.textContent) - parseInt(b.textContent));
                this.startNode = arr[0];
                // this.startNode.style.background = 'yellow';
                if (this.startNode != this.targetNode)
                    this.startNode.className = "path";
            }
            else if (arr.length == 0) {
                this.isAlgorithmRunning[0] = false;
                document.getElementById("PathFindingMessage").innerHTML = "No route available!";
                return;
            }
            else {
                this.Finish();
                return;
            }
            this.CreatePath();
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
    StartFloodFillSearch() {
        document.getElementById("PathFindingMessage").innerHTML = "Visualizing FloodFill search...";
        this.FloodValues();
    }
}
//# sourceMappingURL=FloodFill.js.map