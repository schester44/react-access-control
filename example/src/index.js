import React from "react"
import ReactDOM from "react-dom"

import "./index.css"
import App from "./App"

import { AccessProvider } from "react-access-control"

ReactDOM.render(
  <AccessProvider>
    <App />
  </AccessProvider>,
  document.getElementById("root")
)
