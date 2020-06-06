//  编译  抗派欧
function Compile(vm, node){
    if (node) {
        this.$frag = this.nodeToFragment(vm, node);
        return this;
    }
    throw new Error('没有dom?');
}

//  搬运节点
Compile.prototype.nodeToFragment = function (vm, node){
    const fragment = document.createDocumentFragment();
    let child = node.firstChild;
    while (child) {
        fragment.appendChild(child);
        this.compileElement(vm, child);
        child = node.firstChild;
    }
    return fragment;
};
//  编译节点
Compile.prototype.compileElement = function (vm, node){
    switch (node.nodeType) {
        case 1: //  元素节点
            if (node.hasAttribute('v-model')) {
                // console.log('input')
                //  text
                const name = node.attributes['v-model'].nodeValue;
                node.addEventListener('input', function (e){
                    vm[name] = e.target.value;
                });
                new Watcher(vm, node, name, 'value');
            }
            break;
        case 3: //  文本节点
            const reg = /\{\{(.*)\}\}/;
            if (!reg.test(node.nodeValue)) {
                return;
            }
            const name = RegExp.$1.trim();
            //  在编辑element的过程中创建watcher
            new Watcher(vm, node, name, 'nodeValue');
            break;
        default:
            return;
    }
    // console.log(vm, node);
};