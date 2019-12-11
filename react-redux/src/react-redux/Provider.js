import React, { useEffect, useState } from 'react'
import ReactReduxContext from './Context'

function Provider({ store, context, children }) {
	const Context = context || ReactReduxContext
	const [provider, setProvider] = useState({
		state: store.getState(),
		dispatch: store.dispatch
	})

	useEffect(() => {
		return store.subscribe(_ =>
			setProvider({ state: store.getState(), dispatch: store.dispatch })
		)
	}, [])

	return <Context.Provider value={provider}>{children}</Context.Provider>
}

export default Provider
