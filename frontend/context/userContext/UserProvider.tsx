import {useState} from 'react'
import UserContext from './UserContext'
import * as apiEndpoints from 'lib/apiEndpoints'
import { ResponseData } from 'backend/controllers/types'
import { IUser } from 'backend/models/interfaces'
import { ProviderProps } from '../interfaces'
import { useMemo } from 'react'
import fetcher from 'lib/fetcher'

const INITIAL_STATE = {
    email:'',
    firstName:'',
    lastName:'',
    fullname:'',
    _id:'',
    roles:[]
}

const UserProvider = ({children}:ProviderProps) => {

    const [user, setUser] = useState<IUser>(INITIAL_STATE)
    
    async function getUser():Promise<IUser>{
        try {
            const json:ResponseData = await fetcher.get(apiEndpoints.loggedInUser)
            if(!json.data.user){
                console.log('no user found');
                return INITIAL_STATE   
            }
            return json.data.user
        } catch (error) {
            console.log(error)
            return INITIAL_STATE
        }
    }

    //it logs in the user by sending a request to an endpoint that reads the access token cookie and returns the user corresponding to that access token
    async function loginUser(){
        setUser(await getUser())
    }

    function isLoggedIn(){
        return user.email!=''
    }

    function logoutUser(){
        setUser(INITIAL_STATE)
    }

    const memoValue = useMemo(() => {
        return {user, loginUser, logoutUser, isLoggedIn}
    }, [user])

    return(
        <UserContext.Provider value={memoValue}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider