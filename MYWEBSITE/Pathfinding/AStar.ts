export default class AStar {
    private row: number = 0;
    private count: number = 1;
    private column: number = 0;
    private ifDijkstraOrGBF: string = "";
    private startNode: HTMLDivElement = undefined;
    private targetNode: HTMLDivElement = undefined;
    private origStartNode: HTMLDivElement = undefined;
    private openList: Array<Pathfinding.INode> = [];
    private closeList: Array<Pathfinding.INode> = [];
    private wallList: Array<HTMLDivElement> = [];
    private finalPathList: Array<HTMLDivElement> = [];
    private buttonArray: Array<HTMLDivElement>[] = [[], []];
    private isAlgorithmRunning = new Array<boolean>(1);
    constructor(buttonArray: Array<HTMLDivElement>[], wallList: Array<HTMLDivElement>, startNode: HTMLDivElement, targetNode: HTMLDivElement, row: number, column: number, ifDijkstraOrGBF: string, isAlgorithmRunning: Array<boolean>) {
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

    private async sleep(msec: number): Promise<unknown> { return new Promise(resolve => setTimeout(resolve, msec)); }
    private Finish() {
        document.getElementById("PathFindingMessage").innerHTML = "Path Created!";
        this.isAlgorithmRunning[0] = false;
    }
    private GetIndex(item: HTMLDivElement) {
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.column; j++) {
                if (this.buttonArray[i][j] == item) {
                    return [i, j];
                }
            }
        }
        return [-1, -1];
    }
    private PushNode(btn: HTMLDivElement, addr: number) {
        let find1 = this.wallList.find(x => x == btn);
        let find2 = this.closeList.find(x => x.current == btn);
        let find3 = this.openList.find(x => x.current == btn);

        if (!find1 && !find2 && !find3) {
            let node: Pathfinding.INode = {
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
                node.hScore = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                node.gScore = Math.max(dx1, dy1) + addr - 1;
            }
            btn.style.background = 'skyblue';
            node.current = btn;
            node.parent = this.startNode;
            node.fScore = node.gScore + node.hScore;
            btn.textContent = node.fScore.toString();
            this.openList.push(node);
        }
    }
    private async CreatePath() {
        document.getElementById("PathFindingMessage").innerHTML = "Creating Path...";
        await this.sleep(25);
        this.targetNode.style.background = 'red';
        this.origStartNode.style.background = 'green';
        if (this.startNode == this.targetNode) {
            this.Finish();
            return;
        }
        this.startNode = this.finalPathList.pop();
        this.startNode.style.background = 'yellow';
        this.CreatePath();
    }
    private async AstarSearch() {
        await this.sleep(10);
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
        else {
            this.Finish();
            return;
        }
        this.count++;
        this.targetNode.style.background = 'red';
        this.origStartNode.style.background = 'green';
        this.AstarSearch();
    }
    public StartAStarSearch() {
        if(this.ifDijkstraOrGBF == "GBF"){
            document.getElementById("PathFindingMessage").innerHTML = "Visualizing GreedyBestFirst search...";
        }
        if(this.ifDijkstraOrGBF == "Dijkstra"){
            document.getElementById("PathFindingMessage").innerHTML = "Visualizing Dijkstra search...";
        }
        else{
            document.getElementById("PathFindingMessage").innerHTML = "Visualizing A* search...";
        }
        this.AstarSearch();
    }
}