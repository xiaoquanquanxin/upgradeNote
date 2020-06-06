//  通知者
function Dep(){
    //  这个list管理任意一个data的key的全部被用到的位置。对于某个字段xxx来说，我有几个{{xxx}}，就要建立几个watcher，放到这个list中
    this.subs = [];
}

//  对于某个字段xxx，我有额外的需要被监听的地方
Dep.prototype.addSub = function (sub){
    this.subs.push(sub);
};
//  通知字段xxx下的所有人，更新watcher
Dep.prototype.notify = function (){
    // console.log(this.subs);
    this.subs.forEach(item => {
        item.update();
    });
};