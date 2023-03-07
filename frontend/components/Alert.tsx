import { BsCheckLg, BsX } from "react-icons/bs";

export default function Alert (){
    return(
        <div className="flex w-96 shadow-lg rounded-lg">
        <div className="bg-green-600 py-4 px-6 rounded-l-lg flex items-center">
          <BsCheckLg />
        </div>
        <div className="px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200">
          <div>Tarea creada con exito</div>
          <button>
            <BsX />
          </button>
        </div>
      </div>
    )
}