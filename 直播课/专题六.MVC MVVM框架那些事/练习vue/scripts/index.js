function Vue(options){
    const data = options.data;
    this.data = data;
    observer(this, data);
    const el = document.getElementById(options.el);
    const fb = new Compile(this, el).fb;
    el.appendChild(fb);
}