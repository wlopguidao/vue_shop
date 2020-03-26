import request from '@/utils/request'

const UsersApi = {
    getUserList: function (queryInfo) {
        return request({
            url: "users",
            method: "GET",
            params: queryInfo
        })
    },
    setUserStatus: function (uid, status) {
        return request({
            url: `users/${uid}/state/${status}`,
            method: "PUT"
        })
    },
    addUser: function (userInfo) {
        console.log(userInfo);
        return request({
            url: "users",
            method: "POST",
            data: userInfo
        })
    },
    getUserById: function (uid) {
        return request({
            url: `users/${uid}`,
            method: "GET"
        })
    },
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
    deleteUserById: function (uid) {
        return request({
            url: `users/${uid}`,
            method: "DELETE"
        })
    }
}

export default UsersApi