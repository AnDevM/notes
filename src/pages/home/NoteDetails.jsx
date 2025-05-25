import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Notes from '../notes/Notes'

import { RiArrowLeftSLine, RiLoader2Line } from 'react-icons/ri'
import { AiTwotoneDelete } from 'react-icons/ai'
import { FaArchive } from 'react-icons/fa'
import { MdWatchLater } from 'react-icons/md'
import { FaTags } from 'react-icons/fa6'

const NoteDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const notes = useSelector(state => state.notes.notes)
  const note = notes.find(note => String(note.lastEdited) === id)

  if (!note) {
    return <p>Note not found</p>
  }
  const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(note.lastEdited))

  return (
    <Notes>
      <div className='text-sm px-4 pt-5 space-y-3 overflow-y-auto scroll-hidden text-secondary-text'>
        <div className='flex items-center justify-between'>
          <button
            className='flex items-center hover:scale-105 cursor-pointer'
            onClick={() => navigate(-1)}
          >
            <RiArrowLeftSLine size='2rem' />
            <div>Go Back</div>
          </button>
          <div className='flex items-center gap-4'>
            <AiTwotoneDelete className='hover:scale-105' size='1.2rem' />
            <FaArchive className='hover:scale-105' size='1.05rem' />
            <div className='hover:scale-105'>Cancel</div>
            <div className='hover:scale-105'>Save Note</div>
          </div>
        </div>
        <hr className='border  border-gray-200' />
        <h1 className='font-bold text-2xl text-primary-text'>{note.title}</h1>
        <div className='text-sm flex gap-8'>
          <div className='space-y-2'>
            <div className='flex items-center gap-1.5'>
              <FaTags size='1rem' /> Tags
            </div>
            {note.isArchived && (
              <div className='flex items-center gap-1.5'>
                <RiLoader2Line size='1rem' /> Status
              </div>
            )}
            <div className='flex items-center gap-1.5'>
              <MdWatchLater size='1rem' />
              Last edited
            </div>
          </div>
          <div className='space-y-2'>
            <div className='flex gap-2 text-sm'>
              {note.tags.map((tag, i) => {
                return (
                  <h3 key={tag}>
                    {tag}
                    {i < note.tags.length - 1 && ','}
                  </h3>
                )
              })}
            </div>
            {note.isArchived && (<p>Archived</p>)}
            <p>{dateFormatter}</p>
          </div>
        </div>
        <hr className='border border-gray-200' />
        <article className='whitespace-pre-wrap'>{note.content}</article>
      </div>
    </Notes>
  )
}

export default NoteDetails
