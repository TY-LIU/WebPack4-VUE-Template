const getters = {
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
    roleMenu: state => state.user.roleMenu,
    userInfo: state => state.user.userInfo
};
export default getters
