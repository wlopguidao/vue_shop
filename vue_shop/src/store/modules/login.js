import LoginApi from "@/api/login"
import { getToken, setToken, removeToken } from '@/utils/auth'

const login = {
    state: {
        token: getToken(),
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        }
    },
    actions: {
        //用户登录  
        login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                LoginApi.loginByUnameAndPew(userInfo).then(response => {
                    let token = response.data.token;
                    //将token保存到state中
                    commit('SET_TOKEN', token);
                    //将token保存到sessionStorage中
                    setToken(token);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        //前端 登出  
        LogOut({ commit }) {
            return new Promise(() => {
                commit("SET_TOKEN", "");
                removeToken();
            })
        }
    }
}

export default login;