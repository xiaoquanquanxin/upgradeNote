function observer(vm, data){
    Reflect.ownKeys(data).forEach(key => {
        setRelative(vm, key, data[key]);
    });
}

function setRelative(vm, key, value){
    const dep = new Dep();
    Object.defineProperty(vm, key, {
        set(v){
            value = v;
            dep.notify();
        },
        get(){
            if (Dep.target) {
                dep.add(Dep.target);
            }
            return value;
        }
    });
}