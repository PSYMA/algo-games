var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class BubbleSort {
    constructor(arr, ctx, isAlgorithmRunning) {
        this.ctx = undefined;
        this.arr = [];
        this.isAlgorithmRunning = new Array(1);
        this.arr = arr;
        this.ctx = ctx;
        this.isAlgorithmRunning = isAlgorithmRunning;
    }
    sleep(msec) {
        return __awaiter(this, void 0, void 0, function* () { return new Promise(resolve => setTimeout(resolve, msec)); });
    }
    BubbleSort() {
        return __awaiter(this, void 0, void 0, function* () {
            document.getElementById("SortingMessage").textContent = "Visualizing BubbleSort...";
            for (let i = 0; i < this.arr.length; i++) {
                for (let j = 0; j < this.arr.length; j++) {
                    if (this.arr[i].height < this.arr[j].height) {
                        yield this.sleep(0);
                        this.ctx.clearRect(this.arr[j].x, 0, this.arr[j].width, 1000);
                        this.ctx.clearRect(this.arr[i].x, 0, this.arr[i].width, 1000);
                        let tmp = this.arr[i].y;
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
            let slider = document.getElementById("Slider");
            slider.disabled = false;
            this.isAlgorithmRunning[0] = false;
            document.getElementById("SortingMessage").textContent = "Done sorting!";
        });
    }
    StartBubbleSort() {
        this.BubbleSort();
    }
}
//# sourceMappingURL=BubbleSort.js.map