import React, { Component, useContext, useEffect } from 'react'
import { bindActionCreators } from '../redux'
import ReactReduxContext from './Context'

const connect = (
	mapStateToProps = state => state,
	mapDispatchToProps = props => props
) => WrapComponent => {
	return props => {
		return (
			<ReactReduxContext.Consumer>
				{({ state, dispatch }) => {
					return (
						<WrapComponent
							{...mapStateToProps(state, props)}
							{...mapDispatchToProps(dispatch, props)}
						></WrapComponent>
					)
				}}
			</ReactReduxContext.Consumer>
		)
	}
}

export default connect
