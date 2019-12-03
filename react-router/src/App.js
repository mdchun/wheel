import React from 'react'
import Test from './Test'

import {
	Route,
	Router,
	Link,
	Switch,
	Redirect,
	BrowserRouter,
	HashRouter
} from './react-router'

const Index = props => {
	return (
		<div>
			index
			<button
				onClick={_ => {
					props.history.push('/detail')
				}}
			>
				detail
			</button>
			<br />
			<Link to='/about'>about</Link>
			<Test text='真香~~' />
		</div>
	)
}

export default class extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route
						path='/'
						exact
						render={_ => {
							return <Redirect to='/index' />
						}}
					></Route>
					<Route path='/index' component={Index}></Route>
					<Route path='/about' component={_ => <div>about</div>}></Route>
					<Route path='/detail' component={_ => <div>detail</div>}></Route>
				</Switch>
			</BrowserRouter>
		)
	}
}
