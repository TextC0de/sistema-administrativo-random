import {useState} from 'react'
import {FullUrlJson, UserJson, ReducedUser} from './interfaces'
import UserContext from './UserContext'

interface UserProviderProps{
    children:JSX.Element | JSX.Element[]
}

const INITIAL_STATE = {
    username:'',
    firstName:'',
    lastName:'',
    _id:''
}

const UserProvider = ({children}:UserProviderProps) => {
    const url = 'http://localhost:3000/api/full-url' //protocol + domain name + path

    const [user, setUser] = useState(INITIAL_STATE)

    //function 
    async function getFullUrl():Promise<string>{  
        try {
            const res: Response = await fetch(url)
            const json: FullUrlJson = await res.json()
            return json.data
            
        } catch (error) {
            console.log(error)
            return ''
        }
    }
    
    //function that gets the base url(protocol+hostname)
    async function getBaseUrl(): Promise<string>{
        const url = await getFullUrl()
        const splitUrl = url.split('')
        let count = 0
        let i = 0
        while(count < 3 && i<splitUrl.length){
            if(splitUrl[i] === '/'){
                count++
            }
            i++
        }
        return splitUrl.slice(0, i).join('')
    }
    
    async function getUser():Promise<ReducedUser>{
        const baseUrl = await getBaseUrl()
    
        const res = await fetch(baseUrl+'api/auth/user')
        if(res.ok){
            const json:UserJson = await res.json()
            if(json.data){
                const {username, firstName, lastName, _id} = json.data
                const user:ReducedUser = {username, firstName, lastName, _id: _id.toString()}
                return user
            }
        }
        return INITIAL_STATE    
    }

    async function loginUser(){
        setUser(await getUser())
    }

    function isLoggedIn(){
        return user.username!=''
    }

    function logoutUser(){
        setUser(INITIAL_STATE)
    }
    return(
        <UserContext.Provider value={{user, loginUser, logoutUser, getBaseUrl, isLoggedIn}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider