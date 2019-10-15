import {Request} from './Request'

export interface ISessionData {
    id: number
    token: string
    expiredAt: number
}

const baseUrl = 'https://www.easy-mock.com'

class Session {
    public sessionData: ISessionData | null = null 

    public getToken() {
        return new Promise((resolve, reject) => {
            if (this.sessionData && !this.isTokenExpired) {
                resolve(this.sessionData)
            } else {
                try {
                    this.fetchToken().then((res) => {
                        console.log(res)
                        // const newSessionData = {
                        //     token: token,
                        //     expiredAt: Date.now() + 1 * 60 * 60 * 1e3,
                        //     id: id
                        // }
                        // this.sessionData = newSessionData
                        resolve(res)
                    })
                } catch (err) {
                    console.log(err)
                }
            }
        })
    }

    private async fetchToken() {
        const requreUrl = baseUrl + '/mock/591d317c9aba4141cf26a50b/example_1495085436160/getaudiolist'
        const result = await Request.$get(`${requreUrl}`, {})  
        return result
    }

    private isTokenExpired(): boolean {
        return !this.sessionData || Date.now() > this.sessionData.expiredAt
    }
}

export default new Session()