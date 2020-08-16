var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class QuickSort {
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
    // recursion version
    Swap(items, leftIndex, rightIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            let item1 = items[leftIndex];
            let item2 = items[rightIndex];
            this.ctx.clearRect(item1.x, item1.y, item1.width, item1.height);
            this.ctx.clearRect(item2.x, item2.y, item2.width, item2.height);
            let temp = items[leftIndex].y;
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
        });
    }
    Partition(items, left, right) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    yield this.sleep(1);
                    this.Swap(items, i, j); //sawpping two elements
                    i++;
                    j--;
                }
            }
            return i;
        });
    }
    QuickSort(items, left, right) {
        return __awaiter(this, void 0, void 0, function* () {
            if (items.length > 1) {
                let index = yield this.Partition(items, left, right); //index returned from partition
                if (left < index - 1) { //more elements on the left side of the pivot
                    yield this.QuickSort(items, left, index - 1);
                }
                if (index < right) { //more elements on the right side of the pivot
                    yield this.QuickSort(items, index, right);
                }
            }
            return items;
        });
    }
    Finish() {
        let slider = document.getElementById("Slider");
        slider.disabled = false;
        this.isAlgorithmRunning[0] = false;
        document.getElementById("SortingMessage").textContent = "Done sorting!";
    }
    StartQuickSort() {
        return __awaiter(this, void 0, void 0, function* () {
            document.getElementById("SortingMessage").textContent = "Visualizing Quick Sort...";
            yield this.QuickSort(this.arr, 0, this.arr.length - 1);
            this.Finish();
        });
    }
}
//# sourceMappingURL=QuickSort.js.map