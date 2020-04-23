function fn(a: string): string;
function fn(a: number): number;
function fn(a) {
    switch (typeof a) {
        case "string":
            return a;
        case "number":
            return a;
        default:
            throw new Error('错误的a');
    }
}