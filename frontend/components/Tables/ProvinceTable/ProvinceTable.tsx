import { IProvince } from 'backend/models/interfaces'
import { useState } from 'react'
import { Table } from 'flowbite-react'
import Item from './Item'
import useAlert from 'frontend/hooks/useAlert'

interface props{
    provinces:IProvince[]
}
export default function ProvinceTable({provinces}:props){
    const [tableProvinces, setTableProvinces] = useState<IProvince[]>(provinces)
    const {triggerAlert} = useAlert()
    const deleteProvince = (id:string) =>{
        const province =  tableProvinces.find(province => province._id === id)
        setTableProvinces(tableProvinces.filter(province => province._id !== id))
        if(!province) return
        triggerAlert({type:'Success', message:`La provincia ${province.name} se elimino correctamente`})
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