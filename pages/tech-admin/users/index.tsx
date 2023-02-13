import User from "backend/models/User";
import dbConnect from "lib/dbConnect";
import { formatIds } from "lib/utils";
import { GetServerSidePropsContext } from "next";
import { IUser } from "backend/models/interfaces";
import UserTable from "frontend/components/Tables/UserTable";
import Link from "next/link";
import { BsPlus } from "react-icons/bs";
import TitleButton from "frontend/components/TitleButton";

interface props{
    users:IUser[]
}

export default function Users({users}:props){

    return(
        <>
            <TitleButton title='Usuarios' path='/tech-admin/users/new' nameButton='Agregar usuario'/>
            <UserTable users={users}/>
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext) {
    await dbConnect()
    const docUsers = await User.find({}).populate(User.getPopulateParameters())
    return {props:{users:formatIds(docUsers)}}
}