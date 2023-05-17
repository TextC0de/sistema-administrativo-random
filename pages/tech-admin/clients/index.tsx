import { type GetServerSidePropsContext } from 'next'
import ClientTable from 'frontend/components/Tables/ClientTable'
import dbConnect from 'lib/dbConnect'
import { formatIds } from 'lib/utils'
import { type IClient } from 'backend/models/interfaces'
import Client from 'backend/models/Client'
import TitleButton from 'frontend/components/TitleButton'

interface props {
	clients: IClient[]
}

export default function Clients({ clients }: props): JSX.Element {
	return (
		<>
			<TitleButton title="Clientes" path="/tech-admin/clients/new" nameButton="Agregar cliente" />
			<ClientTable clients={clients} />
		</>
	)
}

export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<{ props: props }> {
	await dbConnect()
	const docClients = await Client.findUndeleted({})
	const clients = formatIds(docClients)
	return { props: { clients } }
}
