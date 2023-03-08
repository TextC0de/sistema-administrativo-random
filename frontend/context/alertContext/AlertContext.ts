import { createContext} from 'react';
import { IAlert } from './AlertProvider';

interface AlertContextProps{
    alerts:IAlert[]
    triggerAlert:(alert:IAlert)=>void
    removeAlert: (key:string)=>void
}

const AlertContext = createContext<AlertContextProps>({} as AlertContextProps)

export default AlertContext
