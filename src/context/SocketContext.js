/* eslint-disable no-unused-vars */
import { createContext } from 'react';
import { PortSocket, URL } from '../config';
import { useSocket } from '../hooks/useSocket';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const { socket, online } = useSocket(`${URL}:${PortSocket}`); //Dev
	// const { socket, online } = useSocket('http://192.168.253.29:777'); //aldrin
	//const { socket, online } = useSocket('http://192.168.253.27:777'); //dimas

	return <SocketContext.Provider value={{ socket, online }}>{children}</SocketContext.Provider>;
};
