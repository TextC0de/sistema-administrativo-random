import { Table } from 'flowbite-react'
import { type IClient } from 'backend/models/interfaces'
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs'
import { HiMagnifyingGlassPlus } from 'react-icons/hi2'
import Link from 'next/link'
import * as apiEndpoints from 'lib/apiEndpoints'
import { useRouter } from 'next/router'
import { slugify } from 'lib/utils'
import fetcher from 'lib/fetcher'
import useLoading from 'frontend/hooks/useLoading'
import { useState } from 'react'
import Modal from 'frontend/components/Modal'
import useAlert from 'frontend/hooks/useAlert'

interface props {
    client: IClient
    deleteClient: (id: string) => void
}

export default function Item({ client, deleteClient }: props) {
    const { startLoading, stopLoading } = useLoading()
    const [modal, setModal] = useState(false)
    const { triggerAlert } = useAlert()
    const openModal = () => {
        setModal(true)
    }
    const closeModal = () => {
        setModal(false)
    }

    const router = useRouter()

    async function handleClick() {
        startLoading()
        await router.push(`/tech-admin/clients/${slugify(client.name)}/branches`)
        stopLoading()
    }

    async function navigateEdit() {
        startLoading()
        await router.push(`/tech-admin/clients/${slugify(client.name)}/edit`)
        stopLoading()
    }

    const deleteData = async () => {
        try {
            await fetcher.delete({ _id: client._id }, apiEndpoints.techAdmin.clients)
            deleteClient(client._id as string)
            triggerAlert({ type: 'Success', message: `Se elimino el cliente ${client.name}` })
        } catch (error) {
            console.log(error)
            triggerAlert({ type: 'Failure', message: `No se pudo eliminar el cliente ${client.name}` })
        }
    }

    return (
        <Table.Row className='border-b'>
            <Table.Cell>{client.name}</Table.Cell>
            <Table.Cell>
                <div className='flex justify-center gap-2 items-center'>
                    <button className='p-0.5 hover:bg-gray-200 rounder-lg' onClick={handleClick}>
                        <HiMagnifyingGlassPlus color="gray" size="15"/>
                    </button>
                    <button className='p-0.5 hover:bg-gray-200 rounder-lg' onClick={navigateEdit}>
                        <BsFillPencilFill color="gray" size="15"/>
                    </button>
                    <button className='p-0.5 hover:bg-gray-200 rounder-lg' onClick={openModal}>
                        <BsFillTrashFill color="gray" size="15"/>
                    </button>
                    <Modal openModal={modal} handleToggleModal={closeModal} handleDelete={deleteData}/>
                </div>
            </Table.Cell>
        </Table.Row>
    )
}
