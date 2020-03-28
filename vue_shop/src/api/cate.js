import request from '@/utils/request'

const CateApi = {
    //获取所有商品分类列表
    getCateListAll: function (queryInfo) {
        return request({
            url: 'categories',
            method: 'GET',
            params: queryInfo
        })
    },
    //添加商品分类
    addCate: function (cateInfo) {
        return request({
            url: 'categories',
            method: 'POST',
            data: cateInfo
        })
    },
    //根据Id获取商品分类
    getCateById: function (cid) {
        return request({
            url: `categories/${cid}`,
            method: 'GET'
        })
    },
    //修改商品分类信息
    setCateInfo: function (cateInfo) {
        return request({
            url: `categories/${cateInfo.cat_id}`,
            method: 'PUT',
            data: {
                "cat_name": cateInfo.cat_name
            }
        })
    },
    //根绝Id删除对应商品分类
    deleteCateById: function (cid) {
        return request({
            url: `categories/${cid}`,
            method: 'DELETE'
        })
    },
}

export default CateApi;