const express = require('express');
//  爬虫需要
const request = require('request');
//  对返回的html转换成想要的东西
const cheerio = require('cheerio');


const app = new express();


// const href = 'https://baike.baidu.com/item/' + a + '/1989503?fromtitle=%E8%A9%B9%E5%A7%86%E6%96%AF&fromid=14189565&fr=aladdin';
function getHref(reqPath) {
	return `https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=${reqPath}&oq=%25E8%25A9%25B9%25E5%25A7%2586%25E6%2596%25AF&rsv_pq=b2f74bbf0002e7b9&rsv_t=0be4iWwwz14uRVcfsxE0u2aIU90iWsmjlvY5hcChsJxZHaBN7caevX5RpJQ&rqlang=cn&rsv_enter=0`;
}

app.get('*', function (req, res) {
	const index = req.params[0].substr(1);
	if (index === 'undefined') {
		return
	}
	// console.log('gethref:::::' + getHref(reqPath));
	request('https://nba.hupu.com/stats/players', function (error, response, body) {
		if (error) {
			return
		}
		if (response && response.statusCode === 200) {
			$ = cheerio.load(body);
			// console.log($('.players_table').find('tbody>tr').eq(index).html());
			const tds = $('.players_table').find('tbody>tr').eq(index).find('td');
			const hupuSportName = tds.eq(1).html();
			const hupuSportHref = tds.eq(2).html();
			const hupuSportPoints = tds.eq(3).html();
			console.log(hupuSportName, hupuSportHref);
			res.send(`<h1>NBA球星得分榜</h1><br>姓名：${hupuSportName}  球队：${hupuSportHref}  分数：${hupuSportPoints} `);
		}
	});
});
app.listen(3000, () => console.log('已启动'));