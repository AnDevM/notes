import { Link } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'
import StartHeader from '../../components/StartHeader'
import { useState } from 'react'

import { useForm } from 'react-hook-form'

function SignUp () {
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const onSubmit = async data => {
    try {
      // await loginUser(data.email, data.password)
      alert('Login successful!')
      // navigate('/')
    } catch (error) {
      setMessage('Enter a valid email address')
      console.error(error)
    }
  }

  //  async function handleGoogleSignIn () {
  //     try {
  //       await signInWithGoogle()
  //       alert("Login successful!")
  //       navigate('/')
  //     } catch (error) {
  //       alert("Google sign in failed!")
  //           console.error(error)
  //     }
  //   }

  return (
    <div className='bg-white shadow-xl px-4 m-4 py-10 w-full max-w-[33.75rem] rounded-xl'>
      <StartHeader
        header={'Create Your Account'}
        text={
          'Sign up to start organizing your notes and boost your productivity.'
        }
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <label
            className='text-sm font-semibold text-third-text'
            htmlFor='email'
          >
            Email Address
          </label>
          <input
            {...register('email', { required: true })}
            className='shadow appearance-none border border-gray-400 rounded-lg w-full py-3 px-3 leading-tight focus:outline-none focus:shadow text-sm'
            type='email'
            id='email'
            name='email'
            placeholder='email@example.com'
          />
        </div>

        <div className='mb-4 relative'>
          <div className='flex justify-between items-center'>
            <label
              className='text-sm font-semibold text-third-text'
              htmlFor='password'
            >
              Password
            </label>
          </div>
          <div className='relative'>
            <input
              {...register('password', { required: true })}
              className='shadow appearance-none border border-gray-400 rounded-lg w-full py-3 px-3 leading-tight focus:outline-none focus:shadow text-sm'
              type={showPassword ? 'text' : 'password'}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xl'
            >
              {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </button>
          </div>
        </div>
        {message && <p className='text-red-500 text-sm mb-1.5'>{message}</p>}
        <div>
          <button className='bg-blue-600 hover:bg-blue-500 text-white mt-2 py-2.5 px-8 rounded-lg focus:outline-none w-full hover:-translate-y-0.5 hover:shadow-lg font-medium shadow-blue-100 active:translate-y-0.5 active:shadow-none'>
            Sing up
          </button>
        </div>
      </form>
      <hr className='mt-4 border-t border-gray-300' />
      <h2 className='text-center text-secondary-text my-5'>Or log in with:</h2>
      <button className='w-full flex gap-5 items-enter justify-center text-primary-text font-white font-medium py-3 px-4 rounded-xl items-center border border-gray-400 hover:border-gray-500 hover:shadow-lg shadow-gray-100 hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none'>
        <FaGoogle className='block size-5' />
        Google
      </button>
      <hr className='mt-4 border-t border-gray-300' />
      <p className='text-secondary-text text-center mt-4'>
        Already have an account?
        <Link to='/login'>
          <span className='text-primary-text hover:font-bold'> Login</span>
        </Link>
      </p>
    </div>
  )
}

export default SignUp

// {
//             password.length < 8 ? (
//               <p className='text-[.75rem] text-secondary-text/60 -tracking-wide absolute left-0 -bottom-7 my-2'>
//                 At least 8 characters!
//               </p>
//             ) : null
//           }
