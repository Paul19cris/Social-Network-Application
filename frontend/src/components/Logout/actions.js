import { createAsyncThunk } from "@reduxjs/toolkit";
import { deauthenticate } from "../Application/slice";

export const deauthenticateUser = createAsyncThunk('deauthenticateUser', async (account, { dispatch }) => {
    dispatch(deauthenticate({ email: account.email }))  

    return account
} )