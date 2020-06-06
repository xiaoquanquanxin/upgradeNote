//  建立观察者
function observer(vm, data){
    //  每一个对象的key，都要建立依赖关系
    Reflect.ownKeys(data).forEach(key => {
        defineRelative(vm, key, data[key]);
    });
}

//  对data里的key，建立依赖关系
//  ❓❓❓ dep -> Dep.target = Watcher的实例
function defineRelative(vm, key, value){
    //  发布者
    const dep = new Dep;
    //  被观察的值，key是data里的key
    Object.defineProperty(vm, key, {
        get(){
            //  Dep.target = Watcher的实例     ✅✅✅，
            //  这个很重要   ☢️️️☢️️️☢️️️    因为他只在建立watcher的时候用，保证每个key都【只】建立唯一一个watcher
            if (Dep.target) {
                dep.addSub(Dep.target);
            }
            return value;
        },
        set(v){
            if (value === v) {
                return;
            }
            value = v;
            // console.log(value);
            //  通知，
            dep.notify();
        }
    });
}
