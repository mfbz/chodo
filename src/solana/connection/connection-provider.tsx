import { Account, Connection } from '@solana/web3.js';
import React, { useEffect, useMemo } from 'react';
import { ConnectionContext } from './context/connection-context';
import { getEndpointFromNetwork } from './utils/get-endpoint-from-network';

export const ConnectionProvider = ({
	network = 'localnet',
	children,
}: {
	network?: string;
	children: React.ReactNode;
}) => {
	// Get the endpoint related to the passed network or if not found default
	const endpoint = useMemo(() => getEndpointFromNetwork(network), [network]);

	// Create a new connection object
	const connection = useMemo(() => new Connection(endpoint.url, 'recent'), [endpoint]);
	const sendConnection = useMemo(() => new Connection(endpoint.url, 'recent'), [endpoint]);

	// The websocket library solana/web3.js uses closes its websocket connection when the subscription list
	// is empty after opening its first time, preventing subsequent subscriptions from receiving responses.
	// This is a hack to prevent the list from every getting empty
	useEffect(() => {
		const id = connection.onAccountChange(new Account().publicKey, () => {});
		return () => {
			connection.removeAccountChangeListener(id);
		};
	}, [connection]);

	useEffect(() => {
		const id = connection.onSlotChange(() => null);
		return () => {
			connection.removeSlotChangeListener(id);
		};
	}, [connection]);

	useEffect(() => {
		const id = sendConnection.onAccountChange(new Account().publicKey, () => {});
		return () => {
			sendConnection.removeAccountChangeListener(id);
		};
	}, [sendConnection]);

	useEffect(() => {
		const id = sendConnection.onSlotChange(() => null);
		return () => {
			sendConnection.removeSlotChangeListener(id);
		};
	}, [sendConnection]);

	return (
		<ConnectionContext.Provider
			value={{
				endpoint,
				connection,
				sendConnection,
			}}
		>
			{children}
		</ConnectionContext.Provider>
	);
};
