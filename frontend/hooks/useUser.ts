import UserContext, { type UserContextProps } from '../context/userContext/UserContext'
import { useContext } from 'react'

export default function useUser(): UserContextProps {
	const context = useContext(UserContext)
	return context
}
