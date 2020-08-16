import Snake from './Games/Snake.js'
import AStar from './Pathfinding/AStar.js'
import MergeSort from './Sorting/MergeSort.js'
import QuickSort from './Sorting/QuickSort.js'
import BubbleSort from './Sorting/BubbleSort.js'
import FloodFill from './Pathfinding/FloodFill.js'
import PrimsAlgorithm from './Maze/PrimsAlgorithm.js'
import RecursiveDivision from './Maze/RecursiveDivision.js'

let isAlgorithmRunning = new Array<boolean>(1);

/*---------------------------------------------------PATH FINDING-------------------------------------------------------*/
let row: number = 20;
let column: number = 61;
let addWall: boolean = false;
let isAddGrid: boolean = false;
let removeWall: boolean = false;
let moveStartNode: boolean = false;
let moveTargetNode: boolean = false;
let startNode: HTMLDivElement = undefined;
let targetNode: HTMLDivElement = undefined;
let prevDivBtn: HTMLDivElement = undefined;
let wallList: Array<HTMLDivElement> = [];
let buttonArray: Array<HTMLDivElement>[] = [];
enum PathFindingAlgorithm { None = 0, Astar, Dijkstra, Floodfill, GreedyBestFirst }
let selectPathFindingAlgorithm: PathFindingAlgorithm = PathFindingAlgorithm.None;

function ClearBoardPathFinding() {
    if (!isAlgorithmRunning[0]) {
        wallList = [];
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                buttonArray[i][j].style.background = 'white';
            }
        }
        startNode = buttonArray[Math.floor(row / 2)][5];
        targetNode = buttonArray[Math.floor(row / 2)][column - 5];
        startNode.style.background = 'green';
        targetNode.style.background = 'red';
    }
}
document.getElementById("PathfindingAlgorithm").onclick = function () {
    if (!isAlgorithmRunning[0]) {
        document.getElementById("Sorting").hidden = true;
        document.getElementById("PathFinding").hidden = false;
        document.getElementById("PathFindingAlgorithm").hidden = false;
        document.getElementById("Snake").hidden = true;
        // create Grid here
        if (!isAddGrid) {
            let table = document.getElementById("Grid");
            for (let i = 0; i < row; i++) {
                let tr = document.createElement("tr");
                table.appendChild(tr);
                for (let j = 0; j < column; j++) {
                    let td = document.createElement("td");
                    let btn = document.createElement("div");
                    btn.setAttribute("style", " background: white; font-size: 0px; color: black; width: 20px; height: 20px; ");
                    btn.id = i.toString() + j.toString();
                    btn.textContent = "-1";
                    td.appendChild(btn);
                    tr.appendChild(td);

                    // assigning value to double dimensional array
                    if (!buttonArray[i]) {
                        buttonArray[i] = [];
                    }
                    buttonArray[i][j] = btn;

                    // assigning startnode and targetnode;
                    if (i == Math.floor(row / 2) && j == 5) {
                        startNode = btn;
                    }
                    else if (i == Math.floor(row / 2) && j == column - 5) {
                        targetNode = btn;
                    }
                    btn.ondragstart = function () {
                        return false;
                    }
                    btn.ondrop = function () {
                        return false;
                    }
                    btn.onmousedown = function () {
                        if (!isAlgorithmRunning[0]) {
                            if (btn.style.background == 'black') {
                                wallList.splice(wallList.indexOf(btn), 1);
                                btn.style.background = 'white';
                                removeWall = true;
                            }
                            else if (btn.style.background == 'white') {
                                btn.style.background = 'black';
                                addWall = true;
                                if (wallList.indexOf(btn) == -1) {
                                    wallList.push(btn);
                                }
                            }
                            else if (btn.style.background == 'green') {
                                moveStartNode = true;
                            }
                            else if (btn.style.background == 'red') {
                                moveTargetNode = true;
                            }
                        }
                    }
                    btn.onmouseup = function () {
                        addWall = false;
                        removeWall = false;
                        if (moveStartNode && btn.style.background != 'black' && btn != targetNode) {
                            if (wallList.find(x => x == startNode)) {
                                wallList.splice(wallList.indexOf(startNode), 1);
                            }
                            startNode.style.background = 'white';
                            startNode = btn;
                            startNode.style.background = 'green';

                        }
                        else {
                            if (moveStartNode) {
                                startNode = prevDivBtn;
                            }
                        }
                        if (moveTargetNode && btn.style.background != 'black' && btn != startNode) {
                            if (wallList.find(x => x == targetNode)) {
                                wallList.splice(wallList.indexOf(targetNode), 1);
                            }
                            targetNode.style.background = 'white';
                            targetNode = btn;
                            targetNode.style.background = 'red';
                        }
                        else {
                            if (moveTargetNode) {
                                targetNode = prevDivBtn;
                            }
                        }
                        moveStartNode = false;
                        moveTargetNode = false;
                    }
                    btn.onmouseover = function () {
                        if (addWall) {
                            if (btn.style.background == 'white') {
                                btn.style.background = 'black';
                                if (wallList.indexOf(btn) == -1) {
                                    wallList.push(btn);
                                }
                            }
                        }
                        else if (removeWall) {
                            if (btn.style.background == 'black') {
                                wallList.splice(wallList.indexOf(btn), 1);
                                btn.style.background = 'white';
                            }
                        }
                    }
                    btn.onmouseleave = function () {
                        if (btn != targetNode && btn.style.background != 'black' && moveStartNode) {
                            prevDivBtn = btn;
                        }
                        else if (btn != startNode && btn.style.background != 'black' && moveTargetNode) {
                            prevDivBtn = btn;
                        }
                    }
                    btn.onmouseenter = function () {
                        if (moveStartNode && btn.style.background != 'black' && btn != targetNode) {
                            btn.style.background = 'green';
                        }
                        if (moveTargetNode && btn.style.background != 'black' && btn != startNode) {
                            btn.style.background = 'red';
                        }
                        if (prevDivBtn != undefined && moveStartNode && btn != targetNode && btn.style.background != "black") {
                            prevDivBtn.style.background = 'white';
                        }
                        if (prevDivBtn != undefined && moveTargetNode && btn != startNode && btn.style.background != "black") {
                            prevDivBtn.style.background = 'white';
                        }
                    }
                }
            }
            isAddGrid = true;
            startNode.style.background = 'green';
            targetNode.style.background = 'red';
        }
    }

}
document.getElementById("ClearBoardPathFinding").onclick = function () {
    document.getElementById("PathFindingMessage").innerHTML = "Welcome to pathfinding visualizer! please select an algorithm";
    ClearBoardPathFinding();
}
document.getElementById("AStar").onclick = function () {
    selectPathFindingAlgorithm = PathFindingAlgorithm.Astar;
    document.getElementById("VisualizePathFinding").textContent = 'Visualize (AStar)';
}
document.getElementById("Dijkstra").onclick = function () {
    selectPathFindingAlgorithm = PathFindingAlgorithm.Dijkstra;
    document.getElementById("VisualizePathFinding").textContent = 'Visualize (Dijkstra)';
}
document.getElementById("GreedyBestFirst").onclick = function () {
    selectPathFindingAlgorithm = PathFindingAlgorithm.GreedyBestFirst;
    document.getElementById("VisualizePathFinding").textContent = 'Visualize (GreedyBestFirst)';
}
document.getElementById("FloodFill").onclick = function () {
    selectPathFindingAlgorithm = PathFindingAlgorithm.Floodfill;
    document.getElementById("VisualizePathFinding").textContent = 'Visualize (FloodFill)';
}
document.getElementById("VisualizePathFinding").onclick = function () {
    if (!isAlgorithmRunning[0]) {
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                if (buttonArray[i][j].style.background == 'skyblue' || buttonArray[i][j].style.background == 'yellow') {
                    buttonArray[i][j].style.background = 'white';
                }
            }
        }
        switch (selectPathFindingAlgorithm) {
            case PathFindingAlgorithm.Astar:
                const aStar = new AStar(buttonArray, wallList, startNode, targetNode, row, column, "Astar", isAlgorithmRunning);
                isAlgorithmRunning[0] = true;
                aStar.StartAStarSearch();
                break;
            case PathFindingAlgorithm.Dijkstra:
                const dijkstra = new AStar(buttonArray, wallList, startNode, targetNode, row, column, "Dijkstra", isAlgorithmRunning);
                isAlgorithmRunning[0] = true;
                dijkstra.StartAStarSearch();
                break;
            case PathFindingAlgorithm.Floodfill:
                const floodFill = new FloodFill(buttonArray, wallList, startNode, targetNode, row, column, isAlgorithmRunning);
                isAlgorithmRunning[0] = true;
                floodFill.StartFloodFillSearch();
                break;
            case PathFindingAlgorithm.GreedyBestFirst:
                const gbf = new AStar(buttonArray, wallList, startNode, targetNode, row, column, "GBF", isAlgorithmRunning);
                isAlgorithmRunning[0] = true;
                gbf.StartAStarSearch();
                break;
        }

    }
}

/*-----------------------------------------------------SORTING-----------------------------------------------------------*/
enum SortingAlgorithm { None = 0, BubbleSort, QuickSort, MergeSort }
let arrayElements: Array<Sorting.INode> = [];
let canvas: any = document.getElementById("SortingBoard");
let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
let selectSortingAlgorithm: SortingAlgorithm = SortingAlgorithm.None;
let slider: any = document.getElementById("Slider");

function AddRandomRect(value: number): void {
    arrayElements = [];
    let width = Math.floor(canvas.width / value);
    function Node() { }
    for (let x = 0; x < canvas.width; x += width) {
        let height = Math.floor(Math.random() * canvas.height);
        let node = new Node();

        let r = Math.floor(Math.random() * 255).toString();
        let g = Math.floor(Math.random() * 255).toString();
        let b = Math.floor(Math.random() * 255).toString();
        let rgb = "rgba(" + r + "," + g + "," + b + "," + "255)";
        //let rgb = 'black';
        ctx.fillStyle = rgb;
        ctx.fillRect(x, canvas.height - height, width, height);

        node.x = x;
        node.y = canvas.height - height;
        node.height = height;
        node.width = width;
        node.rgb = rgb;
        arrayElements.push(node);
    }
}
document.getElementById("SortingAlgorithm").onclick = function () {
    if (!isAlgorithmRunning[0]) {
        document.getElementById("Sorting").hidden = false;
        document.getElementById("PathFinding").hidden = true;
        document.getElementById("PathFindingAlgorithm").hidden = true;
        document.getElementById("Snake").hidden = true;
        document.getElementById("ArraySize").innerHTML = slider.value.toString();
        document.title = "Sorting";
        // create Board here
        canvas.width = 0;
        canvas.height = 0;
        canvas.width = 1300;
        canvas.height = 470;

        AddRandomRect(slider.value);
    }
}
document.getElementById("MergeSort").onclick = function () {
    document.getElementById("VisualizeSorting").textContent = 'Visualize (Merge Sort)';
    selectSortingAlgorithm = SortingAlgorithm.MergeSort;
}
document.getElementById("BubbleSort").onclick = function () {
    document.getElementById("VisualizeSorting").textContent = 'Visualize (Bubble Sort)';
    selectSortingAlgorithm = SortingAlgorithm.BubbleSort;
}
document.getElementById("QuickSort").onclick = function () {
    document.getElementById("VisualizeSorting").textContent = 'Visualize (Quick Sort)';
    selectSortingAlgorithm = SortingAlgorithm.QuickSort;
}
document.getElementById("VisualizeSorting").onclick = function () {
    if (!isAlgorithmRunning[0]) {
        switch (selectSortingAlgorithm) {
            case SortingAlgorithm.BubbleSort:
                const bubbleSort = new BubbleSort(arrayElements, ctx, isAlgorithmRunning);
                isAlgorithmRunning[0] = true;
                bubbleSort.StartBubbleSort();
                break;
            case SortingAlgorithm.MergeSort:
                const mergeSort = new MergeSort(arrayElements, ctx, isAlgorithmRunning);
                break;
            case SortingAlgorithm.QuickSort:
                const quickSort = new QuickSort(arrayElements, ctx, isAlgorithmRunning);
                isAlgorithmRunning[0] = true;
                quickSort.StartQuickSort();
                break;
        }
        if (isAlgorithmRunning[0]) {
            let slider: any = document.getElementById("Slider");
            slider.disabled = true;
        }
    }
}
document.getElementById("ResetArray").onclick = function () {
    if (!isAlgorithmRunning[0]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById("SortingMessage").textContent = "Welcome to sorting visualizer! Please select an algorithm";
        AddRandomRect(slider.value);
    }
}
document.getElementById("Slider").oninput = function () {
    if (!isAlgorithmRunning[0]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        AddRandomRect(slider.value);
        document.getElementById("ArraySize").innerHTML = slider.value.toString();
    }
}

/*-----------------------------------------------------SNAKE GAME--------------------------------------------------------*/
let gameWidth = undefined;
let gameHeight = undefined;
let snake = new Snake(ctx, gameWidth, gameHeight, isAlgorithmRunning);
document.getElementById("SnakeGame").onclick = function () {
    if (!isAlgorithmRunning[0]) {
        document.getElementById("Sorting").hidden = true;
        document.getElementById("PathFinding").hidden = true;
        document.getElementById("PathFindingAlgorithm").hidden = true;
        document.getElementById("Snake").hidden = false;
        let canvas: any = document.getElementById("SnakeBoard");
        let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
        gameWidth = canvas.width;
        gameHeight = canvas.height;
        snake = new Snake(ctx, gameWidth, gameHeight, isAlgorithmRunning);
        isAlgorithmRunning[0] = false;

    }
}
document.getElementById("Play").onclick = function () {
    snake.Play();
}
document.getElementById("Stop").onclick = function () {
    isAlgorithmRunning[0] = false;
}
/*------------------------------------------------------MAZE-------------------------------------------------------------*/
document.getElementById("Prims").onclick = function () {
    if (!isAlgorithmRunning[0]) {
        ClearBoardPathFinding();
        const randomizedPrimsAlgorithm = new PrimsAlgorithm(buttonArray, wallList, startNode, targetNode, row, column, isAlgorithmRunning);
        isAlgorithmRunning[0] = true;
        randomizedPrimsAlgorithm.StartRandomizedPrims();

    }
}
document.getElementById("Recursive").onclick = function () {
    if (!isAlgorithmRunning[0]) {
        ClearBoardPathFinding();
        const recursiveDivision = new RecursiveDivision(buttonArray, wallList, startNode, targetNode, row, column, isAlgorithmRunning);
        isAlgorithmRunning[0] = true;
        recursiveDivision.StartRecursiveDivision();

    }
}

/*-------------------------------------------------CONTENT CLICK----------------------------------------------------------*/
document.getElementById("Games").onclick = function () {

}
document.getElementById("Home").onclick = function () {
    isAlgorithmRunning[0] = false;
    document.getElementById("Sorting").hidden = true;
    document.getElementById("PathFinding").hidden = true;
    document.getElementById("PathFindingAlgorithm").hidden = true;
    document.getElementById("Snake").hidden = true;
}
document.getElementById("Portfolio").onclick = function () {

}