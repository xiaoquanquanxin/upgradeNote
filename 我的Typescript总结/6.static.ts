(() => {
    class P {
        name: string;
        static sName: string;

        constructor(name = '权鑫') {
            this.name = name;
        }

        sayName(): string {
            return this.name;
        }
    }

    class S extends P {
        static sName: string;

        constructor() {
            super('21');

        }
    }

    const p = new P();
    console.log(p.name);
    console.log(P.sName);
    const s = new S();
    console.log(s);
    console.log(S.sName);
})();
