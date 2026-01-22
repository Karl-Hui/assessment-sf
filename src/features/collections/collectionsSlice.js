import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

export const createEntry = createAsyncThunk(
  'collections/createEntry',
  async (payload, { rejectWithValue }) => {
    try {
      return {
        ...payload,
        id: nanoid(),
      };
    } catch (error) {
      return rejectWithValue('Unable to create entry right now. Please retry.');
    }
  }
);

export const updateEntry = createAsyncThunk(
  'collections/updateEntry',
  async (payload, { getState, rejectWithValue }) => {
    const { collections } = getState();
    const existingEntry = collections.entries.find((entry) => entry.id === payload.id);

    if (!existingEntry) {
      return rejectWithValue('Unable to update entry because it no longer exists.');
    }

    return {
      ...existingEntry,
      ...payload.updates,
    };
  }
);

const collectionsSlice = createSlice({
  name: 'collections',
  initialState: {
    entries: [],
    status: 'idle',
    error: null,
    lastAction: null,
  },
  reducers: {
    clearStatus: (state) => {
      state.status = 'idle';
      state.error = null;
      state.lastAction = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEntry.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.lastAction = null;
      })
      .addCase(createEntry.fulfilled, (state, action) => {
        state.entries.push(action.payload);
        state.status = 'succeeded';
        state.lastAction = 'create';
      })
      .addCase(createEntry.rejected, (state, action) => {
        state.status = 'failed';
        state.lastAction = 'create';
        state.error = action.payload || 'Unable to create entry right now.';
      })
      .addCase(updateEntry.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.lastAction = null;
      })
      .addCase(updateEntry.fulfilled, (state, action) => {
        const index = state.entries.findIndex((entry) => entry.id === action.payload.id);
        if (index !== -1) {
          state.entries[index] = action.payload;
        }
        state.status = 'succeeded';
        state.lastAction = 'update';
      })
      .addCase(updateEntry.rejected, (state, action) => {
        state.status = 'failed';
        state.lastAction = 'update';
        state.error = action.payload || 'Unable to update entry right now.';
      });
  },
});

export const { clearStatus } = collectionsSlice.actions;

export default collectionsSlice.reducer;
