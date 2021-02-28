import React from 'react';
import { UserConfig } from '../interfaces/user-config';

export const UserContext = React.createContext<UserConfig>({
	user: undefined,
});
