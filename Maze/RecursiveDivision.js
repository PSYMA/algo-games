var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class RecursiveDivision {
    constructor(buttonArray, wallList, startNode, targetNode, row, column, isAlgorithmRunning) {
        this.row = 0;
        this.column = 0;
        this.startNode = undefined;
        this.targetNode = undefined;
        this.wallList = [];
        this.buttonArray = [];
        this.doorX = [];
        this.doorY = [];
        this.turn = true;
        this.isAlgorithmRunning = new Array(1);
        this.row = row;
        this.column = column;
        this.wallList = wallList;
        this.startNode = startNode;
        this.targetNode = targetNode;
        this.buttonArray = buttonArray;
        this.isAlgorithmRunning = isAlgorithmRunning;
        let r = Math.floor(Math.random() * 100);
        if (r % 2 == 1) {
            this.turn = false;
        }
        else {
            this.turn = true;
        }
    }
    sleep(msec) {
        return __awaiter(this, void 0, void 0, function* () { return new Promise(resolve => setTimeout(resolve, msec)); });
    }
    // source https://stackoverflow.com/questions/23530756/maze-recursive-division-algorithm-design
    Finish() {
        this.isAlgorithmRunning[0] = false;
    }
    RandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    Division(h, minX, maxX, minY, maxY) {
        return __awaiter(this, void 0, void 0, function* () {
            if (h) {
                this.turn = !this.turn;
                if (maxX - minX < 1) {
                    return;
                }
                let y = Math.floor(this.RandomNumber(minY, maxY) / 2) * 2;
                if (this.turn) {
                    yield this.AddHWall(minX, maxX, y);
                    yield this.Division(!h, minX, maxX, y + 1, maxY);
                    yield this.Division(!h, minX, maxX, minY, y - 1);
                }
                else {
                    yield this.AddHWall(minX, maxX, y);
                    yield this.Division(!h, minX, maxX, minY, y - 1);
                    yield this.Division(!h, minX, maxX, y + 1, maxY);
                }
            }
            else {
                this.turn = !this.turn;
                if (maxY - minY < 1) {
                    return;
                }
                let x = Math.floor(this.RandomNumber(minX, maxX) / 2) * 2;
                if (this.turn) {
                    yield this.AddVWall(minY, maxY, x);
                    yield this.Division(!h, x + 1, maxX, minY, maxY);
                    yield this.Division(!h, minX, x - 1, minY, maxY);
                }
                else {
                    yield this.AddVWall(minY, maxY, x);
                    yield this.Division(!h, minX, x - 1, minY, maxY);
                    yield this.Division(!h, x + 1, maxX, minY, maxY);
                }
            }
        });
    }
    AddHWall(minX, maxX, y) {
        return __awaiter(this, void 0, void 0, function* () {
            let hole = Math.floor(this.RandomNumber(minX, maxX) / 2) * 2 + 1;
            for (let i = minX; i <= maxX; i++) {
                if (i != hole && this.buttonArray[y][i] != this.startNode && this.buttonArray[y][i] != this.targetNode) {
                    yield this.sleep(10);
                    if (this.doorX.indexOf(this.buttonArray[y][i]) == -1) {
                        this.buttonArray[y][i].style.background = 'black';
                        this.wallList.push(this.buttonArray[y][i]);
                    }
                }
                else {
                    this.doorX.push(this.buttonArray[y][i]);
                }
            }
        });
    }
    AddVWall(minY, maxY, x) {
        return __awaiter(this, void 0, void 0, function* () {
            let hole = Math.floor(this.RandomNumber(minY, maxY) / 2) * 2 + 1;
            for (let i = minY; i <= maxY; i++) {
                if (i != hole && this.buttonArray[i][x] != this.startNode && this.buttonArray[i][x] != this.targetNode) {
                    yield this.sleep(10);
                    if (this.doorY.indexOf(this.buttonArray[i][x]) == -1) {
                        this.buttonArray[i][x].style.background = 'black';
                        this.wallList.push(this.buttonArray[i][x]);
                    }
                }
                else {
                    this.doorY.push(this.buttonArray[i][x]);
                }
            }
        });
    }
    StartRecursiveDivision() {
        return __awaiter(this, void 0, void 0, function* () {
            document.getElementById("PathFindingMessage").innerHTML = "Creating Maze...";
            yield this.Division(false, 0, this.column - 1, 0, this.row - 1);
            this.Finish();
            document.getElementById("PathFindingMessage").innerHTML = "Maze Created!";
        });
    }
}
//# sourceMappingURL=RecursiveDivision.js.map