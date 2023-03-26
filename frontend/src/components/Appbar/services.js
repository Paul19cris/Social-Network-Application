import { axiosInstance } from "../../api/api"

export const callAllUsersByKey = async (key) => axiosInstance.get(`/account/getUsersByKey?key=${key}`)

export const callAllUsers = async () => axiosInstance.get(`/account/getUsers`)

export const getUnseenNrCall = async (username) => axiosInstance.get(`/account/getUnseenNotifications?username=${username}`)