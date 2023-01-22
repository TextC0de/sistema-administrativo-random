import { Button, Table } from 'flowbite-react'
import { IProvince } from 'backend/models/interfaces'
import {BsFillPencilFill, BsFillTrashFill} from 'react-icons/bs'
import Link from 'next/link'
import * as apiEndpoints from 'lib/apiEndpoints'
import { useRouter } from 'next/router'
import mongoose from 'mongoose'
import { slugify } from 'lib/utils'

interface props{
    province:IProvince,
    deleteProvince: (id:string | mongoose.Schema.Types.ObjectId) => void
}

export default function Item({province, deleteProvince}:props){

    const deleteData = async () => {
        //console.log('deleting');
        const contentType='application/json'
        
        try {
            const res: Response = await fetch(apiEndpoints.techAdmin.provinces, {
                method: 'DELETE',
                headers:{
                    Accept: contentType,
                    'Content-Type': contentType,
                    },
                body:JSON.stringify({_id:province._id})
            })

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                console.log(res);
                throw new Error('failed to delete province')
            }
            deleteProvince(province._id)

        } 
        catch (error) {
            console.log(error)

        }
    }

    return(
        <Table.Row>
            <Table.Cell>{province.name}</Table.Cell>
            <Table.Cell>
                <div className='flex justify-end space-x-4'>
                    <Link href='/tech-admin/provinces/[name]' as={`/tech-admin/provinces/${slugify(province.name)}`}>
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