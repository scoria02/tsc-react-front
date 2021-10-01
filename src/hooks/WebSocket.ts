import { Port, URL } from '../config';
import {io} from 'socket.io-client';
import { useEffect, useState } from 'react';

const WebSocket = () => {
  const [socket , setSocket] = useState<any>(null);

  useEffect(() => {
    const sockete = io(`${URL}:${Port}`);
    setSocket(sockete)
  }, []);

  return { 
    socket,
  }
}

export default WebSocket;

