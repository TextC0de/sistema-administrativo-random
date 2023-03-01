import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { useUser } from 'frontend/hooks/useUser'
import * as GS from 'globalStyles'
import Link from 'next/link';
import { Button, TextInput } from 'flowbite-react';
import fetcher from 'lib/fetcher';
import * as api from 'lib/apiEndpoints'

interface UserLoginForm {
  email:string;
  password:string;
}

export default function LoginForm({}){
  const router = useRouter()
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const {loginUser} = useUser()
  const [form, setForm] = useState<UserLoginForm>({
    email:'',
    password:'',
  })

  

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form:UserLoginForm) => {
    try {
      await fetcher.post(form, api.authUrl)
      loginUser()
      router.push('/')
    } 
    catch (error) {
      console.log(error)
      alert('wrong email/password')
    }
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err : UserLoginForm = {email:'', password:''}
    if (!form.email) err.email = 'email is required'
    if (!form.password) err.password = 'password is required'

    return err
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errs = formValidate()
    if (errs.email == '' && errs.email == '') {
      postData(form)
    } else {
      setErrors({ errs })
    }
  }

  return (
    <>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <TextInput
          type='email'
          maxLength={60}
          name='email'
          value={form.email}
          onChange={handleChange}
          required={true}
        />
        <label htmlFor='password'>Password</label>
        <TextInput
          type='password'
          maxLength={20}
          name='password'
          value={form.password}
          onChange={handleChange}
          required={true}
        />
        
          <Button type='submit' >
            Iniciar Sesion
          </Button>
          <Link href='/login/register'>
            <Button >
              <a >Registrarse</a>
            </Button>
          </Link>
        
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
