namespace Sorting {
    export interface IProps {
        x: number,
        y: number,
        rgb: string,
        width: number,
        height: number
    }
}
namespace Pathfinding {
    export interface IProps {
        gScore: number,
        hScore: number,
        fScore: number,
        parent: HTMLTableDataCellElement,
        current: HTMLTableDataCellElement
    }
}

namespace Game{
    export interface ISnakeProps{
        x : number,
        y : number,
        width : number,
        height : number
    }
}

