import { IService } from 'backend/models/interfaces'

import Item from './Item'
import {Table} from 'flowbite-react'
export default function ServiceTechAdminTable({services}:{services:IService[]}){
    return(
        <>
            <Table>
                <Table.Head>
                        <Table.HeadCell>Fecha apertura</Table.HeadCell>
                        <Table.HeadCell>Empresa</Table.HeadCell>
                        <Table.HeadCell>Cliente</Table.HeadCell>
                        <Table.HeadCell>Sucursal</Table.HeadCell>
                        <Table.HeadCell>Localidad</Table.HeadCell>
                        <Table.HeadCell>Provincia</Table.HeadCell>
                        <Table.HeadCell>Tecnico Asignado</Table.HeadCell>
                        <Table.HeadCell>Estado</Table.HeadCell>
                        <Table.HeadCell>Fecha cierre</Table.HeadCell>
                        <Table.HeadCell>Acciones</Table.HeadCell>
                </Table.Head >
                <Table.Body >
                    {services.map((service, index) => <Item key={index} service={service}/>)}
                </Table.Body>
            </Table>
        </>
    )
}

