//view for every pet of the user

import dbConnect from '../../lib/dbConnect'
import Link from 'next/link'

import PetCard from '../../components/PetCard'
//import Header from '../../components/Header'

import * as GS from '../../globalStyles'
import { PetInterface } from '../../models/interfaces'
import { NextApiRequest, NextApiResponse } from 'next'
import { getUserPets } from '../../lib/dbGetPets'

interface props{
  pets:PetInterface[]
}

const MyPets = ({pets}:props) => {
  //console.log(pets)
  return(
  <>
    {/* Create a card for each pet */}
    {/* <Header user={user}/> */}
    <h2 style={{textAlign:'center'}}>My Pets</h2>
    <Link href='/my-pets/new'>
      <div style={{display:'flex', justifyContent:'space-evenly'}}>
        <a style={GS.buttonStyle}>
          Add a pet!
        </a>
      </div>
    </Link>
    <div className="grid wrapper">
      {pets.map((pet) => (<PetCard key={pet._id.toString()} pet={pet} isMyPet={true} imageUrl={pet.imageUrl}/>))}
    </div>
  </>)
}

//Retrieves pet(s) data from mongodb database 
export async function getServerSideProps({req,res}:{req:NextApiRequest;res:NextApiResponse}) {
    const pets = await getUserPets(req)
    return { props: { pets} }
}

export default MyPets