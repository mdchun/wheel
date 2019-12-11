import React, { Component } from 'react'
import { connect, Provider } from './react-redux'
import { createStore } from './redux'
import Test from './Test'

function count(state = 0, action) {
	switch (action.type) {
		case 'add':
			return state + 1
		default:
			return state
	}
}

const store = createStore(count)

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Test />
			</Provider>
		)
	}
}
