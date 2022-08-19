export const setToLocalStorage = (key, credentials) => {
	localStorage.setItem(key, JSON.stringify(credentials));
};

export const getLocalStorage = (key) => {
	return JSON.parse(localStorage.getItem(key));
};

export const removeLocalStorage = (key) => {
	localStorage.removeItem(key);
};
