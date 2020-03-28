import RightsApi from "@/api/rights"

const users = {
    state: {
        rightsList: [],
    },
    mutations: {
        SET_RIGHTSLIST(status, list) {
            status.rightsList = list;
        }
    },
    actions: {
        //获取所有权限信息
        getRights({ commit }, type) {
            return new Promise((resolve, reject) => {
                RightsApi.getRightsListAll(type).then(response => {
                    commit("SET_RIGHTSLIST", response.data);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }
}

export default users;