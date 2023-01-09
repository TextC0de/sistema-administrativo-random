import {useState} from 'react'
import UserContext from './UserContext'
import * as apiEndpoints from '../../lib/apiEndpoints'
import { ResponseData } from '../../controllers/types'
import { IUser } from '../../models/interfaces'

interface UserProviderProps{
    children:JSX.Element | JSX.Element[]
}

const INITIAL_STATE = {
    email:'',
    firstName:'',
    lastName:'',
    fullname:'',
    _id:'',
    roles:[]
}

const UserProvider = ({children}:UserProviderProps) => {

    const [user, setUser] = useState<IUser>(INITIAL_STATE)
    
    async function getUser():Promise<IUser>{
        const res = await fetch(apiEndpoints.loggedInUser)
        if(!res.ok){
            return INITIAL_STATE    
        }
        const json:ResponseData = await res.json()
        if(!json.data){
            return INITIAL_STATE   
        }
        return json.data.user    
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
    return(
        <UserContext.Provider value={{user, loginUser, logoutUser, isLoggedIn}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider