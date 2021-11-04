export const getDiferidos = async () => {
	const resp = await fetch('http://10.198.68.21:5051/deparment/admition/diferidos', {
		headers: {
			token: localStorage.getItem('token'),
		},
		// method: 'GET',
	});
	const data = await resp.json();

	console.log(data);
	return data;
};
