const axios = require('axios');

interface Iresponse {
    data: {
        yideng: string,
    }
}

describe('node接口测试',()=>{
    if('接口测试',()=>{
        return axios.get().then((response:Iresponse)=>{})
        expect(response.data.yideng).toBe('xx');
    })
})