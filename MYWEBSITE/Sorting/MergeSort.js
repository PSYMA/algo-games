var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class MergeSort {
    constructor(arr, ctx, isAlgorithmRunning) {
        this.ctx = undefined;
        this.arr = [];
        this.isAlgorithmRunning = new Array(1);
        this.arr = arr;
        this.ctx = ctx;
        this.isAlgorithmRunning = isAlgorithmRunning;
        let mergeArr = this.MergeSort(this.arr);
        console.log(mergeArr);
    }
    sleep(msec) {
        return __awaiter(this, void 0, void 0, function* () { return new Promise(resolve => setTimeout(resolve, msec)); });
    }
    MergeSort(arr) {
        return __awaiter(this, void 0, void 0, function* () {
            if (arr.length <= 1) {
                return arr;
            }
            let mid = Math.floor(arr.length / 2);
            let mergeArr = this.Merge(yield this.MergeSort(arr.slice(0, mid)), yield this.MergeSort(arr.slice(mid)));
            for (let i = 0; i < mergeArr.length; i++) {
                let item = mergeArr[i];
                yield this.sleep(10);
                this.ctx.fillRect(item.x, item.y, item.width, item.height);
            }
            return mergeArr;
        });
    }
    Merge(left, right) {
        let mergeArr = [];
        let i = 0, j = 0;
        while (i < left.length && j < right.length) {
            let item = left[i];
            this.ctx.clearRect(item.x, item.y, item.width, item.height);
            item = right[j];
            this.ctx.clearRect(item.x, item.y, item.width, item.height);
            if (left[i].height < right[j].height) {
                mergeArr.push(left[i++]);
            }
            else {
                mergeArr.push(right[j++]);
            }
        }
        return mergeArr.concat(left.slice(i)).concat(right.slice(j));
    }
}
//# sourceMappingURL=MergeSort.js.map