import React, { Component } from 'react'
import RouterContext from './Context'
import matchPath from './matchPath'

export default class Switch extends Component {
	render() {
		return (
			<RouterContext.Consumer>
				{ctx => {
					const location = ctx.location
					let comp
					let match = null

					React.Children.forEach(this.props.children, child => {
						if (match === null && React.isValidElement(child)) {
							comp = child

							const path = child.props.path || child.props.from

							match = path
								? matchPath(location.pathname, { ...child.props, path })
								: ctx.match
						}
					})

					return match
						? React.cloneElement(comp, {
								location,
								computedMatch: match
						  })
						: null
				}}
			</RouterContext.Consumer>
		)
	}
}
