import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Async thunk to fetch notes from backend
export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const response = await fetch(`${API_BASE_URL}/api/notes`);
  if (!response.ok) throw new Error("Failed to fetch notes");
  const data = await response.json();
  // Ensure data is array, fallback to empty array
  return Array.isArray(data) ? data : [];
});

const initialState = {
  notes: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: {
      reducer: (state, action) => {
        state.notes.push(action.payload);
      },
      prepare: (note) => ({
        payload: {
          id: nanoid(),
          ...note,
          lastEdited: new Date().toISOString(),
          isArchived: false,
        },
      }),
    },

    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },

    toggleArchive: (state, action) => {
      const note = state.notes.find((n) => n.id === action.payload);
      if (note) {
        note.isArchived = !note.isArchived;
        note.lastEdited = new Date().toISOString();
      }
    },

    editNote: (state, action) => {
      const { id, title, content, tags } = action.payload;
      const note = state.notes.find((n) => n.id === id);
      if (note) {
        note.title = title;
        note.content = content;
        note.tags = tags;
        note.lastEdited = new Date().toISOString();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addNote, deleteNote, toggleArchive, editNote } =
  notesSlice.actions;
export default notesSlice.reducer;
