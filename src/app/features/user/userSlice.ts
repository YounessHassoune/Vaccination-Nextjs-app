import { createSlice } from "@reduxjs/toolkit"

export interface userState {
  payload: any | null
}

const initialState: userState = {
  payload: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
})

// export const {} = userSlice.actions

export default userSlice.reducer
