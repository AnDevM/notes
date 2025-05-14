import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'
import { useState } from 'react'
function PasswordField ({
  label = 'Password',
  id = 'password',
  element = null,
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='mb-4 relative'>
      <div className='flex justify-between items-center'>
        <label className='text-sm font-semibold text-third-text' htmlFor={id}>
          {label}
        </label>
        {element}
      </div>
      <div className='relative'>
        <input
          className='shadow appearance-none border border-gray-400 rounded-lg w-full py-3 px-3 leading-tight focus:outline-none focus:shadow text-sm'
          type={showPassword ? 'text' : 'password'}
          id={id}
          name={id}
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xl'
        >
          {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
        </button>
      </div>
    </div>
  )
}

export default PasswordField
