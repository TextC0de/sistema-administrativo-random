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
import Filter from 'frontend/components/Filter'
import { ChangeEvent, useState } from 'react'

interface IPreventiveProps{
    preventives:IPreventive[]
    cities:ICity[], 
    provinces:IProvince[], 
    techs:IUser[], 
    businesses:IBusiness[], 
    clients:IClient[]
}

export default function Preventives(props:IPreventiveProps){
    //const tableProps = {cities, provinces, techs, businesses, clients}

    return(
        <>
            <TitleButton title='Preventivos' path='/tech-admin/preventives/new' nameButton='Agregar preventivo'/>
            <PreventiveTable {...props}/>
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