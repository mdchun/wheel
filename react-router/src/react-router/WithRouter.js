import React, { Component } from 'react'
import RouterContext from './Context'

/**
 * hoc
 *
 * @param {组件} Compt
 * @returns Compt
 */
function WithRouter(Compt) {
	return class extends Component {
		render() {
			return (
				<RouterContext.Consumer>
					{ctx => {
						// 讲ctx传给comp，以及人家本身的props
						return <Compt {...ctx} {...this.props} />
					}}
				</RouterContext.Consumer>
			)
		}
	}
}

export default WithRouter
