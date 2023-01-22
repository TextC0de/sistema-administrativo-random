import { IProvince } from 'backend/models/interfaces'
import Province from 'backend/models/Province'
import CityForm, { ICityForm } from 'frontend/components/Forms/TechAdmin/CityForm'
import dbConnect from 'lib/dbConnect'
import { GetServerSidePropsContext } from 'next'
import {formatIds} from 'lib/utils'

interface props{
    provinces:IProvince[]
}


export default function NewCity({provinces}:props){
    const cityForm:ICityForm = {
        _id:'',
        name:'',
        province:{} as IProvince
    }

    return(
        <>
           <CityForm cityForm={cityForm} provinces={provinces}/>
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext){
    await dbConnect()
    const docProvinces = await Province.find({})
    const provinces = formatIds(docProvinces)
    return {props:{provinces}}
}

