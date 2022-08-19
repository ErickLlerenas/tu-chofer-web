import { getLocalStorage } from "../helpers/localStorage";
import { STORAGE_CREDENTIALS } from "../constants/localStorage";
import { POLICY, LOGIN } from "../constants/routes";

export const checkIfIsLoggedIn = () => {
	const credentials = getLocalStorage(STORAGE_CREDENTIALS);
	console.log(credentials);
	const pathname = window.location.pathname;

	if (!credentials) {
		if (pathname !== LOGIN && pathname !== POLICY) {
			window.location.href = LOGIN;
		}
	}
};
