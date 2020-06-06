function Dep(){
    this.list = [];
}

Dep.prototype = {
    addItem(item){
        this.list.push(item);
    },
    notify(){
        this.list.forEach(item => {
            item.update()
        });
    }
};