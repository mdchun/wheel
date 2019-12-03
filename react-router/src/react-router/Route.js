import React from 'react'
import matchPath from './matchPath'
import RouterContext from './Context'

export default class Route extends React.Component {
	render() {
		return (
			<RouterContext.Consumer>
				{context => {
					const location = context.location
					const match = matchPath(location.pathname, this.props)

					const props = { ...context, match }

					let { children, component, render } = this.props
					if (children) {
						children = children(props)
					}
					return (
						<RouterContext.Provider value={props}>
							{children && React.Children.count(children) > 0
								? children
								: props.match
								? component
									? React.createElement(component, props)
									: render
									? render(props)
									: null
								: null}
						</RouterContext.Provider>
					)
				}}
			</RouterContext.Consumer>
		)
	}
}
