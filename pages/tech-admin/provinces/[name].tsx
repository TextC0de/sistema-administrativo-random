import { GetServerSidePropsContext } from 'next'
import ProvinceForm, { IProvinceForm } from 'frontend/components/Forms/TechAdmin/ProvinceForm'
import dbConnect from 'lib/dbConnect'
import { deSlugify, formatIds } from 'lib/utils'
import { IProvince } from 'backend/models/interfaces'
import Province from 'backend/models/Province'

interface props{
    province:IProvince
} 

export default function ProvinceView({province}:props){
    const provinceForm:IProvinceForm = {
        _id:province._id as string,
        name:province.name
    }

    return(
        <>
           <ProvinceForm newProvince={false} provinceForm={provinceForm}/>
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext){
    const {params} = ctx
    await dbConnect()
    if(!params) return {props:{}}
    const docProvince = await Province.findOne({name:deSlugify(params.name as string)})
    const province = formatIds(docProvince)
    return {props:{province}}
}
