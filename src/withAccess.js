import React from "react"
import useAccess from "./useAccess"

const withAccess = (Component, allowedRoles = []) => {
	return props => {
		const { hasPermission } = useAccess()

		// no roles are being passed in assume permission
		if (allowedRoles.length === 0) {
			return <Component {...props} />
		}

		// props.authResource would be the ID of the resource to AUTH against... You'd typically pass this prop at the Route level or inside the parent of the withAccess wrapped component
		const allowed = hasPermission(allowedRoles, { resourceId: props.authResource })

		// TODO: This can't be hard coded. how do we handle the else statement so that it works with other use cases?
		return allowed ? <Component {...props} /> : <Redirect to="/error-403" />
	}
}

export default withAccess
