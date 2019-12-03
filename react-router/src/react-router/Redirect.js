import React, { Component } from 'react'
import RouterContext from './Context'

export default class Redirect extends Component {
	render() {
		const { to } = this.props

		return (
			<RouterContext.Consumer>
				{ctx => {
					console.log(ctx)
					const { history } = ctx
					// 源码是通过空的组件的didmout来做跳转, 这里偷个懒了
					setTimeout(() => {
						history.push(to)
					})

					return null
				}}
			</RouterContext.Consumer>
		)
	}
}
