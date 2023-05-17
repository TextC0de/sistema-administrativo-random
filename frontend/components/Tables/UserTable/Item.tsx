import { type IProvince, type IUser } from 'backend/models/interfaces'
import * as apiEndpoints from 'lib/apiEndpoints'
import fetcher from 'lib/fetcher'
import useLoading from 'frontend/hooks/useLoading'
import { useRouter } from 'next/router'
import useAlert from 'frontend/hooks/useAlert'
import { useState } from 'react'
import { Table } from 'flowbite-react'
import { CgPassword } from 'react-icons/cg'
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs'
import Modal from 'frontend/components/Modal'

interface props {
    user: IUser
    deleteUser: (id: string) => void
}

export default function Item({ user, deleteUser }: props): JSX.Element {
    const { startLoading, stopLoading } = useLoading()
    const router = useRouter()
    const [modal, setModal] = useState(false)
    const { triggerAlert } = useAlert()

    const openModal = (): void => {
        setModal(true)
    }

    const closeModal = (): void => {
        setModal(false)
    }
    const deleteData = async (): Promise<void> => {
        try {
            await fetcher.delete({ _id: user._id }, apiEndpoints.techAdmin.users)
            deleteUser(user._id as string)
            triggerAlert({ type: 'Success', message: `El usuario ${user.firstName} ${user.lastName} fue eliminado correctamente` })
        } catch (error) {
            console.log(error)
            triggerAlert({ type: 'Failure', message: `No se pudo eliminar el usuario ${user.firstName} ${user.lastName}` })
        }
    }

    async function navigateEdit(): Promise<void> {
        startLoading()
        await router.push(`/tech-admin/users/${user._id as string}`)
        stopLoading()
    }

    async function reGeneratePassword(): Promise<void> {
        try {
            startLoading()
            await fetcher.put({ _id: user._id }, apiEndpoints.techAdmin.users as string + 'new-password')
            triggerAlert({ type: 'Success', message: `Se generó una nueva contraseña para ${user.fullName as string} correctamente` })
            stopLoading()
        } catch (error) {
            console.log(error)
            stopLoading()
            triggerAlert({ type: 'Failure', message: `No se pudo generar una nueva contraseña para ${user.fullName as string}` })
        }
    }

    const handleDelete = (): void => {
        void deleteData()
    }

    const handleNavigate = (): void => {
        void navigateEdit()
    }

    const handleRegeneratePassword = (): void => {
        void reGeneratePassword()
    }
    return (
        <Table.Row className='border-b '>
            <Table.Cell>{user.fullName}</Table.Cell>
            <Table.Cell>{(user.city != null) ? `${user.city?.name}, ${(user.city?.province as IProvince).name}` : ''}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{(user.roles?.length as number) > 1 ? user.roles?.map(role => `${role}, `) : user.roles?.[0]}</Table.Cell>
            <Table.Cell>
            <div className='flex justify-center gap-2 items-center'>
                    <button className='p-0.5 hover:bg-gray-200 rounder-lg' onClick={handleNavigate}>
                        <BsFillPencilFill color="gray" size="15"/>
                    </button>
                    <button className='p-0.5 hover:bg-gray-200 rounder-lg' onClick={openModal}>
                        <BsFillTrashFill color="gray" size="15"/>
                    </button>
                    <button className='p-0.5 hover:bg-gray-200 rounder-lg' onClick={handleRegeneratePassword}>
                        <CgPassword color='gray' size='15'/>
                    </button>
                    <Modal openModal={modal} handleToggleModal={closeModal} handleDelete={handleDelete}/>
                </div>
            </Table.Cell>
        </Table.Row>
    )
}
