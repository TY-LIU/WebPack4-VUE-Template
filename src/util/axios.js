/**
 * Author: LTY
 * Create Time: 2018-05-31 14:11
 * Description: ajax请求拦截器，处理token，加密，解密
 */
import Qs from 'Qs'
import axios from 'axios'
import router from '../router'
import Auth from './auth'
import whiteList from '../router/whiteList'

let CancelToken = axios.CancelToken;

// 超时设置,头部设置
const service = axios.create({
    // 重点:将值转换成query参数，Content-Type设置为application/x-www-form-urlencoded; charset=UTF-8
    transformRequest: [function (data) {
        // 发起请求的客户端 WEB/APP
        let request = '';
        if (typeof (data) === 'string') {
            request = JSON.parse(data);
            request.client = 'WEB';
            request = JSON.stringify(request)
        } else {
            data['client'] = 'WEB';
            request = Qs.stringify(data);
        }
        return request
    }],
    timeout: 25000,
    withCredentials: true // 跨域允许携带cookie
});

// 添加请求拦截器
// 每次请求都为http头增加tokenWeb字段，其内容为token
service.interceptors.request.use(function (config) {
    let cancel;
    config.cancelToken = new CancelToken(function executor(c) { // 使用 cancel token 取消请求
        cancel = c;
    });
    if (!navigator.cookieEnabled) { // 如果浏览器阻止了cookie则中断请求
        cancel();
    }
    if (whiteList.indexOf(router.currentRoute.path) < 0 && whiteList.indexOf(router.currentRoute.name) < 0) {
        Auth.setLoginStatus();// 重置登录时间
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
// 针对响应代码确认跳转到对应页面
service.interceptors.response.use(function (response) {
    return Promise.resolve(response.data)
}, function (error) {
    if (axios.isCancel(error)) {
        if (!navigator.cookieEnabled) {
            error.message = '浏览器阻止了cookie';
        } else {
            error.message = '该请求在axios拦截器中被中断';
        }
        return Promise.reject(error)
    } else if (error.response) {
        switch (error.response.status) {
            case 302:
                router.app.$message.error('登录超时');
                router.push('/login', () => []);
                error.message = '登录超时';
                Auth.logout();
                break;
            case 400:
                router.app.$message.error('请求参数错误');
                error.message = '请求参数错误';
                break;
            case 401:
                router.app.$message.error('无操作权限');
                error.message = '无操作权限';
                break;
            case 403:
                router.app.$message.error('访问被拒绝');
                error.message = '访问被拒绝';
                break;
            case 404:
                router.app.$message.error('无效的访问地址');
                error.message = '无效的访问地址';
                break;
            case 408:
                router.app.$message.error('请求超时');
                error.message = '请求超时';
                break;
            case 504:
                router.app.$message.error('服务器已断开连接');
                error.message = '服务器已断开连接';
                break;
            default:
                router.app.$message.error(`服务器错误！错误代码：${error.response.status}`)
        }
        return Promise.reject(error.response)
    } else {
        return Promise.reject(error)
    }
});

export default service
