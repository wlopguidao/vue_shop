import UsersApi from "@/api/users"

const users = {
    state: {
        userList: [],
        editForm: {}
    },
    mutations: {
        SET_USERLIST(status, list) {
            status.userList = list;
        },
        SET_EDITFORM(status, userInfo) {
            status.editForm = userInfo
        }
    },
    actions: {
        //获取用户列表信息 
        getUserList({ commit }, userinfo) {
            return new Promise((resolve, reject) => {
                UsersApi.getUserListAll(userinfo).then(response => {
                    commit("SET_USERLIST", response.data.users);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        //根据Id获取用户信息 
        getUserById({ commit }, uid) {
            return new Promise((resolve, reject) => {
                UsersApi.getUserById(uid).then(response => {
                    commit("SET_EDITFORM", response.data);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }
}

export default users;