export default class MergeSort {
    private ctx: CanvasRenderingContext2D = undefined;
    private arr: Array<Sorting.INode> = [];
    private isAlgorithmRunning = new Array<boolean>(1);
    constructor(arr: Array<Sorting.INode>, ctx: CanvasRenderingContext2D, isAlgorithmRunning: Array<boolean>) {
        this.arr = arr;
        this.ctx = ctx;
        this.isAlgorithmRunning = isAlgorithmRunning;
        let mergeArr = this.MergeSort(this.arr);
        console.log(mergeArr);

    }
    private async sleep(msec) { return new Promise(resolve => setTimeout(resolve, msec)); }
    private async MergeSort(arr: Array<Sorting.INode>) {
        if (arr.length <= 1) {
            return arr;
        }
        let mid = Math.floor(arr.length / 2);
        let mergeArr = this.Merge(await this.MergeSort(arr.slice(0, mid)), await this.MergeSort(arr.slice(mid)));        
        for (let i = 0; i < mergeArr.length; i++) {
            let item = mergeArr[i];
            await this.sleep(10);
            this.ctx.fillRect(item.x, item.y, item.width, item.height);
        }
        return mergeArr;
    }

    private Merge(left: Array<Sorting.INode>, right: Array<Sorting.INode>) {
        let mergeArr = [];
        let i = 0, j = 0;

        while (i < left.length && j < right.length) {
            let item = left[i];
            this.ctx.clearRect(item.x, item.y, item.width, item.height);
            item = right[j];
            this.ctx.clearRect(item.x, item.y, item.width, item.height);
            if (left[i].height < right[j].height) {
                mergeArr.push(left[i++]);
            } else {
                mergeArr.push(right[j++]);
            }
        }

        return mergeArr.concat(left.slice(i)).concat(right.slice(j));
    }
}