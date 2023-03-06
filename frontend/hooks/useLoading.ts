import  LoadingContext from '../context/loadingContext/LoadingContext'
import {useContext} from 'react'

export default function useLoading(){
    const context = useContext(LoadingContext)
    return context
}