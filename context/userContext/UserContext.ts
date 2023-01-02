import { createContext} from "react";
import {ReducedUser} from './interfaces'

interface UserContextProps{
    user: ReducedUser;
    loginUser: () => Promise<void>;
    logoutUser: () => void;
    isLoggedIn: () => boolean;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps)

export default UserContext
