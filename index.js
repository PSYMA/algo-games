import Snake from './Games/Snake.js';
import AStar from './Pathfinding/AStar.js';
import MergeSort from './Sorting/MergeSort.js';
import QuickSort from './Sorting/QuickSort.js';
import BubbleSort from './Sorting/BubbleSort.js';
import FloodFill from './Pathfinding/FloodFill.js';
import PrimsAlgorithm from './Maze/PrimsAlgorithm.js';
import RecursiveDivision from './Maze/RecursiveDivision.js';
import RecursiveBacktracker from './Maze/RecursiveBacktracker.js';
$(document).ready(function () {
    let turn = false;
    $("#ch").click(function () {
        if (!turn) {
            turn = true;
            $("#bar").css({ display: "none", visibility: "hidden" });
            $("#times").css({ display: "inline", visibility: "visible" });
        }
        else {
            turn = false;
            $("#times").css({ display: "none", visibility: "hidden" });
            $("#bar").css({ display: "inline", visibility: "visible" });
        }
    });
    let isAlgorithmRunning = new Array(1);
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
                    let table = $("#Grid").get(0);
                    for (let i = 0; i < row; i++) {
                        let tr = document.createElement("tr");
                        table.appendChild(tr);
                        for (let j = 0; j < column; j++) {
                            let td = document.createElement("td");
                            let btn = document.createElement("div");
                            td.setAttribute("style", "font-size: 0px; margin: auto; background: white; color: black; width: 1.3vw; height: 1.5vw");
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
                $("#PathFindingMessage").html("Welcome to Pathfinding Visualizer! please select an algorithm");
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
            $("#VisualizePathFinding").html("Visualize (A*)");
        });
        $("#Dijkstra").click(function () {
            selectPathFindingAlgorithm = PathFindingAlgorithm.Dijkstra;
            $("#VisualizePathFinding").html("Visualize (Dijkstra)");
        });
        $("#GreedyBestFirst").click(function () {
            selectPathFindingAlgorithm = PathFindingAlgorithm.GreedyBestFirst;
            $("#VisualizePathFinding").html("Visualize (Greedy Best First)");
        });
        $("#FloodFill").click(function () {
            selectPathFindingAlgorithm = PathFindingAlgorithm.Floodfill;
            $("#VisualizePathFinding").html("Visualize (Flood Fill)");
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
        $("#RecursiveBacktracker").click(function () {
            if (!isAlgorithmRunning[0]) {
                ClearBoardPathFinding();
                const recursiveBacktracker = new RecursiveBacktracker(buttonArray, wallList, startNode, targetNode, row, column, isAlgorithmRunning);
                isAlgorithmRunning[0] = true;
                recursiveBacktracker.StartRecursiveBacktracker();
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
        let canvas = $("#SortingBoard").get(0);
        let ctx = canvas.getContext("2d");
        let selectSortingAlgorithm = SortingAlgorithm.None;
        let slider = $("#Slider").get(0);
        function AddRandomRect(value) {
            let canvasWrapperRect = $("#Canvas-Wrapper").get(0).getBoundingClientRect();
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
                    $("#Slider").prop("disabled", true);
                }
            }
        }
        $("#BubbleSort").click(function () {
            $("#VisualizeSorting").html("Visualize (Bubble Sort)");
            selectSortingAlgorithm = SortingAlgorithm.BubbleSort;
        });
        $("#QuickSort").click(function () {
            $("#VisualizeSorting").html("Visualize (Quick Sort)");
            selectSortingAlgorithm = SortingAlgorithm.QuickSort;
        });
        $("#VisualizeSorting").click(function () {
            VisualizeSorting();
        });
        $("#ResetArray").click(function () {
            if (!isAlgorithmRunning[0]) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                $("#SortingMessage").html("Welcome to sorting visualizer! Please select an algorithm");
                AddRandomRect(slider.value);
            }
        });
        $("#Slider").on('input', function () {
            if (!isAlgorithmRunning[0]) {
                $("#ArraySize").html(slider.value.toString());
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
            let canvas = $("#SnakeBoard").get(0);
            let ctx = canvas.getContext("2d");
            let canvasWrapperRect = $("#Canvas-Wrapper").get(0).getBoundingClientRect();
            canvas.width = canvasWrapperRect.width;
            canvas.height = canvasWrapperRect.height;
            let gameWidth = canvas.width;
            let gameHeight = canvas.height;
            snake = new Snake(ctx, gameWidth, gameHeight, isAlgorithmRunning);
        }
        PlaySnake();
        $("#Play").click(function () {
            if (!isAlgorithmRunning[0]) {
                snake.Play();
            }
        });
        $("#Stop").click(function () {
            snake.Stop();
        });
        $("#Reset").click(function () {
            snake.Reset();
            if (!isAlgorithmRunning[0]) {
                snake.Play();
            }
        });
    }
});
//# sourceMappingURL=index.js.map