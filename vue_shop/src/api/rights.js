import request from '@/utils/request'

const RightsApi = {
    //获取所有权限列表
    getRightsListAll: function (type) {
        return request({
            url: `rights/${type}`,
            method: 'GET',
        })
    }
}

export default RightsApi

