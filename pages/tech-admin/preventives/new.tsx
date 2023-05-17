import Branch from 'backend/models/Branch'
import Business from 'backend/models/Business'
import Client from 'backend/models/Client'
import { type IBranch, type IBusiness, type IClient, type IUser } from 'backend/models/interfaces'
import User from 'backend/models/User'
import dbConnect from 'lib/dbConnect'
import { formatIds } from 'lib/utils'
import { type GetServerSidePropsContext } from 'next'
import PreventiveForm, { type IPreventiveForm } from 'frontend/components/Forms/TechAdmin/PreventiveForm'
import { type Month } from 'backend/models/types'

interface props {
	branches: IBranch[]
	clients: IClient[]
	businesses: IBusiness[]
	technicians: IUser[]
}

export default function NewTask(props: props): JSX.Element {
	const preventiveForm: IPreventiveForm = {
		_id: '',
		branch: {} as IBranch,
		business: {} as IBusiness,
		assigned: [] as IUser[],
		months: [] as Month[],
		status: 'Pendiente'
	}

	return (
		<>
			<PreventiveForm preventiveForm={preventiveForm} {...props} />
		</>
	)
}

export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<{ props: props }> {
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
