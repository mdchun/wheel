import React, { Component } from 'react'
import { createStore, applyMiddleware } from './redux'

function count(state = 0, action) {
	switch (action.type) {
		case 'add':
			return state + 1
		default:
			return state
	}
}

function logger({ dispatch, getState }) {
	return dispatch => action => {
		console.log(action)
		// 下一个中间件
		return dispatch(action)
		// return dispatch
	}
}

const store = createStore(count, applyMiddleware(logger))

export default class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			count: store.getState()
		}

		store.subscribe(_ => {
			this.setState({
				count: store.getState()
			})
		})
	}
	render() {
		return (
			<div>
				{this.state.count}
				<button
					onClick={_ => {
						store.dispatch({
							type: 'add'
						})
					}}
				>
					+
				</button>
			</div>
		)
	}
}
