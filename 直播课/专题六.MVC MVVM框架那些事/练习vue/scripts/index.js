function Vue(options){
    const el = document.getElementById(options.el);
    const data = options.data;
    observer(this, data);
    const fb = new Compile(this, el).fb;
    el.appendChild(fb);
}