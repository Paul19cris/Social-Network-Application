import { axiosInstance } from "../../../../api/api";

export const getOrderedFriendsCall = async (key) => axiosInstance.get(`/account/getOrderedFriends?username=${key}`)
export const sendMessageCall = async (lst) => axiosInstance.post(`/account/sendMessage?username=${lst[0]}&friend=${lst[1]}&message=${lst[2]}`)
export const getUnseenMessagesCall = async (lst) => axiosInstance.get(`/account/getUnseenMessages?username=${lst[0]}&friend=${lst[1]}`)
export const setToSeenMessageCall = async (lst) => axiosInstance.post(`/account/setToSeenMessage?username=${lst[0]}&friend=${lst[1]}&messageId=${lst[2]}`)