/* eslint-disable no-unused-vars */
import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket';

import { URL, PortSocket } from '../config';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	//const { socket, online } = useSocket(`${URL}:${PortSocket}`); //Dev
	const { socket, online } = useSocket('http://192.168.253.29:777');

	return <SocketContext.Provider value={{ socket, online }}>{children}</SocketContext.Provider>;
};
