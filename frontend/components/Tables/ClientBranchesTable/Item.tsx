import { Button, Table } from 'flowbite-react'
import { IBranch } from 'backend/models/interfaces'
import {BsFillPencilFill, BsFillTrashFill} from 'react-icons/bs'
import Link from 'next/link'
import * as apiEndpoints from 'lib/apiEndpoints'
import { useRouter } from 'next/router'
import mongoose from 'mongoose'
import fetcher from 'lib/fetcher'
import useLoading from 'frontend/hooks/useLoading'

interface props{
    branch:IBranch,
    deleteBranch: (id:string | mongoose.Schema.Types.ObjectId) => void
}

export default function Item({branch, deleteBranch}:props){
    const {startLoading, stopLoading} = useLoading()
    const router = useRouter()

    const deleteData = async () => {
        try {
            await fetcher.delete({_id:branch._id}, apiEndpoints.techAdmin.branches)
            deleteBranch(branch._id as string)

        } 
        catch (error) {
            console.log(error)
        }
    }

    async function navigateEdit(){
        startLoading()
        await router.push(`/tech-admin/clients/${branch.client.name}/branches/${branch.number}`)
        stopLoading()
    }

    return(
        <Table.Row>
            <Table.Cell>{branch.number}</Table.Cell>
            <Table.Cell>{`${branch.city.name}, ${branch.city.province.name}`}</Table.Cell>
            <Table.Cell>
                <div className='flex justify-end space-x-4'>
                    <Button outline={true} className='flex justify-evenly' onClick={navigateEdit}>
                        <BsFillPencilFill/>
                        <h4>Editar</h4>
                    </Button>
                    <Button outline={true} className='flex justify-evenly' onClick={deleteData}>
                        <BsFillTrashFill/>
                        <h4>Borrar</h4>
                    </Button>
                </div>
            </Table.Cell>
        </Table.Row>
    )
}