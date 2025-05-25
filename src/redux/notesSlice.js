import { createSlice, nanoid } from '@reduxjs/toolkit'
import data from '../../public/data/data.json'

const initialState = {
  notes: data.notes,
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: {
      reducer: (state, action) => {
        state.notes.push(action.payload)
      },
      prepare: (note) => {
        return {
          payload: {
            id: nanoid(),
            ...note,
            lastEdited: new Date().toISOString(),
            isArchived: false,
          }
        }
      }
    },

    deleteNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload)
    },

    toggleArchive: (state, action) => {
      const note = state.notes.find(n => n.id === action.payload)
      if (note) {
        note.isArchived = !note.isArchived
        note.lastEdited = new Date().toISOString()
      }
    },

    editNote: (state, action) => {
      const { id, title, content, tags } = action.payload
      const note = state.notes.find(n => n.id === id)
      if (note) {
        note.title = title
        note.content = content
        note.tags = tags
        note.lastEdited = new Date().toISOString()
      }
    }
  }
})

export const { addNote, deleteNote, toggleArchive, editNote } = notesSlice.actions
export default notesSlice.reducer
