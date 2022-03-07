/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface userState {
  payload: any | null
  questions: any | null
}

const initialState: userState = {
  payload: null,
  questions: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedUser: (state, action: PayloadAction<object>) => {
      state.payload = { ...state.payload, ...action.payload }
    },
    pushAnswers: (state, action: PayloadAction<object>) => {
      state.questions = { ...state.questions, ...action.payload }
    },
  },
})

export const { loggedUser, pushAnswers } = userSlice.actions

export default userSlice.reducer
