function observer(vm, data){
    Reflect.ownKeys(data).forEach(key => {
        setRelative(vm, key, data[key]);
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
            if (value === v) {
                return;
            }
            dep.notify();
            value = v;
        }
    });
}