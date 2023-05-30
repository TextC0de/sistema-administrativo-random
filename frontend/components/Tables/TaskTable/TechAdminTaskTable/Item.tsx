import { type IProvince, type ITask, type IUser } from 'backend/models/interfaces'
import { dmyDateString } from 'lib/utils'
import fetcher from 'lib/fetcher'
import * as api from 'lib/apiEndpoints'
import { useRouter } from 'next/router'
import useLoading from 'frontend/hooks/useLoading'
import { useState } from 'react'
import { Table } from 'flowbite-react'
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs'
import Modal from 'frontend/components/Modal'
import useAlert from 'frontend/hooks/useAlert'
import { type TaskStatus } from 'backend/models/types'
import TaskStatusDropdown from 'frontend/components/Common/TaskStatusDropdown'

interface props {
	task: ITask
	deleteTask: (id: string) => void
	changeStatus: (id: string, status: TaskStatus) => void
}
export default function Item({ task, deleteTask, changeStatus }: props): JSX.Element {
	const openedAt = dmyDateString(new Date(task.openedAt))
	const closedAt = task.closedAt !== undefined ? dmyDateString(new Date(task.closedAt)) : task.closedAt
	const [modal, setModal] = useState(false)
	const { triggerAlert } = useAlert()
	const { startLoading, stopLoading } = useLoading()
	const router = useRouter()

	async function navigateEdit(): Promise<void> {
		startLoading()
		await router.push(`/tech-admin/tasks/${task._id as string}`)
		stopLoading()
	}

	function selectedTechs(techs: IUser[]): string[] | string | undefined {
		return techs.length > 1 ? techs.map((tech) => `${tech.fullName as string}, `) : techs[0].fullName
	}

	const openModal = (): void => {
		setModal(true)
	}
	const closeModal = (): void => {
		setModal(false)
	}

	const deleteData = async (): Promise<void> => {
		try {
			await fetcher.delete({ _id: task._id }, api.techAdmin.tasks)
			deleteTask(task._id as string)
			triggerAlert({
				type: 'Success',
				message: `La tarea de ${task.business.name} en la sucursal ${task.branch.number} de ${task.branch.client.name} fue eliminada correctamente`
			})
		} catch (error) {
			console.log(error)
			triggerAlert({
				type: 'Failure',
				message: `No se pudo eliminar la tarea de ${task.business.name} para la sucursal ${task.branch.number} de ${task.branch.client.name}`
			})
		}
	}

	const changeTaskStatus = async (status: TaskStatus): Promise<void> => {
		try {
			await fetcher.put({ ...task, status }, api.techAdmin.tasks)
			changeStatus(task._id as string, status)
			triggerAlert({
				type: 'Success',
				message: 'El estado de la tarea fue actualizado correctamente'
			})
		} catch (error) {
			console.log(error)
			triggerAlert({
				type: 'Failure',
				message: 'No se pudo actualizar el estado de la tarea'
			})
		}
	}

	const handleStatusChange = (status: TaskStatus): void => {
		void changeTaskStatus(status)
	}

	const handleNavigateEdit = (): void => {
		void navigateEdit()
	}

	const handleDelete = (): void => {
		void deleteData()
	}

	return (
		<>
			<Table.Row className="border-b static inset-0">
				<Table.Cell>{openedAt}</Table.Cell>
				<Table.Cell>{task.business.name}</Table.Cell>
				<Table.Cell>{task.branch.client.name}</Table.Cell>
				<Table.Cell>{`${task.branch.number}, ${task.branch.city.name}, ${
					(task.branch.city.province as IProvince).name
				}`}</Table.Cell>
				<Table.Cell>{selectedTechs(task.assigned)}</Table.Cell>
				<Table.Cell>{task.taskType}</Table.Cell>
				<Table.Cell>
					<TaskStatusDropdown setStatus={handleStatusChange} status={task.status}/>
				</Table.Cell>
				<Table.Cell>{closedAt ?? ''}</Table.Cell>
				<Table.Cell>
					<div className="flex justify-evenly items-center">
						<button className="p-0.5 hover:bg-gray-200 rounder-lg" onClick={handleNavigateEdit}>
							<BsFillPencilFill color="gray" size="15" />
						</button>
						<button onClick={openModal} className="p-0.5 hover:bg-gray-200 rounder-lg">
							<BsFillTrashFill color="gray" size="15" />
						</button>
					</div>
				</Table.Cell>
			</Table.Row>
			<Modal openModal={modal} handleToggleModal={closeModal} action={handleDelete} msg='¿Seguro que quiere eliminar esta tarea?'/>
		</>
	)
}
