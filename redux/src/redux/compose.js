function compose(...chain) {
	if (chain.length === 0) {
		return _ => _
	}
	if (chain.length === 1) {
		return chain[0]
	}

	return chain.reduce((a, b) => (...args) => b(a(...args)))
}

export default compose
