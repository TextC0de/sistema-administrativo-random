import { dmyDateString } from 'lib/utils'
import { IService } from 'backend/models/interfaces'
import {BsFillPencilFill, BsFillTrashFill} from 'react-icons/bs'
import Link from 'next/link'
import { Table } from 'flowbite-react'
export default function Item({service}:{service:IService}){
    const openedAt = dmyDateString(new Date(service.openedAt))
    const closedAt = service.closedAt? dmyDateString(new Date(service.closedAt)): service.closedAt
    
    return (
        <Table.Row >
            <Table.Cell>{openedAt}</Table.Cell>
            <Table.Cell>{service.business.name}</Table.Cell>
            <Table.Cell>{service.branch.client.name}</Table.Cell>
            <Table.Cell>{service.branch.number}</Table.Cell>
            <Table.Cell>{service.branch.city.name}</Table.Cell>
            <Table.Cell>{service.branch.city.province.name}</Table.Cell>
            <Table.Cell>{service.assigned? service.assigned.fullName:'Sin asignar' }</Table.Cell>
            <Table.Cell>{service.status}</Table.Cell>
            <Table.Cell>{closedAt? closedAt :''}</Table.Cell>
            <Table.Cell>
                <div className='flex justify-evenly'>
                    <Link href='/tech-admin/services/[id]' as={`/tech-admin/services/${service._id}`}>
                        <button>
                            <BsFillPencilFill/>
                        </button>
                    </Link>
                    
                    <BsFillTrashFill/>
                </div>
                
            </Table.Cell>
        </Table.Row>
    )
}