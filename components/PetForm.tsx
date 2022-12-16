import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import {PetFormInterface} from './interfaces'

import {uploadFileRequest} from '../lib/upload'
import UiFileInputButton from './UIFileInputButton'
interface props {
  formId:string;
  petForm:PetFormInterface;
  forNewPet?:boolean;
}


const PetForm = ({ formId, petForm, forNewPet = true }:props) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [image, setImage] = useState<FormData>()
  //const [uploadUrl, setUploadUrl] = useState('')

  const [form, setForm] = useState<PetFormInterface>({
    name: petForm.name,
    species: petForm.species,
    age: petForm.age,
    poddy_trained: petForm.poddy_trained,
    diet: petForm.diet,
    imageId: petForm.imageId,
    likes: petForm.likes,
    dislikes: petForm.dislikes,
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form:PetFormInterface) => {
    const { id } = router.query

    try {
      if(image !== undefined){
        const response = await uploadFileRequest(image);
        console.log('posted image to backend');
        //console.log('response', response);
        const imageId = response.data?.[0]
        if (imageId) setForm({...form, imageId})
      }
      else console.log('no image');

      const res = await fetch(`/api/pets/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error('failed to edit pet')
      }

      const { data } = await res.json()

      mutate(`/api/pets/${id}`, data, false) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update pet')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form:PetFormInterface) => {
    try {
      console.log('posting data')    
      if(image !== undefined){
        const response = await uploadFileRequest(image);
        console.log('posted image to backend');
        //console.log('response', response.data?.[0]);
        const imageId=response.data?.[0]
        if (imageId) setForm({...form, imageId})

      }
      else console.log('no image');
      
      const res = await fetch('/api/pets', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify({form}),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error('failed to add pet')
      }

     
      

      router.push('/')
    } catch (error) {
      setMessage('Failed to add pet')
    }
  }
  

  const handleChange = (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target
    const value = target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
  }

  const uploadPhoto = async (formData:FormData) => {    
    
    setImage(formData)
  }

  const handleCheckboxChange = (e:ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    const value =
      target.name === 'poddy_trained' ? target.checked : target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
  }

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err:PetFormInterface = {name:'', species:'', imageId:''}
    if (!form.name) err.name = 'Name is required'
    if (!form.species) err.species = 'Species is required'
    //if (!form.imageId) err.imageId = 'Image is required'
    return err
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errs = formValidate()
    if (errs.name != '' || errs.species != '' || errs.imageId != '') {
      setErrors({ errs })
    } else {
      forNewPet ? postData(form) : putData(form)
    }
  }

  return (
    <>
      <form id={formId} onSubmit={handleSubmit} /* encType="multipart/form-data" */>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          maxLength={20}
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="species">Species</label>
        <input
          type="text"
          maxLength={30}
          name="species"
          value={form.species}
          onChange={handleChange}
          required
        />

        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
        />

        <label htmlFor="poddy_trained">Potty Trained</label>
        <input
          type="checkbox"
          name="poddy_trained"
          checked={form.poddy_trained}
          onChange={handleCheckboxChange}
        />

        <label htmlFor="diet">Diet</label>
        <textarea
          name="diet"
          maxLength={60}
          value={form.diet}
          onChange={handleChange}
        />

        {/* <label htmlFor="image">Image</label>
        <input
        name='image'
        onChange={uploadPhoto}
        type="file"
        accept="image/png, image/jpeg"
        /> */}{/* <input
          type="url"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          required
        /> */}

        <label htmlFor="likes">Likes</label>
        <textarea
          name="likes"
          maxLength={60}
          value={form.likes}
          onChange={handleChange}
        />

        <label htmlFor="dislikes">Dislikes</label>
        <textarea
          name="dislikes"
          maxLength={60}
          value={form.dislikes}
          onChange={handleChange}
        />
      <UiFileInputButton label='Image' uploadFileName='image' onChange={uploadPhoto}/>

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default PetForm
