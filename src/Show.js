import React from "react"
import useAccess from "./useAccess"

const Show = ({ when, resource, fallback, children, ...rest }) => {
	const { hasPermission } = useAccess()

	const show = hasPermission(when, { resource })

	if (show) {
		// pass any other props to the children below.. this is needed for things like wrapping <Menu.Item /> components
		return React.Children.map(children, child => React.cloneElement(child, rest))
	}

	return fallback || null
}

export default Show
