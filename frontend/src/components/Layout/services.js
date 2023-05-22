import { axiosInstance } from "../../api/api";

export const fetchUserCall = async (account) => axiosInstance.get(`/account/getAccountByEmail?email=${account}`) 
export const fetchVisitCall = async (account) => axiosInstance.get(`/account/getAccountByUsername?username=${account}`) 
export const fetchNewsCall = async (lst) => axiosInstance.post(`/news/postNews?username=${lst[0]}&news=${lst[1]}`)
export const getNewsCall = async (username) => axiosInstance.get(`/news/getNews?username=${username}`)
export const getUserNewsCall = async (username) => axiosInstance.get(`/news/getUserNews?username=${username}`)
export const getFriendStatusCall = async (lst) => axiosInstance.get(`/friend/getFriendStatus?username=${lst[0]}&friend=${lst[1]}`)
export const sendFriendRequestCall = async (lst) => axiosInstance.post(`/friend/addFriend?account=${lst[0]}&friend=${lst[1]}`)