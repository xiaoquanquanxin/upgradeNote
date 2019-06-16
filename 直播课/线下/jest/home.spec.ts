import {sum} from "./home";

describe('函数单元测试', () => {
    test('函数测试基础', () => {
        expect(sum(1, 3).toBe(4))
    })
});
