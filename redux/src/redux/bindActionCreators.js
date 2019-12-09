function bindActionCreator(actionCreator, dispatch) {
	return (...args) => {
		return dispatch(actionCreator.apply(this, args))
	}
}
export default function bindActionCreators(actionCreators, dispatch) {
	if (typeof actionCreators === 'function') {
		return combineReducers(actionCreators, dispatch)
	}

	const ret = {}
	for (const key in actionCreators) {
		const actionCreator = actionCreators[key]

		if (typeof actionCreator === 'function') {
			ret[key] = bindActionCreator(actionCreators, dispatch)
		}
	}

	return ret
}
