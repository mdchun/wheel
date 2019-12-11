const http = require('http')

class Koa {
	listen(...args) {
		const server = http.createServer((req, res) => {
			this.callback(req, res)
		})

		server.listen(...args)
	}
	// 注册中间件
	use(callback) {
		this.callback = callback
	}
}

module.exports = Koa
