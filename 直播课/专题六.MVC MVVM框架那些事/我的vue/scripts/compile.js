function Compile(vm, el){
    if (!el) {
        throw new Error('错误');
    }
    return this.compileElement(vm, el);
}

Compile.prototype = {
    compileElement(vm, el){
        const df = document.createDocumentFragment();
        let child = el.firstChild;
        while (child) {
            this.compileAttribute(vm, child);
            df.appendChild(child);
            child = el.firstChild;
        }
        return df;
    },
    compileAttribute(vm, el){
        switch (el.nodeType) {
            case 1:
                if (el.hasAttribute('v-model')) {
                    const key = el.attributes['v-model'].value;
                    el.addEventListener('input', (e) => {
                        vm[key] = e.target.value;
                    });
                    new Watcher(vm, key, el, 'value');
                }
                break;
            case 3:
                const reg = /\{\{(.*)\}\}/;
                if (reg.test(el.nodeValue)) {
                    const key = RegExp.$1;
                    new Watcher(vm, key, el, 'nodeValue');
                }
                break;
        }
    }

};