import { useContext } from 'react';
import { ConnectionContext } from '../context/connection-context';

export function useSendConnection() {
	return useContext(ConnectionContext)?.sendConnection;
}
