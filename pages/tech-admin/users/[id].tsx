import City from "backend/models/City"
import { ICity, IUser } from "backend/models/interfaces"
import { Role } from "backend/models/types"
import User from "backend/models/User"
import UserForm, {IUserForm} from "frontend/components/Forms/TechAdmin/UserForm"
import dbConnect from "lib/dbConnect"
import { formatIds } from "lib/utils"
import { GetServerSidePropsContext } from "next"

interface props{
    cities:ICity[],
    user:IUser
}

export default function EditUser({cities, user}:props){
    const userForm:IUserForm = {
        _id:user._id as string,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        roles:user.roles as Role[],
        city:user.city as ICity,
        password:''
    } 
    return (
        <>
            <h2 className="text-lg">Editar usuario</h2>
            <hr className="mb-2"/>
            <UserForm userForm={userForm} newUser={false} cities={cities} />
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext){
    const {params} = ctx
    if(!params?.id) return {props:{}}
    await dbConnect()
    const docUser = await User.findById(params.id).populate(User.getPopulateParameters())
    const docCities = await City.findUndeleted({})
    return {props:{cities:formatIds(docCities), user:formatIds(docUser)}}
}