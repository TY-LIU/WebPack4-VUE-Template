/*
 Author: LTY
 Create Time: 2019-10-15 14:25
 Description: 路由拦截配置
*/
'use strict';
import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import Auth from '@/util/auth'
import store from '@/store'
import {Message} from 'element-ui'
import 'nprogress/nprogress.css'
import {constantRouterMap} from './staticRoute'
import whiteList from './whiteList'

NProgress.configure({showSpinner: false});
Vue.use(VueRouter);
const createRouter = () => new VueRouter({
    linkActiveClass: 'active',
    mode: 'hash',
    base: './',
    routes: constantRouterMap
});

const router = createRouter();

function hasPermission(roleMenu, route) {
    let pass = false;
    let loop = (roleMenu) => {
        return roleMenu.every(menu => {
            if (menu.children) {
                return loop(menu.children)
            } else {
                if (menu.name === route.name) pass = true;
                else return true
            }
        });
    };
    loop(roleMenu);
    return pass
}

router.beforeEach((to, from, next) => {
    // 网页title设置
    if (to.meta.title) {
        document.title = to.meta.title
    }
    // 开启进度条
    NProgress.start();
    // 判断IE
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        if (to.path.indexOf('/upgrade') >= 0) {
            next()
        } else {
            next({path: '/upgrade', replace: true});
            NProgress.done()
        }
        // 如果不是IE，但是进入了该页面，则返回到上一页
    } else if (!(!!window.ActiveXObject || 'ActiveXObject' in window) && to.path.indexOf('/upgrade') >= 0) {
        next({path: from.path, replace: true});
        NProgress.done()
    } else if (Auth.isLogin() === '200') {
        // 跳转地址为login，并且有企业信息，则自动跳回系统首页
        if (to.path === '/login' && store.getters.merchantInfo) {
            // 进入拥有的第一个页面
            next({path: '/home', replace: true});
            NProgress.done()
        } else if (!store.getters.userInfo) {
            // 判断当前用户是否已拉取完user_info信息
            store.dispatch('GetUserInfo').then((res) => {
                // 根据返回的菜单生成可访问的路由表
                store.dispatch('GenerateRoutes', res).then(() => {
                    // 重置matcher，解决addRoutes重复路由问题
                    router.matcher = createRouter().matcher;
                    // 动态添加可访问路由表
                    router.addRoutes(store.getters.addRouters);
                    // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                    next({...to, replace: true})
                })
            }).catch(() => {
                store.dispatch('LogOut').then(() => {
                    next({path: '/login'});
                    NProgress.done()
                }).catch(() => {
                    Message.error('账号验证失败, 请重新登录');
                    store.dispatch('delAllViews');
                    store.commit('SET_USER', '');
                    Auth.logout();
                    next({path: '/login'});
                    NProgress.done()
                })
            })
        } else {
            if (whiteList.includes(to.path) || whiteList.includes(to.name)) next();
            else {
                if (hasPermission(store.getters.permission_routers, {...to})) next();
                else {
                    next({path: '/401', replace: true, query: {noGoBack: true}})
                }
            }
        }
    } else {
        // 如果是免登陆的页面则直接进入，否则跳转到登录页面
        if (whiteList.includes(to.path) || whiteList.includes(to.name) || to.path.includes('error')) {
            next()
        } else {
            next({path: '/login', replace: true});
            // 如果store中有token，同时Cookie中没有登录状态
            if (Auth.isLogin() === '403') Message.error('登录状态非法，请重新登录');
            else if (Auth.isLogin() === '404' && !store.state.user.authorization) Message.error('请登录后再访问');
            else if (store.state.user.authorization) Message.error('登录超时，请重新登录');
            NProgress.done()
        }
    }
});

router.afterEach(() => {
    // 结束Progress
    NProgress.done();
});

export default router
