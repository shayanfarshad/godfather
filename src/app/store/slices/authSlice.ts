import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = { id: string; email: string; name?: string; premium?: boolean };

type AuthState = {
  user?: User;
  token?: string;
  status: 'idle' | 'loading' | 'error';
  error?: string;
  bootstrapped: boolean; // اضافه شد
};

const initialState: AuthState = { status: 'idle', bootstrapped: false };

// --- Mock API thunks ---
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }) => {
    await new Promise(r => setTimeout(r, 800));
    if (!payload.email.includes('@') || payload.password.length < 6) {
      throw new Error('INVALID_CREDENTIALS');
    }
    const result = {
      user: { id: 'u1', email: payload.email, name: 'Player', premium: false } as User,
      token: 'mock-token-123'
    };
    await AsyncStorage.setItem('token', result.token);
    await AsyncStorage.setItem('user', JSON.stringify(result.user));
    return result;
  }
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (payload: { name: string; email: string; password: string }) => {
    await new Promise(r => setTimeout(r, 900));
    if (payload.password.length < 6) throw new Error('WEAK_PASSWORD');
    const result = {
      user: { id: 'u2', email: payload.email, name: payload.name, premium: false } as User,
      token: 'mock-token-abc'
    };
    await AsyncStorage.setItem('token', result.token);
    await AsyncStorage.setItem('user', JSON.stringify(result.user));
    return result;
  }
);

// --- Bootstrap from storage (بدون نیاز به setUser) ---
export const bootstrapAuth = createAsyncThunk('auth/bootstrap', async () => {
  const token = await AsyncStorage.getItem('token');
  const userStr = await AsyncStorage.getItem('user');
  const user: User | undefined = userStr ? JSON.parse(userStr) : undefined;
  return { token: token ?? undefined, user };
});

// --- خروج تمیز (پاک کردن استوریج) ---
export const logoutThunk = createAsyncThunk('auth/logoutThunk', async () => {
  await AsyncStorage.multiRemove(['token', 'user']);
  return true;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // اختیاری: اگر جایی لازم شد دستی ست کنی
    setCredentials(state, action: PayloadAction<{ user?: User; token?: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = undefined;
      state.token = undefined;
      state.status = 'idle';
      state.error = undefined;
      // bootstrapped رو دست نمی‌زنیم
    }
  },
  extraReducers(builder) {
    builder
      // login
      .addCase(loginThunk.pending, s => { s.status = 'loading'; s.error = undefined; })
      .addCase(loginThunk.fulfilled, (s, a: PayloadAction<{user: User; token: string}>) => {
        s.status = 'idle'; s.user = a.payload.user; s.token = a.payload.token;
      })
      .addCase(loginThunk.rejected, (s, a) => { s.status = 'error'; s.error = a.error.message || 'UNKNOWN'; })

      // register
      .addCase(registerThunk.pending, s => { s.status = 'loading'; s.error = undefined; })
      .addCase(registerThunk.fulfilled, (s, a: PayloadAction<{user: User; token: string}>) => {
        s.status = 'idle'; s.user = a.payload.user; s.token = a.payload.token;
      })
      .addCase(registerThunk.rejected, (s, a) => { s.status = 'error'; s.error = a.error.message || 'UNKNOWN'; })

      // bootstrap
      .addCase(bootstrapAuth.pending, s => { s.status = 'loading'; })
      .addCase(bootstrapAuth.fulfilled, (s, a: PayloadAction<{user?: User; token?: string}>) => {
        s.status = 'idle';
        s.user = a.payload.user;
        s.token = a.payload.token;
        s.bootstrapped = true;
      })
      .addCase(bootstrapAuth.rejected, s => { s.status = 'idle'; s.bootstrapped = true; })

      // logout thunk
      .addCase(logoutThunk.fulfilled, s => {
        s.user = undefined; s.token = undefined;
      });
  }
});

export const { actions: authAction, reducer: AuthReducer } = authSlice;
// حالا authAction.setCredentials و authAction.logout هم در دسترس‌ان
