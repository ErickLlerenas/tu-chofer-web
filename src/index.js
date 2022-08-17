import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./firebase";
import reportWebVitals from "./reportWebVitals";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#2196f3",
		},
		secondary: {
			main: "#da2d84",
			contrastText: "#fff",
		},
	},
});

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<App />
	</MuiThemeProvider>,
	document.getElementById("root")
);

reportWebVitals();
