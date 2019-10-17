import Cookies from 'js-cookie'
import util from './util'

const authToken = {
    // 在Cookie中记录登录状态的key
    loginKey: 'isLogin',

    // 当前是否是登录状态
    isLogin() {
        if (Cookies.get(this.loginKey)) {
            return util.hexCharCodeToStr(Cookies.get(this.loginKey)) === 'true' ? '200' : '403'
        } else return '404'
    },

    // 设置登录状态
    setLoginStatus() {
        // 设置超时登录时间，在该时间范围内没有任何请求操作则自动删除
        let maxAge = new Date(new Date().getTime() + 60 * 60 * 1000);
        Cookies.set(this.loginKey, `${util.strToHexCharCode('true')}`, {
            expires: maxAge
        })
    },

    // 移除登录状态
    removeLoginStatus() {
        Cookies.remove(this.loginKey)
    },

    // 退出登录
    logout() {
        this.removeLoginStatus()
    }
};

export default authToken
