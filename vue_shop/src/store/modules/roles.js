import RolesApi from "@/api/roles"

const users = {
    state: {
        rolesList: [],
        editForm: {}
    },
    mutations: {
        SET_ROLESLIST(status, list) {
            status.rolesList = list;
        },
        SET_EDITFORM(status, userinfo) {
            status.editForm = userinfo;
        }
    },
    actions: {
        //获取角色列表信息
        getRolesList({ commit }) {
            return new Promise((resolve, reject) => {
                RolesApi.getRolesListtAll().then(response => {
                    commit("SET_ROLESLIST", response.data);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        //根据Id获取角色信息
        getRolesById({ commit }, uid) {
            return new Promise((resolve, reject) => {
                RolesApi.getRolesById(uid).then(response => {
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