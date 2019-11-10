import {Request} from './Request'
import {ISessionData, Access_ResponseType} from './type'

declare const window: any


const SessionConfig = {
    ACCESS_TOKEN_URL:  window.SESSIONINITVARIABLE.ACCESS_TOKEN_URL,
    LOGINURL: window.SESSIONINITVARIABLE.LOGINURL,
    LOGOUTURL: window.SESSIONINITVARIABLE.LOGOUTURL,
    EXPIREHOUR: 1,
}

class Session {
    private sessionData: ISessionData | null = null 

    public getToken() {
        return new Promise((resolve, reject) => {
            if (this.sessionData && !this.isTokenExpired()) {
                resolve(this.sessionData)
            } else {
                this.fetchToken().then((res) => {
                    if (res.code === 0) {
                        const getData= res.data
                        const newSessionData = {
                            ...getData,
                            expiredAt: Date.now() + SessionConfig.EXPIREHOUR * 60 * 60 * 1e3, // 一个小时token
                        }
                        this.sessionData = newSessionData
                        resolve(this.sessionData)
                    } else {
                        window.location.assign(SessionConfig.LOGINURL)
                    }
                })
            } 
        })
    }

    private fetchToken(): Promise<Access_ResponseType>{
        return Request.$get(SessionConfig.ACCESS_TOKEN_URL, {})  
    }

    public login(params: {username: string, psw: string}) {
        return Request.$get(SessionConfig.LOGINURL, {params})
    }

    public logout() {
        return Request.$get(SessionConfig.LOGOUTURL, {})
    }

    private isTokenExpired(): boolean {
        return !this.sessionData || Date.now() > this.sessionData.expiredAt
    }
}

export default new Session()