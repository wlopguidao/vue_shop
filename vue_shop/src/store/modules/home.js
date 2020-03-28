import LoginApi from "@/api/home"

const login = {
    state: {
        menuList: []
    },
    mutations: {
        SET_MENU_LIST(state, list) {
            state.menuList = list;
        }
    },
    actions: {
        //获取所有的菜单  
        getMenuList({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                LoginApi.getMenuListAll(userInfo).then(response => {
                    //将所有菜单数据保存到state中
                    commit('SET_MENU_LIST', response.data);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }
}

export default login;