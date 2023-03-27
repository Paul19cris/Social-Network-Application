import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNewsCall, fetchUserCall, fetchVisitCall, getFriendStatusCall, getNewsCall, getUserNewsCall, sendFriendRequestCall } from "./services";

export const fetchUserData = createAsyncThunk('fetchUserData', async (account) => {
    try {
        const response = await fetchUserCall(account);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const fetchVisitData = createAsyncThunk('fetchVisitData', async (account) => {
    try {
        const response = await fetchVisitCall(account);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const fetchNewsData = createAsyncThunk('fetchNewsData', async (lst) => {
    try {
        const response = await fetchNewsCall(lst);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const getNewsData = createAsyncThunk('getNewsData', async (username) => {
    try {
        const response = await getNewsCall(username);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const getUserNewsData = createAsyncThunk('getUserNewsData', async (username) => {
    try {
        const response = await getUserNewsCall(username);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const getFriendStatus = createAsyncThunk('getFriendStatus', async (lst) => {
    try {
        const response = await getFriendStatusCall(lst);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const sendFriendRequestData = createAsyncThunk('sendFriendRequestData', async (lst) => {
    try {
        const response = await sendFriendRequestCall(lst);
        
        return response
        
    } catch (error) {
        return null
    }
    
})