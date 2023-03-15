import { GetServerSidePropsContext } from 'next'
import PreventiveTable from 'frontend/components/Tables/PreventiveTable'
import dbConnect from 'lib/dbConnect'
import { formatIds } from 'lib/utils'
import { IBusiness, ICity, IPreventive, IProvince, IUser, IClient } from 'backend/models/interfaces'
import Preventive from 'backend/models/Preventive'
import TitleButton from 'frontend/components/TitleButton'
import City from 'backend/models/City'
import Province from 'backend/models/Province'
import User from 'backend/models/User'
import Business from 'backend/models/Business'
import Client from 'backend/models/Client'
import Filter from 'frontend/components/Tables/PreventiveTable/Filter'
import { useState } from 'react'

interface IPreventiveProps{
    preventives:IPreventive[]
    cities:ICity[], 
    provinces:IProvince[], 
    techs:IUser[], 
    businesses:IBusiness[], 
    clients:IClient[]
}

const filterTypes = ['Localidad', 'Provincia', 'Tecnico', 'Empresa', 'Cliente']

export default function Preventives({preventives, cities, provinces, techs, businesses, clients}:IPreventiveProps){
    const [type, setType] = useState<string>('')
    const [entities, setEntities] = useState<any[]>([] as any[])
    const [filteredPreventives, setFilteredPreventives] = useState<IPreventive[]>(preventives)

    function selectEntity(entity:any){
        switch(type){
            
        }
    }

    function selectType(type:string){
        setType(type)
        switch (type) {
            case 'Localidad':
                setEntities(cities)
                break;
            case 'Provincia':
                setEntities(provinces)
                break
            case 'Tecnico':
                setEntities(techs)
                break
            case 'Empresa':
                setEntities(businesses)
                break
            case 'Cliente':
                setEntities(clients)
            default:
                break;
        }
    }

    return(
        <>
            <TitleButton title='Preventivos' path='/tech-admin/preventives/new' nameButton='Agregar preventivo'/>
            <Filter types={filterTypes} entities={entities} selectType={selectType} selectEntity={selectEntity}/>
            <PreventiveTable preventives={preventives}/>
        </>
    )
}

export async function getServerSideProps({req, res}:GetServerSidePropsContext){
    await dbConnect()
    const preventives = await Preventive.findUndeleted({})
    if(!preventives) return {props:{}}
    const cities = await City.findUndeleted({})
    const provinces = await Province.findUndeleted({})
    const techs = await User.findUndeleted({roles:'Tecnico'})
    const businesses = await Business.findUndeleted()
    const clients = await Client.findUndeleted()
    const props = formatIds({preventives, cities, provinces, techs, businesses, clients})

    return {props}
}