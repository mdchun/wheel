import React from 'react'
import { createBrowserHistory } from 'history'
import RouterContext from './Context'

export default class Router extends React.Component {
	constructor(props) {
		super(props)

		// 这里这样扩展性更高
		this.history = this.props.history || createBrowserHistory(this.props)

		this.state = {
			location: this.history.location
		}

		this.unlisten = this.history.listen(location => {
			if (this._isMounted) {
				this.setState({
					location
				})
			}
		})
	}

	componentDidMount() {
		this._isMounted = true
	}

	componentWillUnmount() {
		this.unlisten && this.unlisten()
	}

	render() {
		return (
			<RouterContext.Provider
				children={this.props.children || null}
				value={{
					history: this.history,
					location: this.state.location
				}}
			/>
		)
	}
}
