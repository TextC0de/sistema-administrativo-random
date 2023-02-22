import { Button} from "flowbite-react";
import { BsExclamationCircle } from "react-icons/bs";

interface props {
    openModal:boolean,
    handleToggleModal: () => void,
    handleDelete: () => void,
}


export default function Modal({openModal,handleToggleModal, handleDelete}:props){
    const handleDeleteOK = () =>{
        handleDelete()
        handleToggleModal()
    }
return(
    <>
    { openModal &&
    <div className="reletive flex items-center justify-center color-gray-600 opacity-25 blur-sm ">
        <div className="flex flex-col items-center gap-4 color-white">
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
    </div>
}</>

)

}