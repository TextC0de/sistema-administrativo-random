import { dmyDateString } from 'lib/utils'
import { ITask } from 'backend/models/interfaces'
import {BsFillPencilFill, BsFillTrashFill} from 'react-icons/bs'
import Link from 'next/link'
import { Button, Table } from 'flowbite-react'

export default function Item({task}:{task:ITask}){
    const openedAt = dmyDateString(new Date(task.openedAt))
    const closedAt = task.closedAt? dmyDateString(new Date(task.closedAt)): task.closedAt
    
    return (
        <Table.Row >
            <Table.Cell>{openedAt}</Table.Cell>
            <Table.Cell>{task.business.name}</Table.Cell>
            <Table.Cell>{task.branch.client.name}</Table.Cell>
            <Table.Cell>{`${task.branch.number}, ${task.branch.city.name}, ${task.branch.city.province.name}`}</Table.Cell>
            <Table.Cell>{task.assigned? task.assigned.fullName:'Sin asignar' }</Table.Cell>
            <Table.Cell>{task.taskType}</Table.Cell>
            <Table.Cell>{task.status}</Table.Cell>
            <Table.Cell>{closedAt? closedAt :''}</Table.Cell>
            <Table.Cell>
                <div className='flex justify-evenly items-center' /* style={{justifyContent:'space-between'}} */>
                    
                        <Link href='/tech-admin/tasks/[id]' as={`/tech-admin/tasks/${task._id}`}>
                            <Button>
                                <BsFillPencilFill/>
                            </Button>
                        </Link>
                        <Button>
                            <BsFillTrashFill/>
                        </Button>
                    
                    
                </div>
                
            </Table.Cell>
        </Table.Row>
    )
}