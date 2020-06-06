function observer(vm, data){
    Reflect.ownKeys(data).forEach(item => {
        setRelative(vm, item, data[item]);
    });
}

function setRelative(vm, key, value){
    const dep = new Dep();
    Object.defineProperty(vm, key, {
        get(){
            if (Dep.target) {
                dep.addItem(Dep.target);
            }
            return value;
        },
        set(v){
            value = v;
            dep.notify();
        }
    });
}