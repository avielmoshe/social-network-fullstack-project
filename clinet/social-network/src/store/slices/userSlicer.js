import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    nickname: "",
    profile: "",
    bio: "",
    email: "",
  },
  reducers: {
    setUser: (state, action) => {
      (state.username = action.payload.username),
        (state.nickname = action.payload.nickname),
        (state.profile = action.payload.profile),
        (state.bio = action.payload.bio),
        (state.email = action.payload.email);
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
