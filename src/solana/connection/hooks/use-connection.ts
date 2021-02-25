import { Connection } from '@solana/web3.js';
import { useContext } from 'react';
import { ConnectionContext } from '../context/connection-context';

export function useConnection() {
	return useContext(ConnectionContext).connection as Connection;
}
