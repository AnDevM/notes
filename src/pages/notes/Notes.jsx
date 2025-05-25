import logo from '/src/assets/images/logo.svg'
import MobNav from '../../components/navbar/MobNav'
import { Link } from 'react-router-dom'

function Notes ({ children }) {
  return (
    <div className='h-screen flex flex-col bg-start-bg'>
      <div className='p-4'>
        <Link to='/home'>
          <img src={logo} alt='Logo' className='inline hover:scale-105' />
        </Link>
      </div>
      <div className='flex-1 overflow-hidden flex flex-col bg-white rounded-t-xl md:rounded-t-2xl'>
        {children}
      </div>
      <MobNav />
    </div>
  )
}

export default Notes
