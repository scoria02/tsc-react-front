import { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';

export const useSocket = (serverPath) => {
	//
	const socket = useMemo(() => {
		return io.connect(serverPath, { transports: ['websocket'], user: 'aqui' });
	}, [serverPath]);

	//
	const [online, setOnline] = useState(false);

	useEffect(() => {
		setOnline(socket.connected);
	}, [socket]);

	useEffect(() => {
		console.log(socket);
		socket.on('connect', () => setOnline(true));
	}, [socket]);

	useEffect(() => {
		socket.on('disconnect', () => setOnline(false));
	}, [socket]);

	return {
		socket,
		online,
	};
};
