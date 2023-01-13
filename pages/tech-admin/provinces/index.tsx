
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { BsPlus } from 'react-icons/bs'
import ProvinceTable from 'frontend/components/Tables/ProvinceTable'
import dbConnect from 'lib/dbConnect'
import { formatIds } from 'lib/utils'
import { IProvince } from 'backend/models/interfaces'
import Province from 'backend/models/Province'

interface props{
    provinces:IProvince[]
}

export default function Provinces({provinces}:props){

    return(
        <>
            <div className='flex justify-between' >
                <h2 className='text-lg'>Provincias</h2>
                <Link href='/tech-admin/provinces/new'>
                    <button className='flex justify-between items-center'>
                        <BsPlus size='30'/>
                        <h4>Agregar una provincia</h4>
                    </button>
                </Link>
            </div>
            <hr className='mb-2'/>
            <ProvinceTable provinces={provinces}/>
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext){
    await dbConnect()

    const docProvinces = await Province.find({})
    const provinces = formatIds(docProvinces)

    return{props:{provinces}}

}