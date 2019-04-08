const Koa = require('koa');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
	await next();
	const rt = ctx.response.get('X-Response-Time');
	console.log(`${ctx.method} ${ctx.url} - ${rt}`);
	// console.log(2);
});

// x-response-time

app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
	// console.log(1);
});

// response
const KeyGrip = require('keygrip');
app.keys = new KeyGrip(['im a newer secret'], 'sha256');
// app.keys = ['im a newer secret'];
app.use(async ctx => {
	ctx.body = 'wsss';
	ctx.cookies.set('name', 'aaaaaa', {signed: true});
});

//  错误处理
app.on('error', err => {
	log.error('错误了', err)
});
app.listen(3000);
app.listen(3001);