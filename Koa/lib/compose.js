function compose(mids) {
	return function(ctx) {
		return dispatch(0)
		function dispatch(i) {
			let fn = mids[i]

			if (!fn) {
				return Promise.resolve()
			}

			return Promise.resolve(
				fn(ctx, function next() {
					return dispatch(i + 1)
				})
			)
		}
	}
}

module.exports = compose
