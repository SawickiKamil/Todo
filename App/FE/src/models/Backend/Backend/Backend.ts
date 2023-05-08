import axios from 'axios'
import { paramsSerializer } from '../utils'

const axiosInstance = axios.create({
    withCredentials: false,
    baseURL: process.env.VUE_APP_BACKEND_URL,
    paramsSerializer,
})

export abstract class Backend {
    protected get = axiosInstance.get
    protected post = axiosInstance.post
    protected put = axiosInstance.put
    protected patch = axiosInstance.patch
    protected delete = axiosInstance.delete
}
