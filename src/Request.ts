import axios, {AxiosRequestConfig} from './axios/index.js'
import {ResponseType} from './type'

const Request = {
    $get(url: string, data: AxiosRequestConfig | {}): Promise<ResponseType> {
        return new Promise((resolve, reject) => {
            axios.get(url, {withCredentials: true, ...data}).then((res) => {
                if (res.data) {
                    resolve(res.data)
                } else {
                    reject('error')
                }
            }) 
        })
    },

    $post(url: string, data: AxiosRequestConfig | {}): Promise<ResponseType> {
        return new Promise((resolve, reject) => {
            axios.post(url, data, {withCredentials: true}).then((res) => {
                if (res.data) {
                    resolve(res.data)
                } else {
                    reject('error')
                }
            }) 
        })
    }
}

export {Request}
