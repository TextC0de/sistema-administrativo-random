import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import useUser from 'frontend/hooks/useUser';
import Link from 'next/link';
import { Button, TextInput } from 'flowbite-react';
import fetcher from 'lib/fetcher';
import * as api from 'lib/apiEndpoints'
interface IUserRegisterForm{
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  confirmPassword:string;
  roles:Role[]
}

type Role = 'Tecnico' | 'Administrativo Tecnico' | 'Administrativo Contable' | 'Auditor'

const RegisterForm = ({}) => {
  const router = useRouter()

  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const {loginUser} = useUser()
  const [form, setForm] = useState<IUserRegisterForm>({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:'',
    roles:[]
  })


  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form:IUserRegisterForm) => {
    try {
      await fetcher.post(form, api.registerUrl)
      await fetcher.post({email:form.email, password:form.password}, api.authUrl)
      loginUser()
      router.push('/')
    } catch (error) {
      console.log(error)
      setMessage('Failed to login')
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
    let err:IUserRegisterForm = {password:'', confirmPassword:'', firstName:'', lastName:'', email:'', roles:[]}
    if (!form.password) err.password = 'password is required'
    if (!form.email) err.email = 'email is required'
    if (!form.firstName) err.firstName = 'first name is required'
    if (!form.lastName) err.lastName = 'last name is required'
    if (!form.confirmPassword) err.confirmPassword = 'Please confirm your password'
    if (form.password !== form.confirmPassword) err.confirmPassword = 'passwords dont match'
    
    return err
  }

  const isValidForm = (errors:IUserRegisterForm) =>{
    return errors.confirmPassword == '' && errors.email == '' && errors.firstName == '' && errors.lastName == '' && errors.password == ''
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errs = formValidate()
    if (isValidForm(errs)) {
      postData(form)
    } else {
      setErrors({ errs })
    }
  }

  return (
    <>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <label htmlFor='firstName'>First Name</label>
        <TextInput
          type='text'
          maxLength={20}
          name='firstName'
          value={form.firstName}
          onChange={handleChange}
          required
        />

        <label htmlFor='lastName'>Last Name</label>
        <TextInput
          type='text'
          maxLength={20}
          name='lastName'
          value={form.lastName}
          onChange={handleChange}
          required
        />

        <label htmlFor='email'>Email</label>
        <TextInput
          type='email'
          maxLength={40}
          name='email'
          value={form.email}
          onChange={handleChange}
          required
        />
        <label htmlFor='password'>Password</label>
        <TextInput
          type='password'
          maxLength={20}
          name='password'
          value={form.password}
          onChange={handleChange}
          required
        />
        <label htmlFor='confirmPassword'>Confirm password</label>
        <TextInput
          type='password'
          maxLength={20}
          name='confirmPassword'
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />


        
          <Button type='submit' >
            Registrarse
          </Button>
          <Link href='/login'>
            <Button >
              <a>Ingresar</a>
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

export default RegisterForm
