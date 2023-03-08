import { AlertType } from "frontend/context/alertContext/AlertProvider";
import {AiOutlineWarning, BsCheckLg, BsX, AiOutlineInfoCircle} from 'react-icons/all'

interface props{
  message:string,
  type:AlertType
}

export default function Alert ({message, type}:props){
  
  function Icon(){
    switch (type) {
      case 'Success':
        return (<BsCheckLg />)
      case 'Failure':
        return (<AiOutlineWarning />)
      case 'Info':
        return (<AiOutlineInfoCircle />)
    }
  }

  function color(){
    switch (type) {
      case 'Success':
        return 'bg-green-600'
      case 'Failure':
        return 'bg-red-600'
      case 'Info':
        return 'bg-blue-600'
    }
  }
  
  return(
        <div className="flex w-96 shadow-lg rounded-lg">
          <div className={` ${color()} py-4 px-6 rounded-l-lg flex items-center`}>
            <Icon />
          </div>
          <div className="px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200">
            <div>{message}</div>
            <button>
              <BsX />
            </button>
          </div>
        </div>
    )
}