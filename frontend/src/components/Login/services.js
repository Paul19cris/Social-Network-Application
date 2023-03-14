import { axiosInstance } from "../../api/api";

export const loginCall = async (account) => axiosInstance.post('/account/login', account, { headers: { Authorization: undefined } })
