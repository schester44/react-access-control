import React from "react"

const initialState = { isLoaded: false, permissions: {}, resources: {}, define: () => {} }

const AccessContext = React.createContext(initialState)

export default AccessContext

export const AccessConsumer = AccessContext.Consumer

export const AccessProvider = ({ children }) => {
	const [state, setState] = React.useState(initialState)

	const define = values => setState(prevState => ({ ...prevState, ...values, isLoaded: true }))

	const providerValue = { ...state, define }

	return <AccessContext.Provider value={providerValue}>{children}</AccessContext.Provider>
}
