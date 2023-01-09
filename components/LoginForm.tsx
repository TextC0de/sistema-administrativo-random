import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../hooks/useUser'

interface UserLoginForm {
  email:string;
  password:string;
}

export default function LoginForm({}){
  const router = useRouter()
  const contentType = 'application/json'
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
      const res: Response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        console.log(res);
        throw new Error('failed to login')
        
      }
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          maxLength={60}
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          maxLength={20}
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn">
          Login
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
