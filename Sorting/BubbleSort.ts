export default class BubbleSort {
    private ctx: CanvasRenderingContext2D = undefined;
    private arr: Array<Sorting.INode> = [];
    private isAlgorithmRunning = new Array<boolean>(1);
    constructor(arr: Array<Sorting.INode>, ctx: CanvasRenderingContext2D, isAlgorithmRunning: Array<boolean>) {
        this.arr = arr;
        this.ctx = ctx;
        this.isAlgorithmRunning = isAlgorithmRunning;
    }
    private async sleep(msec: number) { return new Promise(resolve => setTimeout(resolve, msec)); }
    private async BubbleSort() {
        document.getElementById("SortingMessage").textContent = "Visualizing BubbleSort...";
        for (let i = 0; i < this.arr.length; i++) {
            for (let j = 0; j < this.arr.length; j++) {
                if (this.arr[i].height < this.arr[j].height) {
                    await this.sleep(0);
                    this.ctx.clearRect(this.arr[j].x, this.arr[j].y, this.arr[j].width, this.arr[j].height);
                    this.ctx.clearRect(this.arr[i].x, this.arr[i].y, this.arr[i].width, this.arr[i].height);

                    let tmp: any = this.arr[i].y;
                    this.arr[i].y = this.arr[j].y;
                    this.arr[j].y = tmp;

                    tmp = this.arr[i].height;
                    this.arr[i].height = this.arr[j].height;
                    this.arr[j].height = tmp;


                    tmp = this.arr[i].rgb;
                    this.arr[i].rgb = this.arr[j].rgb;
                    this.arr[j].rgb = tmp;

                    this.ctx.fillStyle = this.arr[j].rgb;
                    this.ctx.fillRect(this.arr[j].x, this.arr[j].y, this.arr[j].width, this.arr[j].height);
                    this.ctx.fillStyle = this.arr[i].rgb;
                    this.ctx.fillRect(this.arr[i].x, this.arr[i].y, this.arr[i].width, this.arr[i].height);
                }
            }
        }
        let slider: any = document.getElementById("Slider");
        slider.disabled = false;
        this.isAlgorithmRunning[0] = false;
 
        document.getElementById("SortingMessage").textContent = "Done sorting!";
    }
    public StartBubbleSort() {
        this.BubbleSort();
    }
}
