import React, { Component } from 'react'
import { connect } from './react-redux'

// class Test extends Component {
// 	render() {
// 		console.log(this.props)
// 		return <div>121</div>
// 	}
// }
function Test(props) {
	console.log(props)
	return (
		<div>
			这是用hooks封装的react-redux，这里接受props，
			<button
				onClick={_ => {
					props.dispatch({ type: 'add' })
				}}
			>
				add
			</button>
			{props.count}
		</div>
	)
}
export default connect(
	state => {
		console.log(state)
		return { count: state }
	},
	props => {
		console.log(props)
		return { dispatch: props }
	}
)(Test)
