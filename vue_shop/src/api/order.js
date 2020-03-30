import request from '@/utils/request'

const OrderApi = {
    //获取所有订单列表
    getOrderListAll: function (queryInfo) {
        return request({
            url: 'orders',
            method: 'GET',
            params: queryInfo
        })
    },
    //获取物流信息
    getKdInfo: function (id) {
        return request({
            url: `kuaidi/${id}`,
            method: 'GET'
        })
    },
    //根据Id获取订单信息
    getOrderInfoById: function (oid) {
        return request({
            url: `orders/${oid}`,
            method: 'GET'
        })
    },
    //修改订单信息
    setOrderInfo: function (orderInfo) {
        console.log(orderInfo);
        return request({
            url: `orders/${orderInfo.order_id}`,
            method: 'PUT',
            data: orderInfo
        })
    }
}

export default OrderApi

