/* eslint-disable no-unused-vars */
import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const { socket, online } = useSocket(process.env.REACT_APP_API_SOCKET); //Dev

	return <SocketContext.Provider value={{ socket, online }}>{children}</SocketContext.Provider>;
};
