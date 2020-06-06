function MVVM(options){
    const data = options.data;
    this.data = data;
    observer(this, data);
    const el = document.getElementById(options.el);
    const dom = new Compile(this, el).$frag;
    el.appendChild(dom);
}
