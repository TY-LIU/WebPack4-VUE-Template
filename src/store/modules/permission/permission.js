/*
 Author: LTY
 Create Time: 2019-10-17 10:00
 Description: 权限判定
*/
'use strict';
import {asyncRouterMap, constantRouterMap} from '@/router/staticRoute'
import user from '../user'

/**
 * 通过返回菜单判断是否与当前用户权限匹配
 * @param roleMenu  接口传递的权限菜单
 * @param route     路由信息
 */
function hasPermission(roleMenu, route) {
    let pass = false;
    let judgePass = (menu) => {
        // 如果路由中含有子类，先循环子类中是否存在与权限菜单匹配的子类，如果存在，则父类通过
        if (route.children) {
            return route.children.every(route => {
                if (route.uri === menu.url) pass = true;
                else return true
            })
        } else {
            if (route.uri === menu.url) pass = true;
            else return true
        }
    };
    roleMenu.every(menu => {
        if (route.path === '*') pass = true;
        else if (menu.children.length) {
            return menu.children.every(menu => {
                return judgePass(menu)
            })
        } else return judgePass(menu)
    });
    return pass
}

/**
 * 过滤异步路由表，返回符合用户菜单的路由表
 * @param routes asyncRouterMap
 * @param roleMenu
 */
function filterAsyncRouter(routes, roleMenu) {
    const res = [];
    routes.forEach(route => {
        const tmp = {...route};
        // 如需权限判定，取消注释
        /* if (hasPermission(roleMenu, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRouter(tmp.children, roleMenu)
            }
            res.push(tmp)
        } */
        if (tmp.children) {
            tmp.children = filterAsyncRouter(tmp.children, roleMenu)
        }
        res.push(tmp)
    });
    return res
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers)
        }
    },
    actions: {
        GenerateRoutes({commit}) {
            return new Promise(resolve => {
                let accessedRouters;
                accessedRouters = filterAsyncRouter(asyncRouterMap, user.state.roleMenu);
                commit('SET_ROUTERS', accessedRouters);
                resolve()
            })
        }
    }
};

export default permission
