class Hello {
    private _name:string;

    tell() {
        return this.name;
    }

    get name():string {
        return this._name;
    }

    set name(newName:string):string {
        return this._name = newName;
    }
}
let hello = new Hello();
