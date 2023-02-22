import { GetServerSidePropsContext } from 'next'
import PreventiveTable from 'frontend/components/Tables/PreventiveTable'
import dbConnect from 'lib/dbConnect'
import { formatIds } from 'lib/utils'
import { IPreventive } from 'backend/models/interfaces'
import Preventive from 'backend/models/Preventive'
import TitleButton from 'frontend/components/TitleButton'
import {Business} from 'backend/models/Business'
import {Client} from 'backend/models/Client'
import {Province} from 'backend/models/Province'
import { getModelForClass } from '@typegoose/typegoose'

interface IPreventiveProps{
    preventives:IPreventive[]
}

export default function Preventives({preventives}:IPreventiveProps){



    return(
        <>
            <TitleButton title='Preventivos' path='/tech-admin/preventives/new' nameButton='Agregar preventivo'/>
            
            <PreventiveTable preventives={preventives}/>
        </>
    )
}

export async function getServerSideProps({req, res}:GetServerSidePropsContext){
    await dbConnect()
    getModelForClass(Business)
    getModelForClass(Client)
    getModelForClass(Province)
    const docPreventives = await Preventive.findUndeleted({})
    if(!docPreventives) return {props:{}}
    //console.log(docPreventives)
    return {props:{preventives:formatIds(docPreventives)}}
}