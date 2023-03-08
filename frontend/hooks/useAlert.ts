import  AlertContext from '../context/alertContext/AlertContext'
import {useContext} from 'react'

export default function useAlert(){
    const context = useContext(AlertContext)
    return context
}