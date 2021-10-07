export const getNuevosTicket = async () => {
	const resp = await fetch('http://localhost:8080/nuevosTickets');
	const data = await resp.json();

	return data.nuevosTickets;
};
