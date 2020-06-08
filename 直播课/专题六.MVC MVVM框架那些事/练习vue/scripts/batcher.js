//  计数器
function Batcher(){
    this.reset();
}

Batcher.prototype = {
    reset(){
        this.list = [];
        this.map = {};
        this.isWatting = false;
    },
    push(w){
        if (this.map[w.uid]) {
            return;
        }
        this.map[w.uid] = 1;
        this.list.push(w);
        if (typeof Promise === 'function') {
            Promise.resolve().then(flushCallback);
        } else {
            setTimeout(flushCallback);
        }
    },
    flush(){
        if (this.isWatting) {
            return;
        }
        this.isWatting = true;
        this.list.forEach(item => {
            item.setValue();
        });
        this.reset();
    }
};

function flushCallback(){
    Batcher.target.flush();
}