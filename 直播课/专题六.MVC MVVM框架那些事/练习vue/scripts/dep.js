function Dep(){
    this.list = [];
}

Dep.prototype = {
    add(item){
        this.list.push(item);
    },
    notify(){
        this.list.forEach(item => {
            item.update();
        });
    }
};