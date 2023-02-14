import { Button, Table } from 'flowbite-react'
import { IUser } from 'backend/models/interfaces'
import {BsFillPencilFill, BsFillTrashFill} from 'react-icons/bs'
import {CgPassword} from 'react-icons/cg'
import Link from 'next/link'
import * as apiEndpoints from 'lib/apiEndpoints'
import { useRouter } from 'next/router'
import mongoose from 'mongoose'
import { slugify } from 'lib/utils'
interface props{
    user:IUser,
    deleteUser: (id:string | mongoose.Types.ObjectId) => void
}

export default function Item({user, deleteUser}:props){

    const deleteData = async () => {
        //console.log('deleting');
        const contentType = 'application/json'
        
        try {
            const res: Response = await fetch(apiEndpoints.techAdmin.users, {
                method: 'DELETE', 
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                    },
                body:JSON.stringify({_id:user._id})
            })

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                console.log(res);
                throw new Error('failed to delete User')
            }
            deleteUser(user._id)

        } 
        catch (error) {
            console.log(error)

        }
    }

    async function reGeneratePassword(){
        const contentType = 'application/json'
        
        try {
            const res: Response = await fetch(apiEndpoints.techAdmin.users + 'new-password', {
                method: 'PUT', 
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                    },
                body:JSON.stringify({_id:user._id})
            })

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                console.log(res);
                throw new Error('failed to generate a new password for the user')
            }
        } 
        catch (error) {
            console.log(error)

        }
    }

    return(
        <Table.Row className='border-b '>
            <Table.Cell>{user.fullName}</Table.Cell>
            <Table.Cell>{user.city?`${user.city?.name}, ${user.city?.province.name}`:''}</Table.Cell>
            <Table.Cell>{(user.roles?.length as number) > 1 ? user.roles?.map(role=> `${role}, `) : user.roles?.[0]}</Table.Cell>
            <Table.Cell>
            <div className='flex justify-center gap-2 items-center'>
                    <Link href='/tech-admin/users/[id]' as={`/tech-admin/users/${user._id}`}>
                        <button className='p-0.5 hover:bg-gray-200 rounder-lg' >
                            <BsFillPencilFill color="gray" size="15"/>
                        </button>
                    </Link>
                    <button className='p-0.5 hover:bg-gray-200 rounder-lg' onClick={deleteData}>
                        <BsFillTrashFill color="gray" size="15"/>
                    </button>   
                    <button className='p-0.5 hover:bg-gray-200 rounder-lg' onClick={reGeneratePassword}>
                        <CgPassword color='gray' size='15'/>
                    </button>
                </div>
            </Table.Cell>
        </Table.Row>
    )
}