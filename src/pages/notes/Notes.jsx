import logo from '/src/assets/images/logo.svg'
import MobNav from '../../components/navbar/MobNav'

function Notes ({ children }) {
  return (
    <div className='min-h-dvh flex flex-col bg-start-bg'>
      <div>
        <img className='p-4' src={logo} alt='Logo' />
      </div>
      <div className='flex flex-grow'>
        {children}
      </div>
      <MobNav />
    </div>
  )
}

export default Notes
