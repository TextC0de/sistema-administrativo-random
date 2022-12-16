import Link from "next/link"

import { useUser } from "../hooks/useUser"
import {PetInterface} from '../models/interfaces'

interface props{
    pet: PetInterface;
    isMyPet?:boolean;
    imageUrl: string | undefined;
}

export default function PetCard({pet, isMyPet = false, imageUrl}:props){

    const {isLoggedIn} = useUser()

    return(
        <>
            <div className="card">
                <img src={imageUrl} />
                <h5 className="pet-name">{pet.name}</h5>
                <div className="main-content">
                    <p className="pet-name">{pet.name}</p>
                    <p className="owner">Owner: {pet.owner_name}</p>

                    {/* Extra Pet Info: Likes and Dislikes */}
                    <div className="likes info">
                    <p className="label">Likes</p>
                    <ul>
                        {pet.likes.map((data:string, index:number) => (
                        <li key={index}>{data} </li>
                        ))}
                    </ul>
                    </div>
                    <div className="dislikes info">
                    <p className="label">Dislikes</p>
                    <ul>
                        {pet.dislikes.map((data, index) => (
                        <li key={index}>{data} </li>
                        ))}
                    </ul>
                    </div>

                    <div className="btn-container">
                    {isLoggedIn() && isMyPet &&<Link href="/my-pets/[id]/edit" as={`/my-pets/${pet._id}/edit`}>
                        <button className="btn edit">Edit</button>
                    </Link>}
                    <Link href="/pet/[id]" as={`/pet/${pet._id}`}>
                        <button className="btn view">View</button>
                    </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
