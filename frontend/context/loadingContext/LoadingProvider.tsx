import {useState} from 'react'
import LoadingContext from './LoadingContext'
import * as apiEndpoints from 'lib/apiEndpoints'
import { ResponseData } from 'backend/controllers/types'
import { ProviderProps } from '../interfaces'
import { useMemo } from 'react'
import fetcher from 'lib/fetcher'

const INITIAL_STATE = false

const LoadingProvider = ({children}:ProviderProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(INITIAL_STATE)
    
    function startLoading(){
        setIsLoading(true)
    }
    
    function stopLoading(){
        setIsLoading(false)
    }

    return(
        <LoadingContext.Provider value={{isLoading, startLoading, stopLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingProvider