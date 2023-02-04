import { dmyDateString, toMonth } from 'lib/utils'
import { IPreventive } from 'backend/models/interfaces'
import {BsFillPencilFill, BsFillTrashFill} from 'react-icons/bs'
import Link from 'next/link'
import { Button, Table, Badge } from 'flowbite-react'
import { Month } from 'backend/models/types'

export default function Item({preventive}:{preventive:IPreventive}){

    function imposedMonths(months:Month[]){
        return months.length>1?months.map(month => `${month}, `):months[0]
    }
    
    return (
        <Table.Row className='border-b'>
            <Table.Cell>{preventive.business.name}</Table.Cell>
            <Table.Cell>{`${preventive.branch.number}, ${preventive.branch.client.name}, ${preventive.branch.city.name}`}</Table.Cell>
            <Table.Cell>{preventive.assigned.length > 1?`${preventive.assigned.map(tech => `${tech.fullName}, `)}`: `${preventive.assigned[0].fullName}`}</Table.Cell>
            <Table.Cell>{preventive.frequency?`Cada ${preventive.frequency} meses`:''}</Table.Cell>
            <Table.Cell>{preventive.months? imposedMonths(preventive.months):''}</Table.Cell>
            <Table.Cell>{preventive.observations}</Table.Cell>
            <Table.Cell>{preventive.lastDoneAt?dmyDateString(new Date(preventive.lastDoneAt)):''}</Table.Cell>
            <Table.Cell><Badge color='warning'>{preventive.status}</Badge></Table.Cell>
            <Table.Cell>{preventive.batteryChangedAt?dmyDateString(new Date(preventive.batteryChangedAt)):''}</Table.Cell>
            <Table.Cell>
                <div className='flex justify-evenly items-center'>
                    <Link href='/tech-admin/preventives/[id]' as={`/tech-admin/preventives/${preventive._id}`}>
                        <button className='p-0.5 hover:bg-gray-200 rounder-lg ' >
                            <BsFillPencilFill color="gray" size="15"/>
                        </button>
                    </Link>
                    <button className='p-0.5 hover:bg-gray-200 rounder-lg'>
                        <BsFillTrashFill color="gray" size="15"/>
                    </button>       
                </div>
            </Table.Cell>
        </Table.Row>
    )
}