import { GetServerSidePropsContext } from 'next'
import dbConnect from 'lib/dbConnect'
import { deSlugify, formatIds } from 'lib/utils'
import { ICity, IProvince } from 'backend/models/interfaces'
import Province from 'backend/models/Province'
import City from 'backend/models/City'
import CityForm, { ICityForm } from 'frontend/components/Forms/TechAdmin/CityForm'

interface props{
    city:ICity
    provinces:IProvince[]
} 

export default function CityView({city, provinces}:props){
    const cityForm:ICityForm = {
        _id:city._id as string,
        name:city.name,
        province:city.province
    }

    return(
        <>
           <CityForm newCity={false} cityForm={cityForm} provinces={provinces}/>
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext){
    const {params} = ctx
    await dbConnect()
    if(!params) return {props:{}}
    const docCity = await City.findOne({name:deSlugify(params.name as string)}).populate(City.populateParameter())
    const docProvinces = await Province.find({})
    const city = formatIds(docCity)
    //console.log(docCity)
    const provinces = formatIds(docProvinces)
    return {props:{city, provinces}}
}
