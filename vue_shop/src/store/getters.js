const getters = {
    token: state => state.login.token,
    menuList: state => state.home.menuList,
    userList: state => state.users.userList,
    rightsList: state => state.rights.rightsList,
    rolesList: state => state.roles.rolesList,
    editForm: state => state.users.editForm
}

export default getters   