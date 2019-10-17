/*
 Author: LTY
 Create Time: 2019-10-17 10:00
 Description: 用户相关状态
*/
'use strict';
import auth from '@/util/auth'
import {AxiosRequest} from '@/util/util';

const user = {
    state: {
        merchantInfo: '',                                   // 公司信息
        userInfo: '',                                       // 个人信息
        userId: '',
        roleMenu: []                                        // 后台菜单
    },

    mutations: {
        // 个人信息
        SET_USER: (state, userInfo) => {
            state.userInfo = userInfo
        },
        // 公司信息
        SET_MERCHANT: (state, merchantInfo) => {
            state.merchantInfo = merchantInfo
        },
        SET_RoleMenu: (state, roleMenu) => {
            state.roleMenu = roleMenu
        }
    },

    actions: {
        // 获取用户信息
        GetUserInfo({commit}) {
            return new Promise((resolve, reject) => {
                // 获取用户信息与权限
                AxiosRequest.get('/open/user/info').then(async data => {
                    if (data.code === '200') {
                        let userInfo = data.data;
                        commit('SET_USER', userInfo);
                        resolve(data.data)
                    } else reject(new Error(data.message))
                }).catch((err) => {
                    reject(new Error(err))
                })
            })
        },
        // 登出
        LogOut({commit, dispatch}) {
            return new Promise((resolve, reject) => {
                AxiosRequest.get('/open/loginout').then(res => {
                    if (res.code === '200') {
                        commit('SET_USER', '');
                        dispatch('delAllViews');
                        auth.logout();
                        resolve()
                    } else {
                        this.$message.error(res.message);
                        reject(new Error(res.message))
                    }
                }).catch((e) => {
                    reject(new Error(e))
                })
            })
        }
    }
};

export default user
