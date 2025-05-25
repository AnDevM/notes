import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../App'
import Login from '../pages/login/Login'
import SignUp from '../pages/singUp/SignUp'
import PrivateRoute from './PrivateRoute'
import Home from '../pages/home/Home'
import Search from '../pages/search/Search'
import CreateNewNote from '../pages/createNewNote/CreateNewNote'
import NoteDetails from '../pages/home/NoteDetails'
import ArchivedNotes from '../pages/archivedNotes/ArchivedNotes'
import Tags from '../pages/tags/Tags'
import TagNotesList from '../pages/tags/TagNotesList'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to='/login' replace />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/home',
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        )
      },
      {
        path: '/search',
        element: (
          <PrivateRoute>
            <Search />
          </PrivateRoute>
        )
      },
      {
        path: '/archived-notes',
        element: (
          <PrivateRoute>
            <ArchivedNotes />
          </PrivateRoute>
        )
      },
      {
        path: '/new-note',
        element: (
          <PrivateRoute>
            <CreateNewNote />
          </PrivateRoute>
        )
      },
      {
        path: '/details/:id',
        element: (
          <PrivateRoute>
            <NoteDetails />
          </PrivateRoute>
        )
      },
      {
        path: '/tags',
        element: (
          <PrivateRoute>
            <Tags />
          </PrivateRoute>
        )
      },
      {
        path: '/tags/:tag',
        element: (
          <PrivateRoute>
            <TagNotesList />
          </PrivateRoute>
        )
      }
    ]
  }
])

export default router
