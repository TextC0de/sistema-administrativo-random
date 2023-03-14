import {useEffect, useReducer, useState} from 'react'
import EntitiesContext from './EntitiesContext'
import * as api from 'lib/apiEndpoints'
import { ResponseData } from 'backend/controllers/types'
import { ProviderProps } from '../interfaces'
import fetcher from 'lib/fetcher'
import { IBusiness, ICity, IClient, IProvince, IUser } from 'backend/models/interfaces'

const INITIAL_CITIES = [] as ICity[]
const INITIAL_CLIENTS = [] as IClient[]
const INITIAL_BUSINESSES = [] as IBusiness[]
const INITIAL_TECHS = [] as IUser[]
const INITIAL_PROVINCES = [] as IProvince[]

const EntitiesProvider = ({children}:ProviderProps) => {

    const [cities, setCities] = useState<ICity[]>(INITIAL_CITIES)
    const [clients, setClients] = useState<IClient[]>(INITIAL_CLIENTS)
    const [businesses, setBusinesses] = useState<IBusiness[]>(INITIAL_BUSINESSES)
    const [techs, setTechs] = useState<IUser[]>(INITIAL_TECHS)
    const [provinces, setProvinces] = useState<IProvince[]>(INITIAL_PROVINCES)
    
    async function getCities(){
        const data = await fetcher.get(api.techAdmin.cities)
        setCities(data.cities)
    }

    async function addCity(city:ICity){
        
    }

    async function getClients(){
        const data = await fetcher.get(api.techAdmin.clients)
        setClients(data.clients)
    }

    async function getBusinesses(){
        const data = await fetcher.get(api.techAdmin.businesses)
        setBusinesses(data.businesses)
    }

    async function getTechs(){
        const data = await fetcher.get(api.techAdmin.techs)
        setTechs(data.techs)
    }

    async function getProvinces(){
        const data = await fetcher.get(api.techAdmin.provinces)
        setProvinces(data.provinces)
    }

    useEffect(() => {
        getCities()
        getClients()
        getBusinesses()
        getTechs()
        getProvinces()
    }, [])
    

    return(
        <EntitiesContext.Provider value={{cities, clients, businesses, techs, provinces}}>
            {children}
        </EntitiesContext.Provider>
    )
}

export default EntitiesProvider