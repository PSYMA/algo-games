let turn = false;
document.getElementById("ch").onclick = function () {
    if (!turn) {
        turn = true;
        document.getElementById("bar").setAttribute("style", "display: none; visibility: hidden");
        document.getElementById("times").setAttribute("style", "display: inline; visibility: visible");
    }
    else {
        turn = false;
        document.getElementById("times").setAttribute("style", "display: none; visibility: hidden");
        document.getElementById("bar").setAttribute("style", "display: inline; visibility: visible");
    }
};
import Snake from './Games/Snake.js';
import AStar from './Pathfinding/AStar.js';
import MergeSort from './Sorting/MergeSort.js';
import QuickSort from './Sorting/QuickSort.js';
import BubbleSort from './Sorting/BubbleSort.js';
import FloodFill from './Pathfinding/FloodFill.js';
import PrimsAlgorithm from './Maze/PrimsAlgorithm.js';
import RecursiveDivision from './Maze/RecursiveDivision.js';
let isAlgorithmRunning = new Array(1);
$(document).ready(function () {
    if ($('#Grid').length) {
        let row = 21;
        let column = 61;
        let addWall = false;
        let isAddGrid = false;
        let removeWall = false;
        let moveStartNode = false;
        let moveTargetNode = false;
        let startNode = undefined;
        let targetNode = undefined;
        let prevDivBtn = undefined;
        let wallList = [];
        let buttonArray = [];
        let PathFindingAlgorithm;
        (function (PathFindingAlgorithm) {
            PathFindingAlgorithm[PathFindingAlgorithm["None"] = 0] = "None";
            PathFindingAlgorithm[PathFindingAlgorithm["Astar"] = 1] = "Astar";
            PathFindingAlgorithm[PathFindingAlgorithm["Dijkstra"] = 2] = "Dijkstra";
            PathFindingAlgorithm[PathFindingAlgorithm["Floodfill"] = 3] = "Floodfill";
            PathFindingAlgorithm[PathFindingAlgorithm["GreedyBestFirst"] = 4] = "GreedyBestFirst";
        })(PathFindingAlgorithm || (PathFindingAlgorithm = {}));
        let selectPathFindingAlgorithm = PathFindingAlgorithm.None;
        function AddGrid() {
            if (!isAlgorithmRunning[0]) {
                // create Grid here
                if (!isAddGrid) {
                    let table = document.getElementById("Grid");
                    for (let i = 0; i < row; i++) {
                        let tr = document.createElement("tr");
                        table.appendChild(tr);
                        for (let j = 0; j < column; j++) {
                            let td = document.createElement("td");
                            let btn = document.createElement("div");
                            td.setAttribute("style", "margin: auto; background: white; color: black; width: 1.3vw; height: 1.5vw");
                            td.appendChild(btn);
                            tr.appendChild(td);
                            // assigning value to double dimensional array
                            if (!buttonArray[i]) {
                                buttonArray[i] = [];
                            }
                            buttonArray[i][j] = td;
                            // assigning startnode and targetnode;
                            if (i == Math.floor(row / 2) && j == 5) {
                                startNode = td;
                            }
                            else if (i == Math.floor(row / 2) && j == column - 5) {
                                targetNode = td;
                            }
                            td.ondragstart = function () {
                                return false;
                            };
                            td.ondrop = function () {
                                return false;
                            };
                            td.onmousedown = function () {
                                if (!isAlgorithmRunning[0]) {
                                    if (td.style.background == 'black') {
                                        wallList.splice(wallList.indexOf(td), 1);
                                        td.style.background = 'white';
                                        removeWall = true;
                                    }
                                    else if (td.style.background == 'white') {
                                        td.style.background = 'black';
                                        addWall = true;
                                        if (wallList.indexOf(td) == -1) {
                                            wallList.push(td);
                                        }
                                    }
                                    else if (td.style.background == 'green') {
                                        moveStartNode = true;
                                    }
                                    else if (td.style.background == 'red') {
                                        moveTargetNode = true;
                                    }
                                }
                            };
                            td.onmouseup = function () {
                                addWall = false;
                                removeWall = false;
                                if (moveStartNode && td.style.background != 'black' && td != targetNode) {
                                    if (wallList.find(x => x == startNode)) {
                                        wallList.splice(wallList.indexOf(startNode), 1);
                                    }
                                    startNode.style.background = 'white';
                                    startNode = td;
                                    startNode.style.background = 'green';
                                }
                                else {
                                    if (moveStartNode) {
                                        startNode = prevDivBtn;
                                    }
                                }
                                if (moveTargetNode && td.style.background != 'black' && td != startNode) {
                                    if (wallList.find(x => x == targetNode)) {
                                        wallList.splice(wallList.indexOf(targetNode), 1);
                                    }
                                    targetNode.style.background = 'white';
                                    targetNode = td;
                                    targetNode.style.background = 'red';
                                }
                                else {
                                    if (moveTargetNode) {
                                        targetNode = prevDivBtn;
                                    }
                                }
                                moveStartNode = false;
                                moveTargetNode = false;
                            };
                            td.onmouseover = function () {
                                if (addWall) {
                                    if (td.style.background == 'white') {
                                        td.style.background = 'black';
                                        if (wallList.indexOf(td) == -1) {
                                            wallList.push(td);
                                        }
                                    }
                                }
                                else if (removeWall) {
                                    if (td.style.background == 'black') {
                                        wallList.splice(wallList.indexOf(td), 1);
                                        td.style.background = 'white';
                                    }
                                }
                            };
                            td.onmouseleave = function () {
                                if (td != targetNode && td.style.background != 'black' && moveStartNode) {
                                    prevDivBtn = td;
                                }
                                else if (td != startNode && td.style.background != 'black' && moveTargetNode) {
                                    prevDivBtn = td;
                                }
                            };
                            td.onmouseenter = function () {
                                if (moveStartNode && td.style.background != 'black' && td != targetNode) {
                                    td.style.background = 'green';
                                }
                                if (moveTargetNode && td.style.background != 'black' && td != startNode) {
                                    td.style.background = 'red';
                                }
                                if (prevDivBtn != undefined && moveStartNode && td != targetNode && td.style.background != "black") {
                                    prevDivBtn.style.background = 'white';
                                }
                                if (prevDivBtn != undefined && moveTargetNode && td != startNode && td.style.background != "black") {
                                    prevDivBtn.style.background = 'white';
                                }
                            };
                        }
                    }
                    isAddGrid = true;
                    startNode.style.background = 'green';
                    targetNode.style.background = 'red';
                }
            }
        }
        function ClearBoardPathFinding() {
            if (!isAlgorithmRunning[0]) {
                document.getElementById("PathFindingMessage").innerHTML = "Welcome to Pathfinding Visualizer! please select an algorithm";
                wallList = [];
                for (let i = 0; i < row; i++) {
                    for (let j = 0; j < column; j++) {
                        buttonArray[i][j].className = " ";
                        buttonArray[i][j].style.background = 'white';
                    }
                }
                startNode = buttonArray[Math.floor(row / 2)][5];
                targetNode = buttonArray[Math.floor(row / 2)][column - 5];
                startNode.style.background = 'green';
                targetNode.style.background = 'red';
            }
        }
        function VisualizePathfinding() {
            if (!isAlgorithmRunning[0]) {
                for (let i = 0; i < row; i++) {
                    for (let j = 0; j < column; j++) {
                        if (buttonArray[i][j].className == "visited" || buttonArray[i][j].className == "path") {
                            buttonArray[i][j].className = " ";
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
        $("#AStar").click(function () {
            selectPathFindingAlgorithm = PathFindingAlgorithm.Astar;
            document.getElementById("VisualizePathFinding").textContent = 'Visualize (A*)';
        });
        $("#Dijkstra").click(function () {
            selectPathFindingAlgorithm = PathFindingAlgorithm.Dijkstra;
            document.getElementById("VisualizePathFinding").textContent = 'Visualize (Dijkstra)';
        });
        $("#GreedyBestFirst").click(function () {
            selectPathFindingAlgorithm = PathFindingAlgorithm.GreedyBestFirst;
            document.getElementById("VisualizePathFinding").textContent = 'Visualize (Greedy Best First)';
        });
        $("#FloodFill").click(function () {
            selectPathFindingAlgorithm = PathFindingAlgorithm.Floodfill;
            document.getElementById("VisualizePathFinding").textContent = 'Visualize (Flood Fill)';
        });
        $("#VisualizePathFinding").click(function () {
            VisualizePathfinding();
        });
        $("#PathfindingClearBoard").click(function () {
            ClearBoardPathFinding();
        });
        $("#PrimsAlgorithm").click(function () {
            if (!isAlgorithmRunning[0]) {
                ClearBoardPathFinding();
                const randomizedPrimsAlgorithm = new PrimsAlgorithm(buttonArray, wallList, startNode, targetNode, row, column, isAlgorithmRunning);
                isAlgorithmRunning[0] = true;
                randomizedPrimsAlgorithm.StartRandomizedPrims();
            }
        });
        $("#RecursiveDivision").click(function () {
            if (!isAlgorithmRunning[0]) {
                ClearBoardPathFinding();
                const recursiveDivision = new RecursiveDivision(buttonArray, wallList, startNode, targetNode, row, column, isAlgorithmRunning);
                isAlgorithmRunning[0] = true;
                recursiveDivision.StartRecursiveDivision();
            }
        });
        AddGrid();
    }
    if ($('#SortingBoard').length) {
        let SortingAlgorithm;
        (function (SortingAlgorithm) {
            SortingAlgorithm[SortingAlgorithm["None"] = 0] = "None";
            SortingAlgorithm[SortingAlgorithm["BubbleSort"] = 1] = "BubbleSort";
            SortingAlgorithm[SortingAlgorithm["QuickSort"] = 2] = "QuickSort";
            SortingAlgorithm[SortingAlgorithm["MergeSort"] = 3] = "MergeSort";
        })(SortingAlgorithm || (SortingAlgorithm = {}));
        let arrayElements = [];
        let canvas = document.getElementById("SortingBoard");
        let ctx = canvas.getContext("2d");
        let selectSortingAlgorithm = SortingAlgorithm.None;
        let slider = document.getElementById("Slider");
        function AddRandomRect(value) {
            canvas = document.getElementById("SortingBoard");
            ctx = canvas.getContext("2d");
            let canvasWrapperRect = document.getElementById("Canvas-Wrapper").getBoundingClientRect();
            canvas.width = canvasWrapperRect.width;
            arrayElements = [];
            let width = Math.round(canvas.width / value);
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
        function VisualizeSorting() {
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
                    let slider = document.getElementById("Slider");
                    slider.disabled = true;
                }
            }
        }
        $("#BubbleSort").click(function () {
            document.getElementById("VisualizeSorting").textContent = 'Visualize (Bubble Sort)';
            selectSortingAlgorithm = SortingAlgorithm.BubbleSort;
        });
        $("#QuickSort").click(function () {
            document.getElementById("VisualizeSorting").textContent = 'Visualize (Quick Sort)';
            selectSortingAlgorithm = SortingAlgorithm.QuickSort;
        });
        $("#VisualizeSorting").click(function () {
            VisualizeSorting();
        });
        $("#ResetArray").click(function () {
            if (!isAlgorithmRunning[0]) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                document.getElementById("SortingMessage").textContent = "Welcome to sorting visualizer! Please select an algorithm";
                AddRandomRect(slider.value);
            }
        });
        $("#Slider").on('input', function () {
            if (!isAlgorithmRunning[0]) {
                document.getElementById("ArraySize").innerHTML = slider.value.toString();
                ctx.clearRect(0, 0, 1000, 1000);
                AddRandomRect(slider.value);
            }
        });
        ctx.clearRect(0, 0, 1000, 1000);
        AddRandomRect(slider.value);
    }
    if ($('#SnakeBoard').length) {
        let snake = undefined;
        function PlaySnake() {
            let canvas = document.getElementById("SnakeBoard");
            let ctx = canvas.getContext("2d");
            let canvasWrapperRect = document.getElementById("Canvas-Wrapper").getBoundingClientRect();
            canvas.width = canvasWrapperRect.width;
            canvas.height = canvasWrapperRect.height;
            let gameWidth = canvas.width;
            let gameHeight = canvas.height;
            snake = new Snake(ctx, gameWidth, gameHeight, isAlgorithmRunning);
        }
        PlaySnake();
        document.getElementById("Play").onclick = function () {
            if (!isAlgorithmRunning[0]) {
                snake.Play();
            }
        };
        document.getElementById("Stop").onclick = function () {
            snake.Stop();
        };
        document.getElementById("Reset").onclick = function () {
            snake.Reset();
            if (!isAlgorithmRunning[0]) {
                snake.Play();
            }
        };
    }
});
//# sourceMappingURL=index.js.map