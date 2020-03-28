import request from '@/utils/request'

const HomeApi = {
    //获取所有菜单列表
    getMenuListAll: function () {
        return request({
            url: 'menus',
            method: 'GET'
        })
    }
}


export default HomeApi