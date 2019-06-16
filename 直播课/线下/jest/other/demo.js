const obj = {
    data: {
        yideng: 'xxx'
    }
};
let json2ts = require("json2ts");
const jsonContent = JSON.stringify(obj);
let result = json2ts.convert(jsonContent);
json2ts.cover