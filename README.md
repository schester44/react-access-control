# react-access-control

> Role based access control for conditional rendering of React components and routes.

[![NPM](https://img.shields.io/npm/v/react-access-control.svg)](https://www.npmjs.com/package/react-access-control) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-access-control
```

## Usage

```jsx
import React from "react"
import { AuthProvider, useAccess, Show } from "react-access-control"
import LoadingIndicator from "../LoadingIndicator"

const Example = () => {
	const { isLoaded, hasPermission, define } = useAccess()

	React.useEffect(() => {
		define({
			permissions: {
				"todos:read": true,
				"todos:write": false
			}
		})
	}, [])

	const userCanWrite = hasPermission("todos:read")

	if (!isLoaded) return <LoadingIndicator />

	return (
		<div>
			{userCanWrite && <RenderSomething />}

			<Show when="todos:read" resource={1} fallback={<div>oops no access</div>}>
				<RenderSomething />
			</Show>
		</div>
	)
}

render(
	<AuthProvider>
		<Example />
	</AuthProvider>,
	document.getElementById("root")
)
```

## API Reference

### <AccessProvider />

This lib relies on React's Context API, so a Provider is required. Use it like any other Provider..

```js
<AccessProvider>
	<App />
</AccessProvider>
```

### <Show />

A compontent that can be used to conditionally render components. If the user doesn't have necessary permissions passed into the `when` prop then the fallback, or nothing, is rendered.

Has 3 available props:

`when: string|array` (required)
The permission(s) we want to check against. Also accepts an array of permissions.

`resource: string|integer` (optional)
Passing a resource will check the resources object to ensure the user has access to a specific resource. This allows for more granular control over access.

`fallback: ReactNode` (optional)
What to render when the user doesn't have access

```js
<Show when="stores:read" resource={1} fallback={<div>I render when the user doesn't have access</div>}>
	<MyComponent />
</Show>
```

### useAccess

A hook for hooking into the AccessContext context.

#### isLoaded

isLoaded will be false if `define` has never been called. Once define is called we assume isLoaded is true. This flag can be used to prevent loading the app until permissions have been fetched and loaded.

#### define

This function defines the user's permissions and resources that they have access to.
Typically, this would be called as soon as possible (in your top level component).

```js
define({
	permissions: { "stores:read": true, "stores:write": false },
	resources: {
		stores: {
			"6": true
		}
	}
})
```

#### hasPermission

```js
hasPermission(permissions, options)
```

`hasPermission: (permissions: { [permission: string]: boolean }, options: { [resource: string ]: string|integer }) => boolean`

Fist argument accepts a string or array of permissions to check. When passing an array, the user must have access to all permissions for hasPermission to be true.

Second argument is an object. Currently only supports `resource` which is a resource's ID.

### withAuth

Restrict access to routes with this HOC

```js
withAuth(MyRestrictedComponent, ["stores:read"])
```

// TODO

## License

MIT © [schester44](https://github.com/schester44)
