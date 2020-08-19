var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class AStar {
    constructor(buttonArray, wallList, startNode, targetNode, row, column, ifDijkstraOrGBF, isAlgorithmRunning) {
        this.row = 0;
        this.count = 1;
        this.column = 0;
        this.ifDijkstraOrGBF = "";
        this.startNode = undefined;
        this.targetNode = undefined;
        this.origStartNode = undefined;
        this.openList = [];
        this.closeList = [];
        this.wallList = [];
        this.finalPathList = [];
        this.buttonArray = [[], []];
        this.isAlgorithmRunning = new Array(1);
        this.row = row;
        this.column = column;
        this.wallList = wallList;
        this.startNode = startNode;
        this.targetNode = targetNode;
        this.ifDijkstraOrGBF = ifDijkstraOrGBF;
        this.buttonArray = buttonArray;
        this.origStartNode = startNode;
        this.isAlgorithmRunning = isAlgorithmRunning;
    }
    sleep(msec) {
        return __awaiter(this, void 0, void 0, function* () { return new Promise(resolve => setTimeout(resolve, msec)); });
    }
    Finish() {
        document.getElementById("PathFindingMessage").innerHTML = "Path Created!";
        this.isAlgorithmRunning[0] = false;
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
    PushNode(btn, addr) {
        let find1 = this.wallList.find(x => x == btn);
        let find2 = this.closeList.find(x => x.current == btn);
        let find3 = this.openList.find(x => x.current == btn);
        if (!find1 && !find2 && !find3) {
            let node = {
                fScore: 0,
                gScore: 0,
                hScore: 0,
                parent: undefined,
                current: undefined
            };
            let pos1 = this.GetIndex(btn);
            let pos2 = this.GetIndex(this.targetNode);
            let pos3 = this.GetIndex(this.origStartNode);
            let dx = Math.abs(pos1[0] - pos2[0]);
            let dy = Math.abs(pos1[1] - pos2[1]);
            let dx1 = Math.abs(pos1[0] - pos3[0]);
            let dy1 = Math.abs(pos1[1] - pos3[1]);
            if (this.ifDijkstraOrGBF == "Dijkstra") {
                node.hScore = 0;
                node.gScore = this.count + (addr - 1);
            }
            else if (this.ifDijkstraOrGBF == "GBF") {
                node.gScore = 0;
                node.hScore = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            }
            else {
                let D = 1;
                let D2 = Math.sqrt(2);
                node.hScore = D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy);
                node.gScore = Math.max(dx1, dy1) + addr;
            }
            // btn.style.background = 'skyblue';
            if (btn != this.origStartNode && btn != this.targetNode) {
                btn.className = "visited";
            }
            node.current = btn;
            node.parent = this.startNode;
            node.fScore = node.gScore + node.hScore;
            btn.textContent = node.fScore.toString();
            this.openList.push(node);
        }
    }
    CreatePath() {
        return __awaiter(this, void 0, void 0, function* () {
            document.getElementById("PathFindingMessage").innerHTML = "Creating Path...";
            yield this.sleep(10);
            if (this.startNode == this.targetNode) {
                this.Finish();
                return;
            }
            this.startNode = this.finalPathList.pop();
            if (this.startNode != this.targetNode) {
                this.startNode.className = "path";
            }
            //this.origStartNode.style.background = 'green';
            this.CreatePath();
        });
    }
    AstarSearch() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sleep(10);
            if (this.startNode == this.targetNode) {
                for (let i = this.closeList.length - 1; i >= 0; i--) {
                    let btn = this.closeList[i].current;
                    if (btn == this.startNode) {
                        this.startNode = this.closeList[i].parent;
                        this.finalPathList.push(btn);
                        if (this.startNode == this.origStartNode) {
                            break;
                        }
                    }
                }
                this.CreatePath();
                return;
            }
            let pos = this.GetIndex(this.startNode);
            // pos[0] = row, pos[1] = column;
            if (pos[0] - 1 >= 0) { // north
                let r = pos[0] - 1;
                let c = pos[1];
                this.PushNode(this.buttonArray[r][c], 10);
            }
            if (pos[0] + 1 < this.row) { // south
                let r = pos[0] + 1;
                let c = pos[1];
                this.PushNode(this.buttonArray[r][c], 10);
            }
            if (pos[1] + 1 < this.column) { // east
                let r = pos[0];
                let c = pos[1] + 1;
                this.PushNode(this.buttonArray[r][c], 10);
            }
            if (pos[1] - 1 >= 0) { // west
                let r = pos[0];
                let c = pos[1] - 1;
                this.PushNode(this.buttonArray[r][c], 10);
            }
            if (pos[0] - 1 >= 0 && pos[1] + 1 < this.column) { // northeast
                let r = pos[0] - 1;
                let c = pos[1] + 1;
                this.PushNode(this.buttonArray[r][c], 14);
            }
            if (pos[0] - 1 >= 0 && pos[1] - 1 >= 0) { // northeast
                let r = pos[0] - 1;
                let c = pos[1] - 1;
                this.PushNode(this.buttonArray[r][c], 14);
            }
            if (pos[0] + 1 < this.row && pos[1] + 1 < this.column) { // southeast
                let r = pos[0] + 1;
                let c = pos[1] + 1;
                this.PushNode(this.buttonArray[r][c], 14);
            }
            if (pos[0] + 1 < this.row && pos[1] - 1 >= 0) { // southwest
                let r = pos[0] + 1;
                let c = pos[1] - 1;
                this.PushNode(this.buttonArray[r][c], 14);
            }
            if (this.openList.length != 0) {
                this.openList.sort((a, b) => a.fScore - b.fScore);
                let btn = this.openList.shift();
                this.startNode = btn.current;
                this.closeList.push(btn);
            }
            else if (this.openList.length == 0) {
                this.isAlgorithmRunning[0] = false;
                document.getElementById("PathFindingMessage").innerHTML = "No route available!";
                return;
            }
            else {
                this.Finish();
                return;
            }
            this.count++;
            this.targetNode.style.background = 'red';
            this.origStartNode.style.background = 'green';
            this.AstarSearch();
        });
    }
    StartAStarSearch() {
        if (this.ifDijkstraOrGBF == "GBF") {
            document.getElementById("PathFindingMessage").innerHTML = "Visualizing GreedyBestFirst search...";
        }
        else if (this.ifDijkstraOrGBF == "Dijkstra") {
            document.getElementById("PathFindingMessage").innerHTML = "Visualizing Dijkstra search...";
        }
        else {
            document.getElementById("PathFindingMessage").innerHTML = "Visualizing A* search...";
        }
        this.AstarSearch();
    }
}
//# sourceMappingURL=AStar.js.map