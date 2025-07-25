import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

// Try to load token/user from localStorage
const accessToken = localStorage.getItem('accessToken'); 
const user = localStorage.getItem('currentUser');

const initialState = {
  token: accessToken || null,
  user: user ? JSON.parse(user) : null,
  loading: false,
  error: null,
};

// Thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    const res = await authService.login(credentials);

    if (res?.error) {
      return rejectWithValue(res.error);
    }

    const { accessToken, user } = res.data;
    const message = res.message || 'Login successful';
    const currentUser = Array.isArray(user) ? user[0] : user;

    // Store in localStorage
    localStorage.setItem('accessToken', accessToken); 
    localStorage.setItem('currentUser', JSON.stringify(currentUser)); 

    return { accessToken, user: currentUser, message };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem('accessToken'); 
      localStorage.removeItem('currentUser');
      localStorage.removeItem('cartItem');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
