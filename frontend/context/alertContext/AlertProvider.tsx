import {useState} from 'react'
import AlertContext from './AlertContext'
import * as apiEndpoints from 'lib/apiEndpoints'
import { ResponseData } from 'backend/controllers/types'
import { ProviderProps } from '../interfaces'
import { useMemo } from 'react'
import fetcher from 'lib/fetcher'
import { nanoid } from 'nanoid'

export type AlertType = 'Success' | 'Failure' | 'Info'

export interface IAlert{
    key?:string
    message:string,
    type:AlertType
}

const INITIAL_STATE = [] as IAlert[]

const AlertProvider = ({children}:ProviderProps) => {

    const [alerts, setAlerts] = useState<IAlert[]>(INITIAL_STATE)
    
    function triggerAlert(newAlert:IAlert){
        newAlert.key = nanoid()
        setAlerts([...alerts, newAlert])
        setTimeout(()=>{
            removeAlert(newAlert.key as string)
        }, 5000)
    }

    function removeAlert(key:string){
        setAlerts(alerts.filter(alert=> alert.key != key))
    }

    return(
        <AlertContext.Provider value={{alerts, triggerAlert, removeAlert}}>
            {children}
        </AlertContext.Provider>
    )
}

export default AlertProvider