import request from '@/utils/request'

const RolesApi = {
    //获取所有角色列表
    getRolesListtAll: function () {
        return request({
            url: 'roles',
            method: 'GET',
        })
    },
    //添加角色
    addRoles: function (RolesInfo) {
        return request({
            url: 'roles',
            method: 'POST',
            data: RolesInfo
        })
    },
    //根据Id获取角色信息
    getRolesById: function (uid) {
        return request({
            url: `roles/${uid}`,
            method: 'GET',
        })
    },
    //修改角色信息
    setRolesInfo: function (RolesInfo) {
        return request({
            url: `roles/${RolesInfo.roleId}`,
            method: 'PUT',
            data: {
                "roleName": RolesInfo.roleName,
                "roleDesc": RolesInfo.roleDesc,
            }
        })
    },
    //根据Id删除角色
    deleteRolesById: function (uid) {
        return request({
            url: `roles/${uid}`,
            method: 'DELETE'
        })
    },
    //根据Id删除角色权限
    deleteRightById: function (roleId, rightId) {
        return request({
            url: `roles/${roleId}/rights/${rightId}`,
            method: 'DELETE'
        })
    },
    //根据Id分配角色权限
    allotRightsById: function (roleId, rids) {
        return request({
            url: `roles/${roleId}/rights`,
            method: 'POST',
            data: {
                "rids": rids
            }
        })
    }
}

export default RolesApi

