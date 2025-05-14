import Notes from '../notes/Notes'

function Home () {
  return (
    <Notes>
      <div className='bg-white flex-1 rounded-t-xl md:rounded-t-2xl px-4 pt-5'>
        <div>
          <h1 className='font-bold text-2xl mb-4'>All Notes</h1>
          <p className='bg-start-bg rounded-md p-2 border border-gray-200'>
            You don’t have any notes yet. Start a new note to capture your
            thoughts and ideas.
          </p>
        </div>
      </div>
    </Notes>
  )
}

export default Home
