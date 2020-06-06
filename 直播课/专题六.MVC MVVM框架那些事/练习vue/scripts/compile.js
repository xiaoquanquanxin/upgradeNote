function Compile(vm, el){
    this.fb = this.compileElement(vm, el);
}

Compile.prototype = {
    compileElement(vm, el){
        const fb = document.createDocumentFragment();
        let child = el.firstChild;
        while (child) {
            this.compileAttribute(vm, child);
            fb.appendChild(child);
            child = el.firstChild;
        }
        return fb
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