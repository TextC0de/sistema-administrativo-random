import { type IBusiness } from 'backend/models/interfaces'
import * as apiEndpoints from 'lib/apiEndpoints'
import { slugify } from 'lib/utils'
import fetcher from 'lib/fetcher'
import useLoading from 'frontend/hooks/useLoading'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs'
import { Table } from 'flowbite-react'
import Modal from 'frontend/components/Modal'
import useAlert from 'frontend/hooks/useAlert'

interface props {
	business: IBusiness
	deleteBusiness: (id: string) => void
}

export default function Item({ business, deleteBusiness }: props): JSX.Element {
	const router = useRouter()
	const { startLoading, stopLoading } = useLoading()
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
			await fetcher.delete({ _id: business._id }, apiEndpoints.techAdmin.businesses)
			deleteBusiness(business._id as string)
			triggerAlert({ type: 'Success', message: `La empresa ${business.name} fue eliminada correctamente` })
		} catch (error) {
			console.log(error)
			triggerAlert({
				type: 'Failure',
				message: `No se pudo eliminar la empresa ${business.name}, compruebe la conexión a internet`
			})
		}
	}

	async function navigateEdit(): Promise<void> {
		startLoading()
		await router.push(`/tech-admin/businesses/${slugify(business.name)}`)
		stopLoading()
	}

	const handleDelete = (): void => {
		void deleteData()
	}

	const handleNavigateEdit = (): void => {
		void navigateEdit()
	}

	return (
		<Table.Row className="border-b">
			<Table.Cell>{business.name}</Table.Cell>
			<Table.Cell className="w-40">
				<div className="flex justify-center gap-2 items-center">
					<button className="p-0.5 hover:bg-gray-200 rounder-lg" onClick={handleNavigateEdit}>
						<BsFillPencilFill color="gray" size="15" />
					</button>
					<button className="p-0.5 hover:bg-gray-200 rounder-lg" onClick={openModal}>
						<BsFillTrashFill color="gray" size="15" />
					</button>
					<Modal openModal={modal} handleToggleModal={closeModal} handleDelete={handleDelete} />
				</div>
			</Table.Cell>
		</Table.Row>
	)
}
