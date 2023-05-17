import { type IProvince } from 'backend/models/interfaces'
import * as apiEndpoints from 'lib/apiEndpoints'
import { slugify } from 'lib/utils'
import fetcher from 'lib/fetcher'
import useLoading from 'frontend/hooks/useLoading'
import { useState } from 'react'
import { Table } from 'flowbite-react'
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs'
import Modal from 'frontend/components/Modal'
import { useRouter } from 'next/router'
import useAlert from 'frontend/hooks/useAlert'

interface props {
	province: IProvince
	deleteProvince: (id: string) => void
}

export default function Item({ province, deleteProvince }: props): JSX.Element {
	const { startLoading, stopLoading } = useLoading()
	const router = useRouter()
	const { triggerAlert } = useAlert()
	const [toggleModal, setToggleModal] = useState(false)
	function openModal(): void {
		setToggleModal(true)
	}
	function closeModal(): void {
		setToggleModal(false)
	}

	const deleteData = async (): Promise<void> => {
		try {
			await fetcher.delete({ _id: province._id }, apiEndpoints.techAdmin.provinces)
			deleteProvince(province._id as string)
			triggerAlert({ type: 'Success', message: `La provincia ${province.name} se elimino correctamente` })
		} catch (error) {
			console.log(error)
			triggerAlert({ type: 'Failure', message: `No se pudo eliminar la provincia ${province.name}` })
		}
	}

	const handleDelete = (): void => {
		void deleteData()
	}

	async function navigateEdit(): Promise<void> {
		startLoading()
		await router.push(`/tech-admin/provinces/${slugify(province.name)}`)
		stopLoading()
	}

	const handleNavigateEdit = (): void => {
		void navigateEdit()
	}

	return (
		<Table.Row className="border-b">
			<Table.Cell>{province.name}</Table.Cell>
			<Table.Cell>
				<div className="flex justify-center gap-2 items-center">
					<button className="p-0.5 hover:bg-gray-200 rounder-lg" onClick={handleNavigateEdit}>
						<BsFillPencilFill color="gray" size="15" />
					</button>
					<button className="p-0.5 hover:bg-gray-200 rounder-lg" onClick={openModal}>
						<BsFillTrashFill color="gray" size="15" />
					</button>

					<Modal openModal={toggleModal} handleToggleModal={closeModal} handleDelete={handleDelete} />
				</div>
			</Table.Cell>
		</Table.Row>
	)
}
