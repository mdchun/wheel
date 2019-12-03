import React, { Component } from 'react'
import { createBrowserHistory } from 'history'
import Router from './Router'

export default class BrowserRouter extends Component {
	history = createBrowserHistory(this.props)

	render() {
		return <Router history={this.history} {...this.props} />
	}
}
