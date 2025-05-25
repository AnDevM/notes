import { useSelector } from 'react-redux'
import BtCreateNew from '../../components/BtCreateNew'
import Notes from '../notes/Notes'
import { FaTags } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Tags () {
  const notes = useSelector(state => state.notes.notes)
  const allTags = notes.flatMap(note => note.tags)
  const uniqueTags = [...new Set(allTags)]


  return (
    <Notes>
        <div className='flex-1 flex flex-col px-4 pt-5 overflow-hidden relative'>
          <div className='mb-3'>
            <h1 className='font-bold text-2xl'>Tags</h1>
          </div>
          <div className='flex-1 overflow-y-auto pr-1 scroll-hidden'>
            <ul className='mx-2'>
              {uniqueTags.map(tag => {
                return (
                  <li key={tag}>
                    <Link  to={`/tags/${tag}`}
                      className='border-b-2 border-gray-200 py-4 pl-2 cursor-pointer w-full text-start flex items-center gap-2 hover:-translate-y-0.5 hover:bg-gray-50 rounded hover:shadow'
                    >
                      <FaTags size={'1.25rem'} />
                      {tag}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <BtCreateNew />
        </div>
    </Notes>
  )
}

export default Tags
