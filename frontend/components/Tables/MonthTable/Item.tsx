import { Button, Table } from 'flowbite-react'
import { IClient } from 'backend/models/interfaces'
import {BsFillPencilFill, BsFillTrashFill} from 'react-icons/bs'
import Link from 'next/link'
import * as apiEndpoints from 'lib/apiEndpoints'
import mongoose from 'mongoose'
import { useRouter } from 'next/router'
import { slugify } from 'lib/utils'
import { Month } from 'backend/models/types'

interface props{
    month:Month,
    deleteMonth: (month:Month) => void
}

export default function Item({month, deleteMonth}:props){

    return(
        <Table.Row>
            <Table.Cell>{month}</Table.Cell>
            <Table.Cell>
                <div className='flex justify-end space-x-4'>
                    <Button outline={true} className='flex justify-evenly' onClick={()=>deleteMonth(month)}>
                        <BsFillTrashFill/>
                        <h4>Borrar</h4>
                    </Button>
                </div>
            </Table.Cell>
        </Table.Row>
    )
}