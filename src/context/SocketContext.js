/* eslint-disable no-unused-vars */
import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket';

import { URL, PortSocket } from '../config';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
<<<<<<< HEAD
	// const { socket, online } = useSocket(`${URL}:${PortSocket}`); //Dev
=======
	//const { socket, online } = useSocket(`${URL}:${PortSocket}`); //Dev
>>>>>>> e6e12714199c318c66730f96261c5fd0f82ea38f
	const { socket, online } = useSocket('http://192.168.253.29:777');

	return <SocketContext.Provider value={{ socket, online }}>{children}</SocketContext.Provider>;
};
