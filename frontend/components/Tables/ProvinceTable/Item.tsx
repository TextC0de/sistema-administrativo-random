import { Button, Table } from 'flowbite-react'
import { IProvince } from 'backend/models/interfaces'
import {BsFillPencilFill, BsFillTrashFill} from 'react-icons/bs'
import Link from 'next/link'
import * as apiEndpoints from 'lib/apiEndpoints'
import { useRouter } from 'next/router'
import mongoose from 'mongoose'
import { slugify } from 'lib/utils'
import { useState } from 'react'
import DeleteModal from 'frontend/components/DeleteModal'

interface props{
    province:IProvince,
    deleteProvince: (id:string | mongoose.Schema.Types.ObjectId) => void
}

export default function Item({province, deleteProvince}:props){
    const [toggleModal, setToggleModal] = useState(false);

    const openModal = () => {
        console.log("modal abierto")
        setToggleModal(true);
    };
    const closeModal = () => {
        console.log("modal cerrado")
        setToggleModal(false);
    };

    const handleDelete = async () =>{
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
        <Table.Row className='border-b'>
            <Table.Cell>{province.name}</Table.Cell>
            <Table.Cell>
            <div className='flex justify-center gap-2 items-center'>
                    <Link href='/tech-admin/provinces/[name]' as={`/tech-admin/provinces/${slugify(province.name)}`}>
                        <button className='p-0.5 hover:bg-gray-200 rounder-lg' >
                            <BsFillPencilFill color="gray" size="15"/>
                        </button>
                    </Link>
                    <button onClick={openModal} className='p-0.5 hover:bg-gray-200 rounder-lg' >
                        <BsFillTrashFill color="gray" size="15"/>
                    </button>       

                    <DeleteModal openModal={toggleModal} handleToggleModal={closeModal} handleDelete={handleDelete}/>
                </div>
            </Table.Cell>
        </Table.Row>
    )
}