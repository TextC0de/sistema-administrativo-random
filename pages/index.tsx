import PetCard from '../components/PetCard'
import {PetInterface} from '../models/interfaces'
import { GetServerSidePropsContext } from 'next'
import { getAllPets } from '../lib/dbGetPets'

interface props {
  pets:PetInterface[]
}

const Index = ({ pets }:props) => {
  return(<>
    {/* Create a card for each pet */}
    <h2 style={{textAlign:'center'}}>Every Pet on this App!</h2>
    <div className="grid wrapper">
      {pets.map((pet) => (<PetCard key={pet._id.toString()} pet={pet} imageUrl={pet.imageUrl}/>))}
    </div>
  </>)
}

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps({req,res}:GetServerSidePropsContext) {
  
  const pets = await getAllPets()
  //console.log(pets)
  return { props: { pets} }
}

export default Index
