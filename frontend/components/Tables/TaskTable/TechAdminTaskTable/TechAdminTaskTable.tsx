import {
	type IBusiness,
	type ICity,
	type IClient,
	type IProvince,
	type ITask,
	type IUser
} from 'backend/models/interfaces'
import Item from './Item'
import { Table } from 'flowbite-react'
import { type ChangeEvent, useState } from 'react'
import Filter from 'frontend/components/Filter'
import type { TaskStatus } from 'backend/models/types'

interface props {
	tasks: ITask[]
	cities: ICity[]
	provinces: IProvince[]
	clients: IClient[]
	businesses: IBusiness[]
	techs: IUser[]
}

export default function TechAdminTaskTable({
	tasks,
	cities,
	provinces,
	clients,
	businesses,
	techs
}: props): JSX.Element {
	const [tableTasks, setTableTasks] = useState<ITask[]>(tasks)
	const [type, setType] = useState<string>('')
	const [entities, setEntities] = useState<any[]>([] as any[])
	const filterTypes = ['Localidad', 'Provincia', 'Tecnico', 'Empresa', 'Cliente']

	function selectEntity(e: ChangeEvent<HTMLSelectElement>): void {
		const { value } = e.target
		switch (type) {
			case 'Localidad':
				setTableTasks(tasks.filter((task) => task.branch.city.name === value))
				break
			case 'Provincia':
				setTableTasks(tasks.filter((task) => (task.branch.city.province as IProvince).name === value))
				break
			case 'Tecnico':
				setTableTasks(tasks.filter((task) => task.assigned.some((tech) => tech.fullName === value)))
				break
			case 'Empresa':
				setTableTasks(tasks.filter((task) => task.business.name === value))
				break
			case 'Cliente':
				setTableTasks(tasks.filter((task) => task.branch.client.name === value))
				break
			default:
				setTableTasks(tasks)
				break
		}
	}

	function selectType(e: ChangeEvent<HTMLSelectElement>): void {
		const { value } = e.target
		setType(value)
		switch (value) {
			case 'Localidad':
				setEntities(cities)
				break
			case 'Provincia':
				setEntities(provinces)
				break
			case 'Tecnico':
				setEntities(techs)
				break
			case 'Empresa':
				setEntities(businesses)
				break
			case 'Cliente':
				setEntities(clients)
				break
			default:
		}
	}

	function clearFilter(): void {
		setType('')
		setEntities([] as any[])
		setTableTasks(tasks)
	}

	const deleteTask = (id: string): void => {
		setTableTasks(tableTasks.filter((task) => task._id !== id))
	}

	const changeTaskStatus = (id: string, status: TaskStatus): void => {
		setTableTasks(tableTasks.map(task => task._id === id ? { ...task, status } : task))
	}

	return (
		<div className="bg-white sm:rounded-none shadow-gray-100">
			<Filter
				types={filterTypes}
				entities={entities}
				selectType={selectType}
				selectEntity={selectEntity}
				clearFilter={clearFilter}
			/>
			<div className='relative overflow-visible'>
				<Table hoverable={true} className="bg-white z-10">
					<Table.Head className="bg-white border-b">
						<Table.HeadCell>Fecha apertura</Table.HeadCell>
						<Table.HeadCell>Empresa</Table.HeadCell>
						<Table.HeadCell>Cliente</Table.HeadCell>
						<Table.HeadCell>Sucursal</Table.HeadCell>
						<Table.HeadCell>Tecnico Asignado</Table.HeadCell>
						<Table.HeadCell>Tipo</Table.HeadCell>
						<Table.HeadCell>Estado</Table.HeadCell>
						<Table.HeadCell>Fecha cierre</Table.HeadCell>
						<Table.HeadCell>Acciones</Table.HeadCell>
					</Table.Head>
					<Table.Body className="bg-white">
						{tableTasks.map((task, index) => (
							<Item key={index} task={task} deleteTask={deleteTask} changeStatus={changeTaskStatus}/>
							))}
					</Table.Body>
				</Table>
			</div>
		</div>
	)
}
