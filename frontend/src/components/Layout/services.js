import { axiosInstance } from "../../api/api";

export const fetchUserCall = async (account) => axiosInstance.get(`/account/getAccount?email=${account}`) 
