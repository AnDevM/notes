import logo from '/src/assets/images/logo.svg'
function StartHeader ({ header, text }) {
  return (
    <div className='text-center'>
      <img className='m-auto mb-4' src={logo} alt='Logo' />
      <h1 className='text-2xl font-bold mb-2'>{header}</h1>
      <h2 className='text-sm text-secondary-text -tracking-wide mb-8'>
        {text}
      </h2>
    </div>
  )
}

export default StartHeader
