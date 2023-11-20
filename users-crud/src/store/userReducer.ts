// userReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { interfaceUser } from '../User'

interface UserState {
  selectedUser: interfaceUser | null;
  userList: interfaceUser[];
}

const initialState: UserState = {
  selectedUser: null,
  userList: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<interfaceUser | null>) => {
      state.selectedUser = action.payload;
    },
    setUserList: (state, action: PayloadAction<interfaceUser[]>) => {
        state.userList = action.payload;
      },
  },
});

export const { selectUser, setUserList } = userSlice.actions;
export default userSlice.reducer;
