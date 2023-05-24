import { type GetServerSidePropsContext } from 'next'
import TechAdminTaskTable from 'frontend/components/Tables/TaskTable/TechAdminTaskTable'
import dbConnect from 'lib/dbConnect'
import { formatIds } from 'lib/utils'
import {
	type IBusiness,
	type ICity,
	type IClient,
	type IProvince,
	type ITask,
	type IUser
} from 'backend/models/interfaces'
import Task from 'backend/models/Task'
import TitleButton from 'frontend/components/TitleButton'
import Business from 'backend/models/Business'
import User from 'backend/models/User'
import Client from 'backend/models/Client'
import Province from 'backend/models/Province'
import City from 'backend/models/City'

interface props {
	tasks: ITask[]
	cities: ICity[]
	provinces: IProvince[]
	clients: IClient[]
	businesses: IBusiness[]
	techs: IUser[]
}

export default function TechAdminTasks(props: props): JSX.Element {
	return (
		<>
			<TitleButton title="Tareas pendientes" path="/tech-admin/tasks/new" nameButton="Delegar tarea" />
			<TechAdminTaskTable {...props} />
		</>
	)
}

export async function getServerSideProps({ req, res }: GetServerSidePropsContext): Promise<{ props: props }> {
	res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=59')
	await dbConnect()
	const allTasks = await Task.findUndeleted({})
	if (allTasks === null) return { props: {} as props }
	const pendingTasks = allTasks.filter((task) => task.status === 'Pendiente')
	const sentTasks = allTasks.filter((task) => task.status === 'Enviado')
	const tasks = pendingTasks.concat(sentTasks)
	const cities = await City.findUndeleted()
	const provinces = await Province.findUndeleted()
	const clients = await Client.findUndeleted()
	const businesses = await Business.findUndeleted()
	const techs = await User.findUndeleted({ roles: 'Tecnico' })
	const props = formatIds({ tasks, cities, provinces, clients, businesses, techs })
	return { props }
}
