import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialStateType {
  token: string;
  user: IUser;
}

export interface IUser {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: null | string;
}
const initialState: InitialStateType = {
  token: '',
  user: {} as IUser,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    setUserInfo: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, setUserInfo } = authSlice.actions;

export const getTokenSelector = (state: { auth: InitialStateType }) => state.auth.token;
export const getUserSelector = (state: { auth: InitialStateType }) => state.auth.user;

export default authSlice.reducer;
