import { type AlertType } from 'frontend/context/alertContext/AlertProvider'
import { BsCheckLg, BsX } from 'react-icons/bs'
import { AiOutlineWarning, AiOutlineInfoCircle } from 'react-icons/ai'
import useAlert from 'frontend/hooks/useAlert'

interface props {
	message: string
	type: AlertType
	id: string
}

export default function Alert({ message, type, id }: props): JSX.Element {
	function Icon(): JSX.Element {
		switch (type) {
			case 'Success':
				return <BsCheckLg color="green" size={15} />
			case 'Failure':
				return <AiOutlineWarning color="red" />
			case 'Info':
				return <AiOutlineInfoCircle color="blue" />
		}
	}

	function color(): string {
		switch (type) {
			case 'Success':
				return 'green'
			case 'Failure':
				return 'red'
			case 'Info':
				return 'blue'
		}
	}
	const { removeAlert } = useAlert()

	return (
		<div
			className={`fixed right-0 bottom-0 bg-${color()}-200 flex justify-between items-center shadow-lg rounded-lg border border-${color()}-500 w-96 p-2 m-4`}
		>
			<div className="pl-6">
				<Icon />
			</div>
			<div className="px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200">
				<div className={`text-${color()}-900`}>{message}</div>
				<button onClick={() => removeAlert(id)}>
					<BsX size={20} color={color()} />
				</button>
			</div>
		</div>
	)
}
