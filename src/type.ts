export interface AccessData {
    id: number;
    username: string;
    registertime: Date;
    token: string;
    tel: string;
    avatar?: any;
    access_token: string;
}

export interface Access_ResponseType {
    msg: string;
    data: AccessData;
    code: number;
}

export interface ISessionData {
    id: number
    token: string
    expiredAt: number
}

export interface ConfigType {
    ACCESS_TOKEN_URL: string
    LOGINURL: string
    LOGOUTURL: string
}

export type ResponseType = {
    code: number,
    msg: string,
    data: any
}

