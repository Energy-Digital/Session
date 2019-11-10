### How to declare Request 

封装前端request在前端项目里面使用


#### 怎么使用
```
<script>
    window.SESSIONINITVARIABLE = {
        ACCESS_TOKEN_URL: 'http://localhost:9000/auth/access_token',
        LOGINURL: 'http://localhost:9000/auth/login',
        LOGOUTURL: ''
    }
</script>

先定义SESSIONINITVARIABLE，然后引入session包

 <script src="./session.v1.0.0.min.js"></script>
 引入session包，以后会用cdn引入
 ```

#### 基础api

```
window.Session.login({username: 'dubinbin', psw: '6653145'}).then((res) => {
    console.log(res)
    // 拿到登陆信息，不过基本不会在业务里面调用
 })

window.Session.getToken().then((res) => {
    // 你可以拿到用户信息
})

```


#### 怎么封装在前端项目用？

```
// Request.js

import axios from 'axios'

const Config = {
    BASE_URL: '业务前缀'
}

class Request {

    public async $get(url, options) {
        const data = await Session.getToken()
        const token = data.access_token
        const AllParams = {token, ...options.params}
        let requestUrl = Config.BASE_URL + url
        return await axios.get(requestUrl, { ...options, params: AllParams})
    }

    public async $post(url, options) {
        const data = await Session.getToken()
        const token = data.access_token
        let requestUrl = Config.BASE_URL + url
        return await axios.post(requestUrl + '?token=' + token, options, RequestConfig)
    }
}

export default new Request()

```


#### 怎么在前端发请求？

```
import Request from './Request'

Request.$get('/xxx/xxx', {}).then((res) => {
    if (res.data.code === 0) {
        //业务逻辑
    }
})

```