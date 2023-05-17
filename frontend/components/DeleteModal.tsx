import { Button, Modal } from 'flowbite-react'
import { BsExclamationCircle } from 'react-icons/bs'

interface props {
    openModal: boolean
    handleToggleModal: () => void
    handleDelete: () => void
}

export default function DeleteModal({ openModal, handleToggleModal, handleDelete }: props) {
    // console.log(openModal)
    const handleDeleteOK = () => {
        handleDelete()
        handleToggleModal()
    }
    return (
        <>
            <Modal
            show={openModal}
            size="md"
            popup={true}
            onClose={handleToggleModal}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="flex flex-col items-center gap-4">
                        <BsExclamationCircle size={40} color={'gray'} />
                        <h3 className="mb-1 text-lg font-normal text-gray-500 dark:text-gray-400">
                            ¿Seguro que desea eliminar esta tarea?
                        </h3>
                        <div className="flex gap-4 justify-center">
                            <Button
                                color="failure"
                                onClick={handleDeleteOK}
                            >
                                Si, aceptar.
                            </Button>
                            <Button
                                color="gray"
                                onClick={handleToggleModal}
                            >
                                No, cancelar.
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    )
}
