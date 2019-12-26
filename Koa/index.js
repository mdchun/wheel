const Koa = require('./lib')
const app = new Koa()

function delay() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve()
		}, 1000)
	})
}

app.use(async (ctx, next) => {
	ctx.body = '1'
	setTimeout(() => {
		ctx.body += '2'
	}, 2000)
	await next()
	ctx.body += '3'
})

app.use(async (ctx, next) => {
	ctx.body += '4'
	await delay()
	await next()
	ctx.body += '5'
})

app.use(async (ctx, next) => {
	ctx.body += '6'
})

// 14653
app.listen(3001, _ => {
	console.log(`监听3001端口`)
})
