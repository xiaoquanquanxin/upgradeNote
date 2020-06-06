//  批处理
function Batcher(){
    this.reset();
}

Batcher.prototype = {
    //  重置
    reset(){
        this.has = {};
        this.queue = [];
        this.watting = false;
    },
    /**
     * @param w {Watcher}
     * */
    push(w){
        let id = w.id;
        //  如果没有这个任务
        if (!this.has[id]) {
            this.queue.push(w);
            this.has[id] = true;
            //  如果不等待
            if (!this.watting) {
                this.watting = true;
                if (typeof Promise) {
                    Promise.resolve().then(v => {
                        this.flush();
                    });
                } else {
                    setTimeout(() => {
                        this.flush();
                    }, 0);
                }
            }
        }
    },
    flush(){
        this.queue.forEach(w => {
            w.setValue();
        });
        this.reset();
    }
};

