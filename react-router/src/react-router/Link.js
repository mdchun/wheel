/** Link
 *
 */
import React, { Component } from 'react'
import RouterContext from './Context'

export default class Link extends Component {
	clickHandler = (ctx, ev) => {
		ev.preventDefault()

		const { to } = this.props
		ctx.history.push(to)
	}

	render() {
		const { to, children, ...rest } = this.props
		return (
			<RouterContext.Consumer>
				{context => {
					return (
						<a
							{...rest}
							href={to}
							onClick={this.clickHandler.bind(this, context)}
						>
							{children}
						</a>
					)
				}}
			</RouterContext.Consumer>
		)
	}
}
