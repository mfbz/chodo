import { useContext } from 'react';
import { ConnectionContext } from '../context/connection-context';

export function useConnection() {
	const context = useContext(ConnectionContext);

	return {
		endpoint: context.endpoint,
		connection: context.connection,
		sendConnection: context.sendConnection,
	};
}
