import { CONNECTION_ENDPOINTS, DEFAULT_CONNECTION_ENPOINT } from '../constants/connection-constants';

export function getEndpointFromNetwork(network: string) {
	return CONNECTION_ENDPOINTS.find((endpoint) => endpoint.name === network) || DEFAULT_CONNECTION_ENPOINT;
}
