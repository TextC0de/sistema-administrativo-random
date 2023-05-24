import Branch from 'backend/models/Branch'
import Business from 'backend/models/Business'
import Client from 'backend/models/Client'
import { type IBranch, type IBusiness, type IClient, type IUser } from 'backend/models/interfaces'
import User from 'backend/models/User'
import TechAdminTaskForm, { type ITaskForm } from 'frontend/components/Forms/TechAdmin/TechAdminTaskForm'
import dbConnect from 'lib/dbConnect'
import { formatIds } from 'lib/utils'
import { type GetServerSidePropsContext } from 'next'

interface props {
	branches: IBranch[]
	clients: IClient[]
	businesses: IBusiness[]
	technicians: IUser[]
}

export default function NewTask(props: props): JSX.Element {
	const taskForm: ITaskForm = {
		_id: '',
		branch: {} as IBranch,
		business: {} as IBusiness,
		assigned: [] as IUser[],
		taskType: '',
		openedAt: {} as Date,
		status: '',
		description: ''
	}

	return (
		<>
			<TechAdminTaskForm newTask={true} taskForm={taskForm} {...props} />
		</>
	)
}

export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<{ props: props }> {
	// ctx.res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=59')
	await dbConnect()
	const docBranches = await Branch.findUndeleted({})
	const docClients = await Client.findUndeleted({})
	const docBusinesses = await Business.findUndeleted({})
	const docTechnicians = await User.findUndeleted({ roles: 'Tecnico' })
	const branches = formatIds(docBranches)
	const clients = formatIds(docClients)
	const businesses = formatIds(docBusinesses)
	const technicians = formatIds(docTechnicians)
	return { props: { branches, clients, businesses, technicians } }
}
