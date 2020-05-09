(() => {
    class Hello {
        private _name: string;

        //
        get name(): string {
            return this._name;
        }

        set name(name: string) {
            this._name = name;
        }
    }

    const h = new Hello();
    h.name = '权鑫';
    console.log(h);
    console.log(h.name);
    // console.log(h._name);
})();
