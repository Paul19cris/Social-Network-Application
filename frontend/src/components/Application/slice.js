import { createSlice } from "@reduxjs/toolkit";
import { authenticateUser } from "../Login/actions";
import { registerUser } from "../Register/actions";
import { fetchNewsData, fetchUserData, fetchVisitData } from "../Layout/actions";

const initialState = {
    userData: undefined,
    userVisitData: undefined,
    userNewsData: undefined,
    loginComplete: false,
    loginLoading: false,
    registerLoading: false,
    registerComplete: false,
    fetchComplete: false,
    fetchLoading: false,
    fetchVisitComplete: false,
    fetchVisitLoading: false,
    fetchNewsComplete: false,
    fetchNewsLoading: false,
    snackbarMessage: ''
}

export const appSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        authenticate: (_, account) => {
            localStorage.setItem('email', account.payload.email)
        },
        deauthenticate: (_, account) => {
          localStorage.removeItem('email')
        },
    },
    extraReducers: builder => {
        builder
          .addCase(registerUser.fulfilled, (state, action) => {
            state.userData = action.payload
            state.registerComplete = true
            state.registerLoading = false
          })
          .addCase(authenticateUser.fulfilled, (state, action) => {
            state.userData = action.payload
            state.loginComplete = true
            state.loginLoading = false
          })
          .addCase(authenticateUser.pending, (state) => {
            state.loginComplete = false
            state.loginLoading = true
          })
          .addCase(authenticateUser.rejected, (state) => {
            state.loginLoading = false
            state.loginComplete = false
            state.snackbarMessage = "Invalid account."
          })
          // fetchUserData
          .addCase(fetchUserData.fulfilled, (state, action) => {
            state.userData = action.payload
            state.fetchComplete = true
            state.fetchLoading = false
          })
          .addCase(fetchUserData.pending, (state) => {
            state.fetchComplete = false
            state.fetchLoading = true
          })
          .addCase(fetchUserData.rejected, (state) => {
            state.fetchLoading = false
            state.fetchComplete = false
            state.snackbarMessage = "Invalid account."
          })
          //fetchVisitData
          .addCase(fetchVisitData.fulfilled, (state, action) => {
            state.userVisitData = action.payload
            state.fetchVisitComplete = true
            state.fetchVisitLoading = false
          })
          .addCase(fetchVisitData.pending, (state) => {
            state.fetchVisitComplete = false
            state.fetchVisitLoading = true
          })
          .addCase(fetchVisitData.rejected, (state) => {
            state.fetchVisitLoading = false
            state.fetchVisitComplete = false
            state.snackbarMessage = "Invalid account."
          })
          //fetchNewsData
          .addCase(fetchNewsData.fulfilled, (state, action) => {
            state.userNewsData = action.payload
            state.fetchNewsComplete = true
            state.fetchNewsLoading = false
          })
          .addCase(fetchNewsData.pending, (state) => {
            state.fetchNewsComplete = false
            state.fetchNewsLoading = true
          })
          .addCase(fetchNewsData.rejected, (state) => {
            state.fetchNewsLoading = false
            state.fetchNewsComplete = false
            state.snackbarMessage = "Invalid news."
          })
        }
    
})

export const { authenticate, deauthenticate } = appSlice.actions

export default appSlice.reducer