import React, { Component } from 'react'
import { createHashHistory } from 'history'
import Router from './Router'

export default class HashRouter extends Component {
	history = createHashHistory(this.props)

	render() {
		return <Router history={this.history} {...this.props} />
	}
}
