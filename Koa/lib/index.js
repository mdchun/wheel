const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')
const compose = require('./compose')

class Koa {
	middleware = []

	listen(...args) {
		const server = http.createServer(async (req, res) => {
			// this.callback(req, res)
			const ctx = this.createContext(req, res)
			const fn = compose(this.middleware)
			await fn(ctx)
			// this.callback(ctx)
			res.end(ctx.body)
		})

		server.listen(...args)
	}
	// 注册中间件
	use(mid) {
		this.middleware.push(mid)
	}

	createContext(req, res) {
		const ctx = Object.create(context)
		ctx.request = Object.create(request)
		ctx.response = Object.create(response)

		ctx.req = ctx.request.req = req
		ctx.res = ctx.response.res = res
		return ctx
	}
}

module.exports = Koa
