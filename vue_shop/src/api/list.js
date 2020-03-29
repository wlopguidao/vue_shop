import request from '@/utils/request'

const ListApi = {
    //获取所有商品列表数据
    getGoodsList: function (queryInfo) {
        return request({
            url: 'goods',
            method: 'GET',
            params: queryInfo
        })
    },
    //根据Id删除对应商品
    delGoodsById: function (gid) {
        return request({
            url: `goods/${gid}`,
            method: 'DELETE'
        })
    },
    //根据Id获取商品信息
    getDoodsById: function (gid) {
        return request({
            url: `goods/${gid}`,
            method: 'GET'
        })
    },
    //修改商品信息
    setGoodsInfo: function (goodsInfo) {
        return request({
            url: `goods/${goodsInfo.goods_id}`,
            method: 'PUT',
            data: goodsInfo
        })
    }
}


export default ListApi