import React from "react"
import context from "./context"
import checkRole from "./hasPermission"

const useAccess = () => {
	const { permissions, resources, isLoaded, define } = React.useContext(context)

	const hasPermission = (role, opts = {}) => {
		return React.useMemo(() => checkRole(permissions, resources, role, opts), [permissions, role, opts])
	}

	return { isLoaded, hasPermission, define }
}

export default useAccess
