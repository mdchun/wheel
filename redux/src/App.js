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
	}
}

const thunk = ({ dispatch, getState }) => dispatch => action => {
	if (typeof action === 'function') {
		// 将dispatch传入到action，在异步结束之后调用
		return action(dispatch, getState)
	}
	return dispatch(action)
}

const store = createStore(count, applyMiddleware(logger, thunk))

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
