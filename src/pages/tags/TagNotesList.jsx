import { useSelector } from 'react-redux'
import BtCreateNew from '../../components/BtCreateNew'
import Notes from '../notes/Notes'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { RiArrowLeftSLine } from 'react-icons/ri'

function TagNotesList () {
  const { tag } = useParams()
  const navigate = useNavigate()

  const notes = useSelector(state => state.notes.notes)
  const note = notes.filter(note => note.tags.includes(tag))

  const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  return (
    <Notes>
      <div className='flex-1 flex flex-col px-4 pt-5 overflow-hidden relative'>
        <div className='my-2 space-y-3'>
          <button
            className='flex items-center hover:scale-105 cursor-pointer'
            onClick={() => navigate(-1)}
          >
            <RiArrowLeftSLine size='2rem' />
            <div>Go Back</div>
          </button>
          <h1 className='font-bold text-2xl'>Notes Tagged: {tag}</h1>
          <p>All notes with the ”{tag}” tag are shown here.</p>
        </div>
        <div className='flex-1 overflow-y-auto pr-1 scroll-hidden'>
          <ul>
            {note.map(note => {
              const formattedDate = dateFormatter.format(
                new Date(note.lastEdited)
              )
              return (
                <li key={note.lastEdited}>
                  <Link
                    className='border-b-2 border-gray-200 py-4 pl-2 cursor-pointer w-full text-start flex items-center gap-2 hover:-translate-y-0.5 hover:bg-gray-50 rounded hover:shadow'
                    to={`/details/${note.lastEdited}`}
                  >
                    <div className='space-y-3'>
                      <h2 className='font-semibold'>{note.title}</h2>
                      <div className='flex gap-2 text-sm'>
                        {note.tags.map(tag => {
                          return (
                            <h3
                              key={tag}
                              className='px-1 bg-gray-200 rounded-sm'
                            >
                              {tag}
                            </h3>
                          )
                        })}
                      </div>
                      <p className='text-sm'>{formattedDate}</p>
                    </div>
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

export default TagNotesList
