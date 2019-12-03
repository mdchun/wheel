// WithRouter test
import React, { Component } from 'react'
import { WithRouter } from './react-router'

class Test extends Component {
	render() {
		console.log(this.props) // 这里可以拿到history, 等信息
		return <div>1</div>
	}
}

export default WithRouter(Test)
