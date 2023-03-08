import { AlertType } from "frontend/context/alertContext/AlertProvider";
import { BsCheckLg, BsX} from 'react-icons/bs'
import {AiOutlineWarning, AiOutlineInfoCircle} from 'react-icons/ai'
interface props{
  message:string,
  type:AlertType
}

export default function Alert ({message, type}:props){
  
  function Icon(){
    switch (type) {
      case 'Success':
        return (<BsCheckLg color="green" size={15}/>)
      case 'Failure':
        return (<AiOutlineWarning color="red" />)
      case 'Info':
        return (<AiOutlineInfoCircle color="blue"/>)
    }
  }

  function color(){
    switch (type) {
      case 'Success':
        return 'green'
      case 'Failure':
        return 'red'
      case 'Info':
        return 'blue'
    }
  }
  
  return(
        <div className={`fixed right-0 bottom-0 bg-${color()}-200 flex justify-between items-center shadow-lg rounded-lg border border-${color()}-500 w-96 p-2 m-4`}>
          <div className="pl-6">
            <Icon />  
          </div>
          <div className={`text-${color()}-900`}>
            {message}
          </div>
          <button>
            <BsX size={20} color={color()}/>
          </button>
        </div>
    )
}