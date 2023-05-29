import { type IProvince, type ICity } from 'backend/models/interfaces'
import * as apiEndpoints from 'lib/apiEndpoints'
import { slugify } from 'lib/utils'
import fetcher from 'lib/fetcher'
import useLoading from 'frontend/hooks/useLoading'
import { useState } from 'react'
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs'
import { Table } from 'flowbite-react'
import Modal from 'frontend/components/Modal'
import { useRouter } from 'next/router'
import useAlert from 'frontend/hooks/useAlert'

interface props {
	city: ICity
	deleteCity: (id: string) => void
}

export default function Item({ city, deleteCity }: props): JSX.Element {
	const router = useRouter()
	const [modal, setModal] = useState(false)
	const openModal = (): void => {
		setModal(true)
	}
	const closeModal = (): void => {
		setModal(false)
	}
	const { startLoading, stopLoading } = useLoading()
	const { triggerAlert } = useAlert()

	const deleteData = async (): Promise<void> => {
		try {
			await fetcher.delete({ _id: city._id }, apiEndpoints.techAdmin.cities)
			deleteCity(city._id as string)
			triggerAlert({ type: 'Success', message: `La empresa ${city.name} fue eliminada correctamente` })
		} catch (error) {
			console.log(error)
			triggerAlert({
				type: 'Failure',
				message: `No se pudo eliminar la empresa ${city.name}, compruebe la conexión a internet`
			})
		}
	}

	async function navigateEdit(): Promise<void> {
		startLoading()
		await router.push(`/tech-admin/cities/${slugify(city.name)}`)
		stopLoading()
	}

	const handleNavigateEdit = (): void => {
		void navigateEdit()
	}

	const handleDelete = (): void => {
		void deleteData()
	}

	return (
		<Table.Row className="border-b">
			<Table.Cell>{city.name}</Table.Cell>
			<Table.Cell>{(city.province as IProvince).name}</Table.Cell>
			<Table.Cell>
				<div className="flex justify-center gap-2 items-center">
					<button className="p-0.5 hover:bg-gray-200 rounder-lg" onClick={handleNavigateEdit}>
						<BsFillPencilFill color="gray" size="15" />
					</button>
					<button className="p-0.5 hover:bg-gray-200 rounder-lg" onClick={openModal}>
						<BsFillTrashFill color="gray" size="15" />
					</button>
					<Modal openModal={modal} handleToggleModal={closeModal} action={handleDelete} msg='¿Seguro que quiere eliminar esta ciudad?'/>
				</div>
			</Table.Cell>
		</Table.Row>
	)
}
