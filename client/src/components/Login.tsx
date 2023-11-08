import React, { FormEvent, useEffect, useState } from 'react'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
const {login, signUp, user} = useAppContext()
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isSignUp, setIsSignUp] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent)=>{
    e.preventDefault()
    if(isSignUp){
      let currentUser={
        name,
        email,
        password
      }
     signUp(currentUser)
    }else{
      let currentUser={
        email,
        password
      }
      login(currentUser)
    }

  }

  useEffect(() => {
    if (user) {
        setTimeout(() => {
            navigate("/")
        }, 1000);
    }

}, [user, navigate])

  return (
    <div className='h-screen flex items-center justify-center'>
      <form className='flex flex-col gap-5 justify-start p-8 items-center border-2 border-red-700 ' onSubmit={handleSubmit}  style={{"height":"70%","width":"30%"}}>
        <h3 className='text-4xl'>{isSignUp?"Sign Up":"Login"}</h3>
       {isSignUp && <label htmlFor="name" style={{"width":"90%"}}>
          <input type="text" name='name' className='my-2 border-2 border-gray-300 px-2' placeholder='Enter your name' value={name} onChange={(e)=> setName(e.target.value)} style={{"width":"100%"}}/>
        </label>}
        <label htmlFor="email" style={{"width":"90%"}}>
          <input type="email" name='email' className='my-2 border-2 border-gray-300 px-2' placeholder='Enter your email' value={email} onChange={(e)=> setEmail(e.target.value)} style={{"width":"100%"}}/>
        </label>
        <label htmlFor="password" style={{"width":"90%"}}>
          <input type="password" name='password'className='my-2 border-2 border-gray-300 px-2' placeholder='Enter your password' value={password} onChange={(e)=> setPassword(e.target.value)} style={{"width":"100%"}}/>
        </label>

        <div className='w-44 bg-blue-400 flex items-center justify-center cursor-pointer'>
          <button type="submit">{isSignUp?"signup":"login"}</button>
        </div>
        <div className='w-full flex justify-center items-center'>
          <p>{isSignUp?"Already have an account? ":"Don't have an account? "}
          <span className='cursor-pointer text-blue-400' onClick={()=> setIsSignUp(!isSignUp)}>{isSignUp?"login":"signup"}</span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login