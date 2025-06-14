import { useSelector } from 'react-redux'
import BtCreateNew from '../../components/BtCreateNew'
import Notes from '../notes/Notes'
import { Link } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { useState } from 'react'

function Search () {
  const notes = useSelector(state => state.notes.notes)
  const [query, setQuery] = useState('')

  const filteredNotes = notes.filter(note => {
    const lowerQuery = query.toLowerCase()
    return (
      note.title.toLowerCase().includes(lowerQuery) ||
      note.content.toLowerCase().includes(lowerQuery) ||
      note.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  })

  const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  return (
    <Notes>
      <div className='flex-1 flex flex-col px-4 pt-5 overflow-hidden relative'>
        <div className='mb-4 space-y-4'>
          <h1 className='font-bold text-2xl'>Search</h1>
          <div className='flex items-center bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-4 py-2 w-full'>
            <FiSearch size={'1.5rem'} className='text-gray-400 mr-2' />
            <input
              type='text'
              placeholder='Search by title, content, or tags...'
              className='bg-transparent outline-none w-full placeholder-gray-400 py-2'
              onChange={e => setQuery(e.target.value)}
              value={query}
            />
          </div>
          {query && (
            <p>
              All notes matching "{query}"
              are displayed below.
            </p>
          )}
        </div>
        <div className='flex-1 overflow-y-auto pr-1 scroll-hidden'>
          {filteredNotes.length === 0 ? (
            <p className='bg-start-bg rounded-md p-2 border border-gray-200'>
              No notes have been archived yet. Move notes here for safekeeping,
              or{' '}
              <Link
                to='/new-note'
                className='inline-block underline underline-offset-2 hover:scale-105 transform transition-transform duration-300'
              >
                create a new note.
              </Link>
            </p>
          ) : (
            <ul>
              {filteredNotes.map(note => {
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

export default Search
