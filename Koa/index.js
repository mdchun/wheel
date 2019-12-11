const Koa = require('./lib')
const app = new Koa()

app.use((req, res) => {
	res.writeHead(200)
	res.end('hello koa~~')
})

app.listen(3001, _ => {
	console.log(`监听3001端口`)
})
