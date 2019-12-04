import compose from './compose'

function applyMiddleware(...middlewares) {
	return createStore => (...args) => {
		const store = createStore(...args)

		let dispatch = store.dispatch

		const middleAPI = {
			getState: store.getState,
			dispatch: (...args) => dispatch(...args)
		}

		// 中间件传入扩展参数
		const chain = middlewares.map(mid => mid(middleAPI))
		// 强化dispatch
		dispatch = compose(...chain)(store.dispatch)

		return {
			...store,
			dispatch
		}
	}
}

export default applyMiddleware
