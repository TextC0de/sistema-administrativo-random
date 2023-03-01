import  UserContext from '../context/userContext/UserContext'
import {useContext} from 'react'

export default function useUser(){
    const context = useContext(UserContext)
    return context
}