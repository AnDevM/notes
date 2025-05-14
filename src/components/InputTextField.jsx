function InputTextField ({
  label,
  id,
  type = 'text',
  placeholder,
  onChange,
  value
}) {
  return (
    <div className='mb-4'>
      <label className='text-sm font-semibold text-third-text' htmlFor={id}>
        {label}
      </label>
      <input
        className='shadow appearance-none border border-gray-400 rounded-lg w-full py-3 px-3 leading-tight focus:outline-none focus:shadow text-sm'
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

export default InputTextField
