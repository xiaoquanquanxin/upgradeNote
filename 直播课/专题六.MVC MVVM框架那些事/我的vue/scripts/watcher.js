let uuid = 1;

function Watcher(vm, key, el, nodeValue){
    Dep.target = this;
    this.uuid = uuid++;
    this.el = el;
    this.vm = vm;
    this.key = key;
    this.nodeValue = nodeValue;
    this.update();
    Dep.target = null;
}

Watcher.prototype = {
    update(){
        this.get();
        this.el[this.nodeValue] = this.value;
    },
    get(){
        this.value = this.vm[this.key];
    }
};