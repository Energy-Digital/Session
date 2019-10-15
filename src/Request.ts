import axios, {AxiosRequestConfig} from './axios/index.js'

const Request = {
    $get(url: string, data: AxiosRequestConfig | {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {withCredentials: true}).then((res: any) => {
                if (res) {
                    resolve(res)
                } else {
                    reject('error')
                }
            }) 
        })
    }
}

export {Request}
