import { axiosInstance } from "../../api/api";

export const fetchUserCall = async (account) => axiosInstance.get(`/account/getAccountByEmail?email=${account}`) 
export const fetchVisitCall = async (account) => axiosInstance.get(`/account/getAccountByUsername?username=${account}`) 
export const fetchNewsCall = async (lst) => axiosInstance.post(`/account/postNews?username=${lst[0]}&news=${lst[1]}`)
export const getNewsCall = async (username) => axiosInstance.get(`/account/getNews?username=${username}`)
export const getUserNewsCall = async (username) => axiosInstance.get(`/account/getUserNews?username=${username}`)
export const getFriendStatusCall = async (lst) => axiosInstance.get(`/account/getFriendStatus?username=${lst[0]}&friend=${lst[1]}`)
export const sendFriendRequestCall = async (lst) => axiosInstance.post(`/account/addFriend?account=${lst[0]}&friend=${lst[1]}`)