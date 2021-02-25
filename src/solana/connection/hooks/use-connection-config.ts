import { useContext } from 'react';
import { ConnectionContext } from '../context/connection-context';

export function useConnectionConfig() {
	const context = useContext(ConnectionContext);

	return {
		endpoint: context.endpoint,
		connection: context.connection,
		sendConnection: context.sendConnection,
	};
}
