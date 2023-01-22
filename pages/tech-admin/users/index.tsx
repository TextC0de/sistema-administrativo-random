import User from "backend/models/User";
import dbConnect from "lib/dbConnect";
import { formatIds } from "lib/utils";
import { GetServerSidePropsContext } from "next";
import { IUser } from "backend/models/interfaces";
import UserTable from "frontend/components/Tables/UserTable";
import Link from "next/link";
import { BsPlus } from "react-icons/bs";

interface props{
    users:IUser[]
}

export default function Users({users}:props){

    return(
        <>
            <div className='flex justify-between' >
                <h2 className='text-lg'>Usuarios</h2>
                <Link href='/tech-admin/users/new'>
                    <button className='flex justify-between items-center'>
                        <BsPlus size='30'/>
                        <h4>Agregar un usuario</h4>
                    </button>
                </Link>
            </div>
            <hr className='mb-2'/>
            <UserTable users={users}/>
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext) {
    await dbConnect()
    const docUsers = await User.find({}).populate(User.populateParameter())
    return {props:{users:formatIds(docUsers)}}
}