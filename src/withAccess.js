import React from 'react'

import useAccess from './useAccess'
import context from './context'

const withAccess = setter => {
	if (typeof setter !== 'function' && typeof setter !== 'object') {
		throw new Error('withAccess accepts a function or object')
	}

	return WrappedComponent => {
		const ConnectedComponent = React.memo(props => {
			const { onDeny } = React.useContext(context)

			let values = {}

			if (typeof setter === 'function') {
				values = setter(props)
			} else {
				values = setter
			}

			const { hasPermission } = useAccess()

			if (!values.permissions) {
				throw new Error('No permissions were passed to withAccess')
			}

			if (values.permissions.length === 0) {
				return <WrappedComponent {...props} />
			}

			const allowed = hasPermission(values.permissions, { resource: values.resource })

			if (allowed) {
				return <WrappedComponent {...props} />
			}

			const nextAction =
				typeof values.onDeny === 'function'
					? values.onDeny
					: typeof onDeny === 'function'
					? onDeny
					: null

			if (!nextAction) {
				return console.warn(
					'withAccess does not have have a provided onDeny callback. While this is not an error, you could potentially improve the user experience by implementing one.'
				)
			}

			return nextAction(props)
		})

		return ConnectedComponent
	}
}

export default withAccess
