
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { BsPlus } from 'react-icons/bs'
import CityTable from 'frontend/components/Tables/CityTable'
import dbConnect from 'lib/dbConnect'
import { formatIds } from 'lib/utils'
import { ICity, IProvince } from 'backend/models/interfaces'
import City from 'backend/models/City'
import Province from 'backend/models/Province'

interface props{
    cities:ICity[]
}

export default function Cities({cities}:props){

    return(
        <>
            <div className='flex justify-between' >
                <h2 className='text-lg'>Localidades</h2>
                <Link href='/tech-admin/cities/new'>
                    <button className='flex justify-between items-center'>
                        <BsPlus size='30'/>
                        <h4>Agregar una localidad</h4>
                    </button>
                </Link>
            </div>
            <hr className='mb-2'/>
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