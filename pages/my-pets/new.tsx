import PetForm from '../../components/PetForm'
import { PetFormInterface } from '../../components/interfaces'


const NewPet = () => {

  const petForm: PetFormInterface = {
    name: '',
    species: '',
    age: 0,
    poddy_trained: false,
    diet: [],
    imageId: '',
    likes: [],
    dislikes: [],
  }

  return (
    <>
      <PetForm formId="add-pet-form" petForm={petForm} />
    </>
  )
}

export default NewPet
