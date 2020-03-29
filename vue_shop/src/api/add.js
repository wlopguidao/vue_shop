import request from '@/utils/request'

const AddApi = {
    //添加商品信息
    addGoodsInfo: function (gsInfo) {
        return request({
            url: 'goods',
            method: 'post',
            data: gsInfo
        })
    }
}


export default AddApi