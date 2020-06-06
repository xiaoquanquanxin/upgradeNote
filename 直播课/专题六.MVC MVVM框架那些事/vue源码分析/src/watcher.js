let uid = 0;

function Watcher(vm, node, name, type){
    Dep.target = this;
    this.id = ++uid;
    this.name = name;
    this.node = node;
    this.vm = vm;
    //  'nodeValue'
    this.type = type;
    this.update();
    //  保证每次只更新一个
    Dep.target = null;
}

const wp = Watcher.prototype;

let batcher;
//  更新watcher
wp.update = function (){
    //  取值
    this.get();
    if (!batcher) {
        batcher = new Batcher();
    }
    batcher.push(this);
};
//  赋值
wp.setValue = function (){
    console.log(`执行赋值，${new Date().toLocaleString()}`);
    this.node[this.type] = this.value;
};
//  观察者，这个get，get的是很早以前observe里的值。会触发observe里的defineProperty
//  实际的含义：将vue绑定的xxx字段的值，赋值给这个watcher
wp.get = function (){
    this.value = this.vm[this.name];
};
