import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrderedFriendsCall, getUnseenMessagesCall, sendMessageCall, setToSeenMessageCall } from "./services";

export const getOrderedFriends = createAsyncThunk('getOrderedFriends', async (username) => {
    try {
        const response = await getOrderedFriendsCall(username);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const getUnseenMessagesData = createAsyncThunk('getUnseenMessagesData', async (lst) => {
    try {
        const response = await getUnseenMessagesCall(lst);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const setToSeenMessageData = createAsyncThunk('setToSeenMessageData', async (lst) => {
    try {
        const response = await setToSeenMessageCall(lst);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const sendMessageData = createAsyncThunk('sendMessage', async (lst) => {
    try {
        const response = await sendMessageCall(lst);
        
        return response
        
    } catch (error) {
        return null
    }
    
})