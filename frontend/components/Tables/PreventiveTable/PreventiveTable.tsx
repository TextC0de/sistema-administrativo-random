import { IPreventive} from 'backend/models/interfaces'

import Item from './Item'
import {Table} from 'flowbite-react'
import { useState } from 'react'

export default function PreventiveTable({preventives}:{preventives:IPreventive[]}){
    const [tablePreventive, setTablePreventive] = useState<IPreventive[]>(preventives)

    const deletePreventive = (id:string) =>{
        const newTable = (prev:IPreventive[]) => prev.filter(preventive => preventive._id !== id)
        setTablePreventive(newTable(tablePreventive))
    }

    return(
        <>
            <Table hoverable={true}  className='bg-white'>
                <Table.Head className='bg-white border-b'>
                        <Table.HeadCell>Empresa</Table.HeadCell>
                        <Table.HeadCell>Sucursal</Table.HeadCell>
                        <Table.HeadCell>Tecnico Asignado</Table.HeadCell>
                        <Table.HeadCell>Frecuencia</Table.HeadCell>
                        <Table.HeadCell>Meses impuestos</Table.HeadCell>
                        <Table.HeadCell>Observaciones</Table.HeadCell>
                        <Table.HeadCell>Ultima vez</Table.HeadCell>
                        <Table.HeadCell>Estado</Table.HeadCell>
                        <Table.HeadCell>Fecha bateria</Table.HeadCell>
                        <Table.HeadCell>Acciones</Table.HeadCell>
                </Table.Head >
                <Table.Body >
                    {preventives.map((preventive, index) => <Item key={index} preventive={preventive} deletePreventive={deletePreventive}/>)}
                </Table.Body>
            </Table>
        </>
    )
}

