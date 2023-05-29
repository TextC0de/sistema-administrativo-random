import { Button } from 'flowbite-react'
import { BsExclamationCircle } from 'react-icons/bs'

interface props {
	openModal: boolean
	handleToggleModal: () => void
	action: () => void
	msg: string
}

export default function Modal({ openModal, handleToggleModal, action, msg }: props): JSX.Element {
	const handleOk = (): void => {
		action()
		handleToggleModal()
	}

	return (
		<>
			{openModal && (
				<div className="fixed left-0 top-0 flex items-center justify-center bg-gray-600/50 w-screen h-screen z-10">
					<div className=" bg-white p-5 rounded-md flex flex-col items-center gap-4 color-white">
						<BsExclamationCircle size={40} color={'gray'} />
						<h3 className="mb-1 text-lg font-normal text-gray-500 dark:text-gray-400">
							{msg}
						</h3>
						<div className="flex gap-4 justify-center">
							<Button color="failure" onClick={handleOk}>
								Si, aceptar.
							</Button>
							<Button color="gray" onClick={handleToggleModal}>
								No, cancelar.
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
