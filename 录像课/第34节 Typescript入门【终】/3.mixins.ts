//  mix
//  ins
//  对象继承的一种替代方案，混合进入
(()=> {

    class Apple {
        isDisposed:boolean;

        dispose() {
            this.isDisposed = true;
        }
    }
    class Peach {
        isActive:boolean;

        activate() {
            this.isActive = true;
        }
    }

    class SmartClass implements Apple,Peach {
        isDisposed:boolean;
        isActive:boolean;
        activate:()=>void;
        dispose:()=>void;

        constructor() {

        }

        run() {
            setInterval(()=> {
                console.log(this)
                console.log('p?' + this.isActive + 'a?' + this.isDisposed);
            }, 3333);
        }

        interact() {
            console.log('starting change');
            this.activate();
        }
    }
    function applyMixins(derivedCtor:any, baseCtors:any[]) {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
            });
        });
    }

    applyMixins(SmartClass, [Apple, Peach]);
    let s = new SmartClass();
    console.log(s);
    s.dispose();
    s.run();
})();











