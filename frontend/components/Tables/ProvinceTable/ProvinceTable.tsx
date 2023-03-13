import { IProvince } from 'backend/models/interfaces'
import { memo, useEffect, useState } from 'react'
import { Table } from 'flowbite-react'
import Item from './Item'
import useAlert from 'frontend/hooks/useAlert'

interface props{
    provinces:IProvince[]
}

export default function ProvinceTable({provinces}:props){
    const [tableProvinces, setTableProvinces] = useState<IProvince[]>(provinces)
    
    const deleteProvince = (id:string) =>{
        setTableProvinces(tableProvinces.filter(province => province._id !== id))      
    }

    return(
        <>
            <Table hoverable={true} className='bg-white'>
                <Table.Head className='bg-white border-b'>
                    <Table.HeadCell>Nombre</Table.HeadCell>
                    <Table.HeadCell className='w-40 text-center'>Acciones</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {tableProvinces.map((province, index)=><Item key={index} province={province} deleteProvince={deleteProvince}/>)}
                </Table.Body>
            </Table>
        </>
    )
}

//const MemoizedProvinceTable = memo(ProvinceTable);
//export default MemoizedProvinceTable