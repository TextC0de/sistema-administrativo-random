import Link from 'next/link'
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
        <div className="flex flex-col items-center w-52 h-full overflow-hidden text-gray-400 bg-gray-900">
            <div className="w-full px-1">
                <Item title={"Dashboard"} path={'/'}>
                    <RiDashboardFill />
                </Item>
                <Item title={"Testing"} path={'/test'}>
                    <RiTestTubeLine />
                </Item>

                {user?.roles?.includes('Administrativo Tecnico') &&
                    <div className="flex flex-col items-center w-full mt-1 border-t border-gray-700">
                        <Item title={"Tareas"} path={'/tech-admin/tasks'}>
                            <RiTaskLine />
                        </Item>
                        <Item title={"Preventivos"} path={'/tech-admin/preventives'}>
                            <RiFileWarningLine />
                        </Item>
                        <Item title={"Clientes"} path={'/tech-admin/clients'}>
                            <RiCustomerService2Line />
                        </Item>
                        <Item title={"Empresas"} path={'/tech-admin/businesses'}>
                            <RiBuilding3Line />
                        </Item>
                        <Item title={"Provincias"} path={'/tech-admin/provinces'}>
                            <RiMapPinLine />
                        </Item>
                        <Item title={"Localidades"} path={'/tech-admin/cities'}>
                            <RiMapPin2Fill />
                        </Item>
                        <Item title={"Usuarios"} path={'/tech-admin/users'}>
                            <RiGroupLine />
                        </Item>
                        
                    </div>
                }
            </div>

        </div>
    )
}