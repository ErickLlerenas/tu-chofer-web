export const handleUsers = (querySnapshot) => {
	const users = [];
	querySnapshot.forEach((doc) => {
		users.push(doc.data());
	});

	users.sort((a, b) =>
		a.name.trim().toUpperCase() > b.name.trim().toUpperCase()
			? 1
			: a.name.trim().toUpperCase() < b.name.trim().toUpperCase()
			? -1
			: 0
	);
	return users;
};
