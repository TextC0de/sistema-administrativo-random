import { Role, roles } from 'backend/models/types';
import useUser from 'frontend/hooks/useUser'
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { IconType } from 'react-icons/lib';
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

interface IItem{
    id:number,
    title:string,
    path:string,
    icon:JSX.Element,
    toggle:boolean,
    role:string,
}

const items:IItem[] = [
    {id:1,title:'Dashboard', path:'/', icon:<RiDashboardFill />, toggle:false, role:''},
    {id:2,title:'Testing', path:'/test', icon:<RiTestTubeLine/>, toggle:false, role:''},    
    {id:3,title:'Tareas', path:'/tech-admin/tasks', icon:<RiTaskLine />, toggle:false, role:'Administrativo Tecnico'},
    {id:4,title:"Preventivos", path:'/tech-admin/preventives', icon:<RiFileWarningLine />, toggle:false, role:'Administrativo Tecnico'},
    {id:5,title:"Clientes", path:'/tech-admin/clients', icon:<RiCustomerService2Line />, toggle:false, role:'Administrativo Tecnico'},
    {id:6,title:"Empresas", path:'/tech-admin/businesses', icon:<RiBuilding3Line />, toggle:false, role:'Administrativo Tecnico'},
    {id:7,title:"Provincias", path:'/tech-admin/provinces', icon:<RiMapPinLine />, toggle:false, role:'Administrativo Tecnico'},
    {id:8,title:"Localidades", path:'/tech-admin/cities', icon:<RiMapPin2Fill />, toggle:false, role:'Administrativo Tecnico'},
    {id:9,title:"Usuarios", path:'/tech-admin/users', icon:<RiGroupLine />, toggle:false, role:'Administrativo Tecnico'},
]

export default function SideMenu(){
    const {user} = useUser()
    const [sideMenu, setSideMenu] = useState(items)
    
    function selectItem(id:number){
        setSideMenu(sideMenu.map(item => item.id===id? {...item, toggle:true} : {...item, toggle:false}))
    }

    return (
        <div className="flex flex-col fixed items-center w-52 h-full overflow-hidden text-gray-400 bg-gray-900">
            <div className="w-full px-1">
                <>
                    {
                        sideMenu.map((item:IItem, index:number)=> {
                            if(item.role==='') return <Item key={index} selectItem={selectItem} {...item}/>                    
                        })
                    }
                    {
                        roles.map(role =>{
                            return(
                                role != 'Tecnico' && user?.roles?.includes(role) &&
                                <div className="flex flex-col items-center w-full mt-1 border-t border-gray-700">
                                    {sideMenu.map((item:IItem, index:number) => {
                                        if(user.roles?.includes(item.role as Role) && item.role === role) return <Item key={index} selectItem={selectItem} {...item} /> 
                                    })}
                                </div>
                            )
                        })
                    }
                </>
            </div>

        </div>
    )
}