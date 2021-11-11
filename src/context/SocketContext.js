import React, { createContext } from 'react';
import { PortSocket, URL } from '../config';
import { useSocket } from '../hooks/useSocket';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const { socket, online } = useSocket(`${URL}:${PortSocket}`); //Dev
	// const { socket, online } = useSocket('http://192.168.253.29:777');

	return <SocketContext.Provider value={{ socket, online }}>{children}</SocketContext.Provider>;
};
