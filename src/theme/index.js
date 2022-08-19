import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

const theme = createTheme({
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

const ThemeProvider = ({ children }) => {
	return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
