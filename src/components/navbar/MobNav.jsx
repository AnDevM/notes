import { FaHome, FaSearch, FaArchive, FaTags, FaCog } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const MobNav = () => {
  const navItems = [
    { to: '/home', label: 'Home', icon: <FaHome /> },
    { to: '/search', label: 'Search', icon: <FaSearch /> },
    { to: '/archived', label: 'Archived', icon: <FaArchive /> },
    { to: '/tags', label: 'Tags', icon: <FaTags /> },
    { to: '/settings', label: 'Settings', icon: <FaCog /> }
  ]

  return (
      <ul className='w-full flex justify-around bg-white p-3 border-t-2 border-secondary-text/10 shadow- top-2xl'>
        {navItems.map(({ to, label, icon }) => (
          <li key={label}>
            <NavLink
              to={to}
              key={to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 py-2 px-4 transition ${
                  isActive
                    ? ' bg-gray-100 text-sm rounded-md hover:scale-105'
                    : 'text-secondary-text/80 hover:text-secondary-text hover:scale-105'
                }`
              }
            >
              <div className='text-2xl'>{icon}</div>
              <span className='hidden sm:block text-xs font-bold mt-1'>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
  )
}

export default MobNav
