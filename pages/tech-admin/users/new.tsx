import City from "backend/models/City"
import { ICity } from "backend/models/interfaces"
import { Role } from "backend/models/types"
import UserForm, {IUserForm} from "frontend/components/Forms/TechAdmin/UserForm"
import dbConnect from "lib/dbConnect"
import { formatIds } from "lib/utils"
import { GetServerSidePropsContext } from "next"

interface props{
    cities:ICity[]
}

export default function NewUser({cities}:props){
    const userForm:IUserForm = {
        _id:'',
        firstName:'',
        lastName:'',
        email:'',
        roles:[] as Role[],
        city:{} as ICity,
        password:''
    } 
    return (
        <>
            <h2 className="text-lg">Crear un nuevo usuario</h2>
            <hr className="mb-2"/>
            <UserForm userForm={userForm} newUser={true} cities={cities} />
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext){
    await dbConnect()
    const docCities = await City.find({}).populate(City.getPopulateParameters())
    return {props:{cities:formatIds(docCities)}}
}