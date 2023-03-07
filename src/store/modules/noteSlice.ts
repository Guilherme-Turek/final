import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  createNote,
  deleteNote,
  listNotes,
  Note,
  UptadeNote,
  UptadeNoteProps,
} from "../../services/api.service";

const notesAdapter = createEntityAdapter<Note>({
  selectId: (note) => note._id,
});

export const listNotesAction = createAsyncThunk(
  "notes/list",
  async (userId: string) => {
    const result = await listNotes(userId);
    if (result.ok) {
      return result.data;
    }
    return [];
  }
);

export type CreateNote = {
  title: string;
  content: string;
};

export const createNoteAction = createAsyncThunk(
  "note/create",
  async ({ id, note }: { id: string; note: CreateNote }) => {
    const result = await createNote(id, note);
    if (result.ok) {
      return result;
    }
  }
);

export const deleteNoteAction = createAsyncThunk(
  "note/delete",
  async ({ id, noteId }: { id: string; noteId: string }) => {
    const result = await deleteNote(id, noteId);
    return result.message;
  }
);

export const UptadeNoteAction = createAsyncThunk(
  "note/uptade",
  async (note: UptadeNoteProps) => {
    const result = await UptadeNote(note);
    let changes = {};
    if (result.ok) {
      changes = {
        title: note.title,
        content: note.content,
        status: note.status,
      };
    }
    return {
      id: note.id,
      changes,
      ok: result.ok,
    };
  }
);

const NoteSlice = createSlice({
  name: "notes",
  initialState: notesAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listNotesAction.fulfilled, notesAdapter.setAll);
    builder.addCase(createNoteAction.fulfilled, (state, action) => {
      if (action.payload?.data) {
        notesAdapter.addOne(state, action.payload?.data);
      }
    });
    builder.addCase(deleteNoteAction.fulfilled, notesAdapter.removeOne);
    builder.addCase(UptadeNoteAction.fulfilled, notesAdapter.updateOne);
  },
});

export const { selectAll: getAllNotes, selectById: getNoteById } =
  notesAdapter.getSelectors();

export default NoteSlice.reducer;
