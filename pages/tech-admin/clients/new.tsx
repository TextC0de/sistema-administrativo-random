import ClientForm, { type IClientForm } from 'frontend/components/Forms/TechAdmin/ClientForm'

export default function NewClient(): JSX.Element {
	const clientForm: IClientForm = {
		_id: '',
		name: ''
	}

	return (
		<>
			<ClientForm clientForm={clientForm} />
		</>
	)
}
