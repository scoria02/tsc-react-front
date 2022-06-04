import axios from 'config';

export const multiGetterAxios = async (routes: string[]) => {
	try {
		const stop = routes.map(async (route: string) => {
			return await axios.get(route, {
				baseURL: process.env.REACT_APP_API_API,
				headers: { Authorization: `${localStorage.getItem('token')}` },
			});
		});

		const resps = await Promise.all(stop);

		return resps;
	} catch (err) {
		console.error('en getters', err);

		return [];
	}
};
