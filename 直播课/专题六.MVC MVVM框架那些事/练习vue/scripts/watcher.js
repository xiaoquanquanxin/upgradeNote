let uid = 1;

function Watcher(vm, key, el, nodeType){
    Dep.target = this;
    this.uid = uid++;
    this.vm = vm;
    this.key = key;
    this.el = el;
    this.nodeType = nodeType;
    this.update();
    Dep.target = null;
}

Watcher.prototype = {
    get(){
        this.value = this.vm[this.key];
    },
    update(){
        this.get();
        //  赋值，先追加到nextTick的计数器里
        if (!Batcher.target) {
            Batcher.target = new Batcher();
        }
        Batcher.target.push(this);
    },
    setValue(){
        this.el[this.nodeType] = this.value;
    }
};