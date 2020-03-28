import request from '@/utils/request'

const ParamsApi = {
    //根据三级商品分类Id获取对应参数
    getParamsList: function (cid, type) {
        return request({
            url: `categories/${cid}/attributes`,
            method: 'GET',
            params: {
                "sel": type
            }
        })
    },
    //添加参数
    addParams: function (paramsInfo) {
        return request({
            url: `categories/${paramsInfo.cateId}/attributes`,
            method: 'POST',
            data: {
                "attr_name": paramsInfo.attr_name,
                "attr_sel": paramsInfo.attr_sel
            }
        })
    },
    //根据分类Id和参数Id获取参数信息
    getParamsById: function (paramsInfo) {
        return request({
            url: `categories/${paramsInfo.cateId}/attributes/${paramsInfo.attrId}`,
            method: 'GET',
            params: {
                "attr_sel": paramsInfo.attr_sel
            }
        })
    },
    //修改参数信息
    setParamsInfo: function (paramsInfo) {
        return request({
            url: `categories/${paramsInfo.cateId}/attributes/${paramsInfo.attrId}`,
            method: 'PUT',
            data: {
                "attr_name": paramsInfo.newname,
                "attr_sel": paramsInfo.attr_sel
            }
        })
    },
    //根据Id删除对应的参数项
    deleteParamsById: function (paramsInfo) {
        return request({
            url: `categories/${paramsInfo.cateId}/attributes/${paramsInfo.attrId}`,
            method: 'DELETE'
        })
    },
    //修改动态参数项
    addManyParamsTag: function (manyTagInfo) {
        return request({
            url: `categories/${manyTagInfo.cateId}/attributes/${manyTagInfo.attrId}`,
            method: 'PUT',
            data: {
                "attr_name": manyTagInfo.attr_name,
                "attr_sel": manyTagInfo.attr_sel,
                "attr_vals": manyTagInfo.attr_vals
            }
        })
    }
}

export default ParamsApi

