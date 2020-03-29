<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图-->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddpage">添加商品</el-button>
        </el-col>
      </el-row>
      <!--tab表格区域-->
      <el-table :data="goodslist" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price" width="95px"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="70px"></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="140px">
          <template slot-scope="scope">{{scope.row.add_time | dataFormat}}</template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditGoodsDialob(scope.row.goods_id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeById(scope.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>

    <!--修改商品的对话框-->
    <el-dialog
      title="修改商品"
      :visible.sync="editGoodsDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!--内容主题区域-->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item label="商品ID">
          <el-input v-model="editForm.goods_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="editForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input v-model="editForm.goods_price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="goods_number">
          <el-input v-model="editForm.goods_number" type="number"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="goods_weight">
          <el-input v-model="editForm.goods_weight" type="number"></el-input>
        </el-form-item>
      </el-form>
      <!--底部按钮区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editGoodsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editGoodsInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ListApi from "@/api/list";
export default {
  name: "List",
  data() {
    return {
      //商品列表
      goodslist: [],
      //查询参数对象
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      //获取总数据数
      total: 0,
      //控制修改商品对话框的显示与隐藏
      editGoodsDialogVisible: false,
      //保存获取的商品信息
      editForm: {},
      //修改表单的验证规则
      editFormRules: {
        goods_name: [
          { required: true, message: "商品名称不能为空", trigger: "blue" }
        ],
        goods_price: [
          { required: true, message: "商品价格不能为空", trigger: "blue" }
        ],
        goods_number: [
          { required: true, message: "商品数量不能为空", trigger: "blue" }
        ],
        goods_weight: [
          { required: true, message: "商品重量不能为空", trigger: "blue" }
        ]
      }
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    //根据分页获取所有商品列表
    async getGoodsList() {
      const res = await ListApi.getGoodsList(this.queryInfo);
      if (res.meta.status !== 200) {
        return this.$Message.error("获取商品列表失败!");
      }
      this.goodslist = res.data.goods;
      this.total = res.data.total;
    },
    //监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize;
      console.log(this.queryInfo.pagesize);

      this.getGoodsList();
    },
    //监听 pagenum 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getGoodsList();
    },
    //根据Id删除商品列表
    async removeById(gid) {
      //弹框提示用户是否要删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除该商品, 是否继续?",
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
      const res = await ListApi.delGoodsById(gid);
      if (res.meta.status !== 200) {
        return this.$Message.error("删除商品失败!");
      }
      this.$Message.success("删除商品成功!");
      this.getGoodsList();
    },
    //跳转到添加商品页面
    goAddpage() {
      this.$router.push("goods/add");
    },
    //监听修改商品对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    //展示修改商品对话框
    async showEditGoodsDialob(gid) {
      this.editGoodsDialogVisible = true;
      const res = await ListApi.getDoodsById(gid);
      if (res.meta.status !== 200) {
        return this.$Message.error("获取商品信息失败!");
      }
      this.editForm = res.data;
    },
    //修改商品信息并提交
    editGoodsInfo() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return;
        const res = await ListApi.setGoodsInfo(this.editForm);
        console.log(res);
        if (res.meta.status !== 200) {
          return this.$Message.error("更新商品信息失败!");
        }
        this.$Message.success("更新商品信息成功!");
        this.getGoodsList();
        this.editGoodsDialogVisible = false;
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>