import { Link } from 'react-router-dom'
import { FaPlus } from "react-icons/fa6";

function BtCreateNew() {
  return (
    <Link
      to='/new-note'
      aria-label='Create a new note'
      className='inline-flex items-center font-light justify-center w-12 h-12 rounded-full bg-blue-900 text-gray-100 text-2xl hover:bg-blue-800 transition absolute bottom-5 right-4 hover:scale-105 hover:-translate-y-0.5'
    >
      <FaPlus />
    </Link>
  )
}

export default BtCreateNew
