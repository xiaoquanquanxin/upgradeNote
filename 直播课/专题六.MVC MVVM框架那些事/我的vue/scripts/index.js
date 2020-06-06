function MVVM(options){
    const data = options.data;
    const el = document.getElementById(options.el);
    this.data = data;
    observer(this, data);
    const dom = new Compile(this,el);
    el.appendChild(dom);
}