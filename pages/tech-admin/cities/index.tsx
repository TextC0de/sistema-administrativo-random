
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { BsPlus } from 'react-icons/bs'
import CityTable from 'frontend/components/Tables/CityTable'
import dbConnect from 'lib/dbConnect'
import { formatIds } from 'lib/utils'
import { ICity, IProvince } from 'backend/models/interfaces'
import City from 'backend/models/City'
import Province from 'backend/models/Province'
import TitleButton from 'frontend/components/TitleButton'

interface props{
    cities:ICity[]
}

export default function Cities({cities}:props){

    return(
        <>
            <TitleButton title='Localidades' path='/tech-admin/cities/new' nameButton='Agregar localidad'/>
            <CityTable cities={cities}/>
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext){
    await dbConnect()

    const docCities = await City.find({}).populate(City.populateParameter())
    
    const cities = formatIds(docCities)

    return{props:{cities}}

}