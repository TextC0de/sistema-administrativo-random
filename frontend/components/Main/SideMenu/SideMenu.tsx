import useUser from 'frontend/hooks/useUser'
import { RiDashboardFill, 
        RiTestTubeLine, 
        RiTaskLine , 
        RiBuilding3Line, 
        RiMapPinLine, 
        RiMapPin2Fill, 
        RiGroupLine, 
        RiFileWarningLine, 
        RiCustomerService2Line} from "react-icons/ri";
import Item from './Item';


export default function SideMenu(){
    const {user} = useUser()
    

    return (
        <div className="flex flex-col fixed items-center w-52 h-full overflow-hidden text-gray-400 bg-gray-900">
            <div className="w-full px-1">
                <Item title={"Dashboard"} path={'/'} icon={<RiDashboardFill />} />
                <Item title={"Testing"} path={'/test'} icon={<RiTestTubeLine/>} />
                {user?.roles?.includes('Administrativo Tecnico') &&
                    <div className="flex flex-col items-center w-full mt-1 border-t border-gray-700">
                        <Item title={"Tareas"} path={'/tech-admin/tasks'} icon={<RiTaskLine />} />   
                        <Item title={"Preventivos"} path={'/tech-admin/preventives'} icon={<RiFileWarningLine />} />   
                        <Item title={"Clientes"} path={'/tech-admin/clients'} icon={<RiCustomerService2Line />} />   
                        <Item title={"Empresas"} path={'/tech-admin/businesses'} icon={<RiBuilding3Line />} />   
                        <Item title={"Provincias"} path={'/tech-admin/provinces'} icon={<RiMapPinLine />} />
                        <Item title={"Localidades"} path={'/tech-admin/cities'} icon={<RiMapPin2Fill />} />
                        <Item title={"Usuarios"} path={'/tech-admin/users'} icon={<RiGroupLine />} />                    
                    </div>
                }
            </div>

        </div>
    )
}