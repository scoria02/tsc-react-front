import { Port, URL } from '../config';

export const getNuevosTicket = async () => {
	const resp = await fetch(`${URL}:${Port}/nuevosTickets`);
	const data = await resp.json();

	return data.nuevosTickets;
};
