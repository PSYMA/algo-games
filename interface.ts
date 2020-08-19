namespace Sorting {
    export interface INode {
        x: number,
        y: number,
        rgb: string,
        width: number,
        height: number
    }
}
namespace Pathfinding {
    export interface INode {
        gScore: number,
        hScore: number,
        fScore: number,
        parent: HTMLTableDataCellElement,
        current: HTMLTableDataCellElement
    }
}

namespace Game{
    export interface SnakeNode{
        x : number,
        y : number,
        width : number,
        height : number
    }
}