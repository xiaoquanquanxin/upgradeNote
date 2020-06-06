let uuid = 1;

function Watcher(vm, key, el, nodeType){
    Dep.target = this;
    this.uuid++;
    this.vm = vm;
    this.key = key;
    this.el = el;
    this.nodeType = nodeType;
    this.value = null;
    this.update();
    Dep.target = null;
}

Watcher.prototype = {
    update(){
        this.get();
        this.el[this.nodeType] = this.value;
    },
    get(){
        this.value = this.vm[this.key];
    }
};
