import request from '@/utils/request'

const HomeApi = {
    getMenuList: function () {
        return request({
            url: 'menus',
            method: 'GET'
        })
    }
}


export default HomeApi