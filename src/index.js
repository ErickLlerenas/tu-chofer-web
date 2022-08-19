import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@material-ui/core/";

import App from "./App";
import ThemeProvider from "./theme";
import "./firebase";
import "./index.css";

ReactDOM.render(
	<ThemeProvider>
		<CssBaseline />
		<App />
	</ThemeProvider>,
	document.getElementById("root")
);
