export default class QuickSort {
    private ctx: CanvasRenderingContext2D = undefined;
    private arr: Array<Sorting.INode> = [];
    private isAlgorithmRunning = new Array<boolean>(1);
    constructor(arr: Array<Sorting.INode>, ctx: CanvasRenderingContext2D, isAlgorithmRunning: Array<boolean>) {
        this.arr = arr;
        this.ctx = ctx;
        this.isAlgorithmRunning = isAlgorithmRunning;
    }
    private async sleep(msec) { return new Promise(resolve => setTimeout(resolve, msec)); }

    // recursion version
    private async Swap(items: Array<Sorting.INode>, leftIndex: number, rightIndex: number) {
        let item1 = items[leftIndex];
        let item2 = items[rightIndex];

        this.ctx.clearRect(item1.x, item1.y, item1.width, item1.height);
        this.ctx.clearRect(item2.x, item2.y, item2.width, item2.height);

        let temp: any = items[leftIndex].y;
        items[leftIndex].y = items[rightIndex].y;
        items[rightIndex].y = temp;

        temp = items[leftIndex].height;
        items[leftIndex].height = items[rightIndex].height;
        items[rightIndex].height = temp;

        temp = items[leftIndex].rgb;
        items[leftIndex].rgb = items[rightIndex].rgb;
        items[rightIndex].rgb = temp;


        this.ctx.fillStyle = item2.rgb;
        this.ctx.fillRect(item1.x, item1.y, item1.width, item1.height);
        this.ctx.fillStyle = item1.rgb;
        this.ctx.fillRect(item2.x, item2.y, item2.width, item2.height);
    }
    private async Partition(items: Array<Sorting.INode>, left: number, right: number) {

        let pivot = items[Math.floor((right + left) / 2)].height, //middle element
            i = left, //left pointer
            j = right; //right pointer
        while (i <= j) {
            while (items[i].height < pivot) {
                i++;
            }
            while (items[j].height > pivot) {
                j--;
            }
            if (i <= j) {
                await this.sleep(1);
                this.Swap(items, i, j); //sawpping two elements
                i++;
                j--;
            }
        }

        return i;
    }
    private async QuickSort(items: Array<Sorting.INode>, left: number, right: number) {
        if (items.length > 1) {
            let index = await this.Partition(items, left, right); //index returned from partition
            if (left < index - 1) { //more elements on the left side of the pivot
                await this.QuickSort(items, left, index - 1);
            }
            if (index < right) { //more elements on the right side of the pivot
                await this.QuickSort(items, index, right);
            }
        }
        return items;
    }
    private Finish() {
        let slider: any = document.getElementById("Slider");
        slider.disabled = false;
        this.isAlgorithmRunning[0] = false;
        document.getElementById("SortingMessage").textContent = "Done sorting!";
    }
    public async StartQuickSort() {
        document.getElementById("SortingMessage").textContent = "Visualizing Quick Sort...";
        await this.QuickSort(this.arr, 0, this.arr.length - 1);
        this.Finish();
    }
}