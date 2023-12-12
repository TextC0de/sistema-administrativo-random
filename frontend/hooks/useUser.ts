import { useContext } from 'react';

import UserContext, { type UserContextProps } from '../context/userContext/UserContext';

export default function useUser(): UserContextProps {
    const context = useContext(UserContext);
    return context;
}
