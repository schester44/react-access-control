import React from "react"

import { useAccess, Show } from "react-access-control"

const divStyle = {
	borderBottom: "1px solid rgba(32,32,32,0.1)",
	padding: 20,
	fontSize: 20
}

const App = () => {
	const { isLoaded, define, hasPermission } = useAccess()

	React.useEffect(() => {
		// set timeout to demonstrate an async request for permissions

		setTimeout(() => {
			define({
				resources: {
					todos: {
						"1": true
					}
				},
				permissions: {
					"todos:read": true,
					"todos:write": true,
					"todos:delete": false
				}
			})
		}, 2500)
	}, [])

	const canRead = hasPermission("todos:read")
	const canWrite = hasPermission("todos:write")
	const canDelete = hasPermission("todos:delete")

	if (!isLoaded) return <div>LOADING...</div>

	return (
		<div style={{ padding: 14 }}>
			<h1>React-Access-Control</h1>
			<p>RBAC for conditional rendering of components and routes.</p>

			<div style={divStyle}>Can Access: todos:read ({`${canRead}`})</div>
			<div style={divStyle}>Can Access: todos:write ({`${canWrite}`})</div>
			<div style={divStyle}>Can Access: todos:delete ({`${canDelete}`})</div>

			<Show when="todos:read">
				<div style={divStyle}>i'm visible because the user has the todos:read permission.</div>
			</Show>

			<Show
				when="todos:read"
				resource={1}
				fallback={<div style={divStyle}>I'm a fallback that's rendering because the user doesn't have access to TODO #1</div>}
			>
				<div style={divStyle}>I'm visible because the use has access to the TODO #1 resource.</div>
			</Show>

			<Show
				when="todos:read"
				resource={2}
				fallback={<div style={divStyle}>I'm a fallback that's rendering because the user doesn't have access to TODO #2</div>}
			>
				<div style={divStyle}>I'm visible because the use has access to the TODO #2 resource.</div>
			</Show>

			<div style={{ marginTop: 24, padding: 14 }}>
				Not demonstrated: <code>withAccess</code> which can wrap a Route to prevent users from accessing entire
				routes.
			</div>
		</div>
	)
}

export default App
