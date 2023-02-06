import { Button, Table } from 'flowbite-react'
import { IBranch } from 'backend/models/interfaces'
import {BsFillPencilFill, BsFillTrashFill} from 'react-icons/bs'
import Link from 'next/link'
import * as apiEndpoints from 'lib/apiEndpoints'
import { useRouter } from 'next/router'
import mongoose from 'mongoose'

interface props{
    branch:IBranch,
    deleteBranch: (id:string | mongoose.Schema.Types.ObjectId) => void
}

export default function Item({branch, deleteBranch}:props){

    const deleteData = async () => {
        const contentType='application/json'

        
        try {
            const res: Response = await fetch(apiEndpoints.techAdmin.branches, {
                method: 'DELETE',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                    },
                body:JSON.stringify({_id:branch._id})
            })

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                console.log(res);
                throw new Error('failed to delete branch')
            }
            deleteBranch(branch._id)

        } 
        catch (error) {
            console.log(error)

        }
    }

    return(
        <Table.Row>
            <Table.Cell>{branch.number}</Table.Cell>
            <Table.Cell>{`${branch.city.name}, ${branch.city.province.name}`}</Table.Cell>
            <Table.Cell>
                <div className='flex justify-end space-x-4'>
                    <Link href='/tech-admin/clients/[name]/branches/[number]' as={`/tech-admin/clients/${branch.client.name}/branches/${branch.number}`}>
                        <Button outline={true} className='flex justify-evenly'>
                            <BsFillPencilFill/>
                            <h4>Editar</h4>
                        </Button>
                    </Link>
                    <Button outline={true} className='flex justify-evenly' onClick={deleteData}>
                        <BsFillTrashFill/>
                        <h4>Borrar</h4>
                    </Button>
                </div>
            </Table.Cell>
        </Table.Row>
    )
}