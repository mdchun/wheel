function combineReducers(reducers) {
	return (state = {}, action) => {
		return Object.keys(reducers).reduce((nextState, key) => {
			nextState[key] = reducers[key](state, action)
			return nextState
		}, {})
	}
}

export default combineReducers
