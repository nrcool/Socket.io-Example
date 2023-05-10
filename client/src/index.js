
import React from "react"
import App from "./App.js"
import reactDOM from "react-dom"
import Container from "./context/Container.js"
import { BrowserRouter } from "react-router-dom"

reactDOM.render(<BrowserRouter> <Container> <App/></Container></BrowserRouter>,document.getElementById("root"))