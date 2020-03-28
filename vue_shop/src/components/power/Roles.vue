<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图-->
    <el-card>
      <!--添加角色按钮区域-->
      <el-row>
        <el-button type="primary" @click="addRolesVisible = true">添加角色</el-button>
      </el-row>
      <!--角色列表区域 slot-scope="scope"-->
      <el-table :data="rolesList" border stripe>
        <!--展开列-->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom',i1==0?'bdtop':'','vcenter']"
              v-for="(item1,i1) in scope.row.children"
              :key="item1.id"
            >
              <!--渲染一级权限-->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!--渲染二级和三级权限-->
              <el-col :span="19">
                <!--通过for循环渲染二级权限-->
                <el-row
                  :class="['bdbottom',i2==0?'':'bdtop','vcenter']"
                  v-for="(item2,i2) in item1.children"
                  :key="i2"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row,item2.id)"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <!--通过for循环渲染三级级权限-->
                    <el-tag
                      type="warning"
                      v-for="(item3,i3) in item2.children"
                      :key="i3"
                      closable
                      @close="removeRightById(scope.row,item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!--索引列-->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="300px">
          <!--修改按钮-->
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            >编辑</el-button>
            <!--删除按钮-->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="remveRolesById(scope.row.id)"
            >删除</el-button>
            <!--分配权限按钮-->
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="showSetRightDialog(scope.row.id)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--添加角色的对话框-->
    <el-dialog title="添加角色" :visible.sync="addRolesVisible" width="50%" @close="addRolesClosed">
      <!--内容主题区域-->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!--底部按钮区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRolesVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoles">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改角色的对话框-->
    <el-dialog title="修改角色" :visible.sync="editRolesVisible" width="50%" @close="editDialogClosed">
      <!--内容主题区域-->
      <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="80px">
        <el-form-item label="角色ID">
          <el-input v-model="editForm.roleId" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!--底部按钮区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRolesVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRolesInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!--分配权限的对话框-->
    <el-dialog
      title="分配权限"
      :visible.sync="showSetRightDialogVisible"
      width="50%"
      @close="setRightDialogColsed"
    >
      <!--树形控件-->
      <el-tree
        :data="rightsTree"
        :props="TreeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeRef"
      ></el-tree>
      <!--底部按钮区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSetRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import RolesApi from "@/api/roles";
import RightsApi from "@/api/rights";
import { mapGetters } from "vuex";
export default {
  name: "Roles",
  data() {
    return {
      //控制添加角色对话框的显示与隐藏
      addRolesVisible: false,
      //添加角色的表单数据
      addForm: {
        roleName: "",
        roleDesc: ""
      },
      //添加角色表单的验证规则
      addFormRules: {
        roleName: [
          { required: true, message: "请输入角色名", trigger: "blur" },
          {
            min: 2,
            max: 8,
            message: "角色名长度在2到8个字符之间",
            trigger: "blur"
          }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "角色描述长度在3到10个字符之间",
            trigger: "blur"
          }
        ]
      },
      //存储权限数据
      rightsTree: [],
      //控制修改角色对话框的显示与隐藏
      editRolesVisible: false,
      //控制分配权限对话框的显示与隐藏
      showSetRightDialogVisible: false,
      //树形控件的属性绑定对象
      TreeProps: {
        label: "authName",
        children: "children"
      },
      //默认选中的节点Id值数组
      defKeys: [],
      //当前即将分配权限的角色Id
      roleId: ""
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    //获取所有角色列表数据
    async getRolesList() {
      const res = await this.$store.dispatch("getRolesList");
      //console.log(res);
      if (res.meta.status !== 200) {
        return this.$Message.error("获取角色列表失败!");
      }
    },
    //点击按钮添加角色
    addRoles() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return;
        const res = await RolesApi.addRoles(this.addForm);
        console.log(res);
        if (res.meta.status !== 201) {
          return this.$Message.error("角色创建失败!");
        }
        this.$Message.success("角色创建成功!");
        //关闭添加用户对话框
        this.addRolesVisible = false;
        //重新渲染角色列表数据
        this.getRolesList();
      });
    },
    //监听添加角色对话框的关闭事件
    addRolesClosed() {
      this.$refs.addFormRef.resetFields();
    },
    //展示编辑角色对话框
    async showEditDialog(uid) {
      this.editRolesVisible = true;
      const res = await this.$store.dispatch("getRolesById", uid);
      //console.log(res);
      if (res.meta.status !== 200) {
        return this.$Message.error("查询用户信息失败!");
      }
    },
    //监听修改角色对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    //修改角色信息并提交
    editRolesInfo() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return;
        const res = await RolesApi.setRolesInfo(this.editForm);
        console.log(res);
        if (res.meta.status !== 200) {
          return this.$Message.error("更新角色信息失败!");
        }
        this.$Message.success("更新角色信息成功!");
        this.editRolesVisible = false;
        this.getRolesList();
      });
    },
    //根据角色Id删除对应角色
    async remveRolesById(uid) {
      //弹框提示用户是否要删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除该角色, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      if (confirmResult !== "confirm") {
        return this.$Message.info("已取消删除!");
      }
      const res = await RolesApi.deleteRolesById(uid);
      //console.log(res);
      if (res.meta.status !== 200) {
        return this.$Message.error("删除角色失败!");
      }
      this.$Message.success("删除角色成功!");
      this.getRolesList();
    },
    //根据Id删除对应权限
    async removeRightById(role, rightId) {
      //弹框提示用户是否要删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除该权限, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      if (confirmResult !== "confirm") {
        return this.$Message.info("已取消删除!");
      }
      const res = await RolesApi.deleteRightById(role.id, rightId);
      console.log(res);
      if (res.meta.status !== 200) {
        return this.$Message.error("删除权限失败!");
      }
      this.$Message.success("删除权限成功!");
      role.children = res.data;
    },
    //展示分配权限的对话框
    async showSetRightDialog(role) {
      this.roleId = role;
      const res = await RightsApi.getRightsListAll("tree");
      if (res.meta.status !== 200) {
        return this.$Message.error("获取权限数据失败!");
      }
      this.rightsTree = res.data;
      //递归获取三级节点的Id
      this.getLeafkeys(role, this.defKeys);
      this.showSetRightDialogVisible = true;
    },
    //通过递归的形式,获取角色下三级权限的id
    getLeafkeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach(item => {
        this.getLeafkeys(item, arr);
      });
    },
    //监听分配权限对话框的关闭事件
    setRightDialogColsed() {
      this.defKeys = [];
    },
    //点击为角色分配权限
    async allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ];
      const idStr = keys.join(",");
      const res = await RolesApi.allotRightsById(this.roleId, idStr);
      //console.log(res);
      if (res.meta.status !== 200) {
        return this.$Message.error("分配权限失败!");
      }
      this.$Message.success("分配权限成功!");
      this.getRolesList();
      this.showSetRightDialogVisible = false;
    }
  },
  computed: {
    ...mapGetters({
      //角色列表数据
      rolesList: "rolesList",
      //查询到的角色信息
      editForm: "editForm"
    })
  }
};
</script>

<style lang="less" scoped>
.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>