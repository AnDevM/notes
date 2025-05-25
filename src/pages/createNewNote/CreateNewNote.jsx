import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Notes from '../notes/Notes'
import { RiArrowLeftSLine } from 'react-icons/ri'
import { MdWatchLater } from 'react-icons/md'
import { FaTags } from 'react-icons/fa6'
import { addNote } from '../../redux/notesSlice'
import { useDispatch } from 'react-redux'

const CreateNewNote = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    const tagsArray = data.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean)

    const newNote = {
      title: data.title,
      tags: tagsArray,
      content: data.content,
      lastEdited: new Date().toISOString(),
      isArchived: false,
    }

   dispatch(addNote(newNote))
    reset()
    navigate('/home')
  }

  return (
    <Notes>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='h-full px-4 pt-5 space-y-3 overflow-y-auto scroll-hidden text-secondary-text'
      >
        <div className='flex items-center justify-between'>
          <Link className='flex items-center hover:scale-105' to='/home'>
            <RiArrowLeftSLine size='2rem' />
            <div>Go Back</div>
          </Link>
          <div className='flex items-center gap-4'>
            <button
              type='button'
              className='hover:scale-105'
              onClick={() => navigate('/home')}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='hover:scale-105 text-blue-600 font-semibold'
            >
              Save Note
            </button>
          </div>
        </div>

        <hr className='border border-gray-200' />

        <div>
          <input
            type='text'
            placeholder='Enter a title…'
            {...register('title', { required: 'Title is required' })}
            className='font-bold text-2xl text-primary-text placeholder:text-primary-text outline-gray-50 py-1 px-3 w-full mb-1 cursor-pointer'
          />
          {errors.title && (
            <p className='text-red-500 text-sm'>{errors.title.message}</p>
          )}
        </div>

        <div className='text-sm flex gap-8'>
          <div className='space-y-5'>
            <div className='flex items-center gap-1.5 p-1 mt-3'>
              <FaTags size='1rem' />
              Tags
            </div>
            <div className='flex items-center gap-1.5 p-1'>
              <MdWatchLater size='1rem' />
              Last edited
            </div>
          </div>

          <div className='space-y-2 flex-1'>
            <textarea
              placeholder='Add tags separated by commas (e.g. Work, Planning)'
              {...register('tags', { required: 'Tags are required' })}
              className='w-full placeholder-gray-400 text-primary-text cursor-pointer outline-gray-50 p-1 resize-y min-h-[40px]'
            />
            {errors.tags && (
              <p className='text-red-500 text-sm'>{errors.tags.message}</p>
            )}
            <div className='text-gray-400 p-1'>Not yet saved</div>
          </div>
        </div>

        <hr className='border border-gray-200' />

        <div>
          <textarea
            placeholder='Start typing your note here...'
            {...register('content', { required: 'Content is required' })}
            className='outline-none h-full w-full pb-2 min-h-[200px]'
          />
          {errors.content && (
            <p className='text-red-500 text-sm'>{errors.content.message}</p>
          )}
        </div>
      </form>
    </Notes>
  )
}

export default CreateNewNote
