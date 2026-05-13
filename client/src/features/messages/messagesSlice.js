import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api/axios"

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async ({ token, userId }) => {

    const { data } = await api.get(
      `/api/message/get/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return data.messages
  }
)

const messagesSlice = createSlice({

  name: "messages",

  initialState: {
    messages: []
  },

  reducers: {

    addMessages: (state, action) => {

      state.messages.push(action.payload)
    },

    resetMessages: (state) => {

      state.messages = []
    }
  },

  extraReducers: (builder) => {

    builder.addCase(fetchMessages.fulfilled, (state, action) => {

      state.messages = action.payload
    })
  }
})

export const {
  addMessages,
  resetMessages
} = messagesSlice.actions

export default messagesSlice.reducer