function Dep(){
    this.list = [];
}

Dep.prototype = {
    notify(){
        this.list.forEach(item => {
            item.update();
        });
    },
    addItem(item){
        this.list.push(item);
    }
};