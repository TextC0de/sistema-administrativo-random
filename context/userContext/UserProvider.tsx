import {useState} from 'react'
import {ReducedUser} from './interfaces'
import UserContext from './UserContext'
import * as apiEndpoints from '../../lib/apiEndpoints'
import { ResponseData } from '../../controllers/types'

interface UserProviderProps{
    children:JSX.Element | JSX.Element[]
}

const INITIAL_STATE = {
    email:'',
    firstName:'',
    lastName:'',
    _id:''
}

const UserProvider = ({children}:UserProviderProps) => {

    const [user, setUser] = useState(INITIAL_STATE)
    
    async function getUser():Promise<ReducedUser>{
        //console.log('getting user at: ', apiEndpoints.loggedInUser);
        
        const res = await fetch(apiEndpoints.loggedInUser)
        if(res.ok){
            const json:ResponseData = await res.json()
            if(json.data){
                const user = json.data.user


                
                return user
            }
            
        }

        return INITIAL_STATE    
    }

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