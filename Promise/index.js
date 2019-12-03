;(function() {
	// 声明状态
	let STATUS = {
		pending: 0,
		fulfilled: 1,
		rejected: 2
	}

	class MyPromise {
		constructor(executor) {
			// 初始化状态为pending
			this._status = STATUS.pending
			// 值
			this._value = null
			// 错误信息
			this._error = null

			this._fulfilledArr = []
			this._rejectedArr = []
			this._handler(executor)
		}

		static all(list) {
			let ret = []
			return new MyPromise((resolve, reject) => {
				list.forEach((p, index) => {
					this.resolve(p).then(
						data => {
							ret[index] = data

							if (ret.length === list.length) {
								resolve(ret)
							}
						},
						error => {
							reject(error)
						}
					)
				})
			})
		}

		static race(list) {
			return new MyPromise((resolve, reject) => {
				for (let p of list) {
					this.resolve(p).then(
						ret => {
							resolve(ret)
						},
						err => {
							reject(err)
						}
					)
				}
			})
		}

		static resolve(value) {
			if (value instanceof MyPromise) {
				return value
			}

			return new MyPromise((resolve, reject) => resolve(value))
		}

		static reject(error) {
			return new MyPromise((resolve, reject) => reject(error))
		}

		_handler(executor) {
			// 接受两个函数
			// 让函数只执行一次，就是承诺，不可逆修改
			let done = false
			executor(
				value => {
					if (done) {
						return
					}
					done = true
					// resolve
					let then = this._getThen(value)
					if (then) {
						// 拿到对象的then之后，怎么知道这个promise对象完成了呢
						// 在then上注册成功和失败函数就可以
						return this._handler(then.bind(value))
					}

					this._resolve(value)
				},
				error => {
					// reject
					if (done) {
						return
					}
					done = true

					let then = this._getThen(error)
					if (then) {
						return this._handler(then.bind(error))
					}

					this._reject(error)
				}
			)
		}

		_getThen(value) {
			let type = typeof value
			if (value && (type === 'object' || type === 'function')) {
				let then
				if ((then = value.then)) {
					return then
				}
			}
			return null
		}

		_resolve(value) {
			// 模拟异步
			setTimeout(() => {
				// 修改状态为成功
				this._status = STATUS.fulfilled
				// 保持值
				this._value = value
				// 批量调用then的回调
				this._fulfilledArr.forEach(f => f(value))
			})
		}

		_reject(error) {
			// 模拟异步
			setTimeout(() => {
				// 修改状态为成功
				this._status = STATUS.rejected
				// 保持值
				this._error = error
				// 批量调用then的回调
				this._rejectedArr.forEach(f => f(error))
			})
		}

		_done(resolvedFunc, rejectedFunc) {
			// 搜集then里的回调函数
			resolvedFunc = typeof resolvedFunc === 'function' ? resolvedFunc : null
			rejectedFunc = typeof rejectedFunc === 'function' ? rejectedFunc : null
			// 在pending状态下搜集
			if (this._status === 0) {
				resolvedFunc && this._fulfilledArr.push(resolvedFunc)
				rejectedFunc && this._rejectedArr.push(rejectedFunc)
			} else if (this._status === 1) {
				// 直接执行，因为有可能是在事件或者其他地方调用p.then(...)
				resolvedFunc && resolvedFunc(this._value)
			} else if (this._status === 2) {
				rejectedFunc && rejectedFunc(this._error)
			}
		}

		then(resolvedFunc, rejectedFunc) {
			// this._done(resolvedFunc, rejectedFunc)
			// 以下方式支持链式调用
			return new MyPromise((resolve, reject) => {
				this._done(
					value => {
						// 这里要判断是不是一个函数，比如p.then(1).then(...)
						if (typeof resolvedFunc !== 'function') {
							resolve(value)
						}
						resolvedFunc && resolve(resolvedFunc(value))
					},
					error => {
						if (typeof rejectedFunc !== 'function') {
							reject(error)
						}
						rejectedFunc && reject(rejectedFunc(error))
					}
				)
			})
		}

		catch(onRejected) {
			return this.then(null, onRejected)
		}

		finally(cb) {
			return this.then(
				value => MyPromise.resolve(cb()).then(_ => value),
				error =>
					MyPromise.resolve(cb()).then(_ => {
						throw err
					})
			)
		}
	}

	window.MyPromise = MyPromise
})()
