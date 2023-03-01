import { GetServerSidePropsContext } from 'next'
import PreventiveTable from 'frontend/components/Tables/PreventiveTable'
import dbConnect from 'lib/dbConnect'
import { formatIds } from 'lib/utils'
import { IPreventive } from 'backend/models/interfaces'
import Preventive from 'backend/models/Preventive'
import TitleButton from 'frontend/components/TitleButton'

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
    const docPreventives = await Preventive.findUndeleted({})
    if(!docPreventives) return {props:{}}
    return {props:{preventives:formatIds(docPreventives)}}
}