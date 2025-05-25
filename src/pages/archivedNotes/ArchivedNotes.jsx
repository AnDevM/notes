import { useSelector } from 'react-redux'
import BtCreateNew from '../../components/BtCreateNew'
import Notes from '../notes/Notes'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'

function ArchivedNotes () {
  const allNotes = useSelector(state => state.notes.notes)

  const notes = useMemo(
    () => allNotes.filter(note => note.isArchived),
    [allNotes]
  )
  const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  return (
    <Notes>
      <div className='flex-1 flex flex-col px-4 pt-5 overflow-hidden relative'>
        <div className='mb-3 space-y-3'>
          <h1 className='font-bold text-2xl'>Archived Notes</h1>
          <p>
            All your archived notes are stored here. You can restore or delete
            them anytime.
          </p>
        </div>
        <div className='flex-1 overflow-y-auto pr-1 scroll-hidden'>
          {notes.length === 0 ? (
            <p className='bg-start-bg rounded-md p-2 border border-gray-200'>
              No notes have been archived yet. Move notes here for safekeeping,
              or {' '}
              <Link
                to='/new-note'
                className='inline-block underline underline-offset-2 hover:scale-105 transform transition-transform duration-300'
              >
                create a new note.
              </Link>
            </p>
          ) : (
            <ul>
              {notes.map(note => {
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
                        <p>{formattedDate}</p>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <BtCreateNew />
      </div>
    </Notes>
  )
}

export default ArchivedNotes
