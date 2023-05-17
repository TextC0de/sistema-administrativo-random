import { useState, useMemo } from 'react'
import UserContext from './UserContext'
import * as apiEndpoints from 'lib/apiEndpoints'
import { type ResponseData } from 'backend/controllers/types'
import { type IUser } from 'backend/models/interfaces'
import { type ProviderProps } from '../interfaces'

import fetcher from 'lib/fetcher'
import useLoading from 'frontend/hooks/useLoading'

const INITIAL_STATE = {
	email: '',
	firstName: '',
	lastName: '',
	fullname: '',
	_id: '',
	roles: []
}

const UserProvider = ({ children }: ProviderProps): JSX.Element => {
	const [user, setUser] = useState<IUser>(INITIAL_STATE)
	const { startLoading, stopLoading } = useLoading()
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

	async function getUser(): Promise<IUser> {
		try {
			const json: ResponseData = await fetcher.get(apiEndpoints.loggedInUser)
			if (json.data.user === undefined) {
				console.log('no user found')
				return INITIAL_STATE
			}
			setIsLoggedIn(true)
			return json.data.user
		} catch (error) {
			console.log(error)
			setIsLoggedIn(false)
			return INITIAL_STATE
		}
	}

	// it logs in the user by sending a request to an endpoint that reads the access token cookie and returns the user corresponding to that access token
	async function loginUser(): Promise<void> {
		startLoading()
		setUser(await getUser())
		stopLoading()
	}

	function logoutUser(): void {
		setUser(INITIAL_STATE)
		setIsLoggedIn(false)
	}

	const memoValue = useMemo(() => {
		return { user, loginUser, logoutUser, isLoggedIn }
	}, [user])

	return <UserContext.Provider value={memoValue}>{children}</UserContext.Provider>
}

export default UserProvider
