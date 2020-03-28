<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图-->
    <el-card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level == '0'">一级权限</el-tag>
            <el-tag type="success" v-else-if="scope.row.level == '1'">二级权限</el-tag>
            <el-tag type="warning" v-else>三级权限</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Rights",
  created() {
    this.getRightsList();
  },
  methods: {
    //获取权限列表
    async getRightsList() {
      const res = await this.$store.dispatch("getRights", "list");
      if (res.meta.status !== 200) {
        return this.$Message.error("获取用户权限失败!");
      }
    }
  },
  computed: {
    ...mapGetters({
      //权限列表数据
      rightsList: "rightsList"
    })
  }
};
</script>

<style lang="less" scoped>
</style>