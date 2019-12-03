function createStore(reducer, enhancer) {
	let state
	let currentReducer = reducer
	let listeners = []

	function getState() {
		return state
	}

	function subscribe(handler) {
		listeners.push(handler)

		return function unsubscribe() {
			listeners = listeners.filter(l => l != handler)
		}
	}

	const dispatch = action => {
		state = currentReducer(state, action)

		listeners.forEach(l => l())

		// 这里后面扩展会有用，如，中间件
		return action
	}

	const replaceReducer = newReducer => {
		currentReducer = newReducer

		dispatch({
			type: '@@REDUX/REPLACE'
		})
	}

	// init
	dispatch({
		type: '@@REDUX/INIT'
	})

	return {
		getState,
		dispatch,
		replaceReducer,
		subscribe
	}
}

export default createStore
