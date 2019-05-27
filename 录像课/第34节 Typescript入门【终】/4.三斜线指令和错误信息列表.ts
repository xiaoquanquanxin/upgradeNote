//  三个斜线的指令,比注释多一各/,是包含单个xml标签的单个注释
//  仅可以放在文件的最顶端
//  一个指令前面只能出现单行或多行注释
//  如果在语句的后面,会变成普通的注释

(() => {
    class Student {
        fullName: string;

        constructor(public a, public b, public c) {
            this.fullName = a + " " + b + " " + c;
        }
    }

    interface Person {
        firstName: string;
        lastName: string;
    }

    function greeter(person: Person) {
        return "Hello, " + person.firstName + " " + person.lastName;
    }

    let user = new Student("Jane", "M.", "User");
    console.log(user)
})();