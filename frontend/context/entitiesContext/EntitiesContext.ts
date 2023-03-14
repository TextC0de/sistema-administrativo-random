import { IBusiness, ICity, IClient, IProvince, IUser } from 'backend/models/interfaces';
import { createContext} from 'react';

interface EntitiesContextProps{
    cities:ICity[]
    clients:IClient[]
    businesses:IBusiness[]
    provinces:IProvince[]
    techs:IUser[]
}

const EntitiesContext = createContext<EntitiesContextProps>({} as EntitiesContextProps)

export default EntitiesContext
