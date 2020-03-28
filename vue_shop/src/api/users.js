import request from '@/utils/request'

const UsersApi = {
    //获取所有用户列表
    getUserListAll: function (queryInfo) {
        return request({
            url: "users",
            method: "GET",
            params: queryInfo
        })
    },
    //设置用户状态
    setUserStatus: function (userInfo) {
        return request({
            url: `users/${userInfo.uid}/state/${userInfo.status}`,
            method: "PUT"
        })
    },
    //添加用户
    addUser: function (userInfo) {
        console.log(userInfo);
        return request({
            url: "users",
            method: "POST",
            data: userInfo
        })
    },
    //根据Id获取用户信息
    getUserById: function (uid) {
        return request({
            url: `users/${uid}`,
            method: "GET"
        })
    },
    //修改用户信息
    setUserInfo: function (userInfo) {
        return request({
            url: `users/${userInfo.id}`,
            method: "PUT",
            data: {
                "email": userInfo.email,
                "mobile": userInfo.mobile
            }
        })
    },
    //根据Id删除用户信息
    deleteUserById: function (uid) {
        return request({
            url: `users/${uid}`,
            method: "DELETE"
        })
    },
    //设置用户角色
    setRoleInfo: function (uid, roleid) {
        return request({
            url: `users/${uid}/role`,
            method: "PUT",
            data: {
                "rid": roleid
            }
        })
    }
}

export default UsersApi