import { createContext } from 'react';

import { type IUser } from 'backend/models/interfaces';

export interface UserContextProps {
    user: IUser;
    loginUser: (user: IUser) => void;
    logoutUser: () => void;
    isLoggedIn: boolean;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export default UserContext;
