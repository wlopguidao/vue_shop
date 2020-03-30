<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图-->
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getOrderList">
            <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!--订单列表数据-->
      <el-table :data="orderlist" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款" prop="pay_status">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.pay_status=='1'">已付款</el-tag>
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间" prop="create_time">
          <template slot-scope="scope">{{scope.row.create_time | dataFormat}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--修改订单按钮-->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showBox(scope.row.order_id)"
            ></el-button>
            <!--展示进度按钮-->
            <el-button type="success" icon="el-icon-location" size="mini" @click="showProgressBox"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!--修改订单的对话框-->
    <el-dialog
      title="修改订单"
      :visible.sync="setOrderVisible"
      width="50%"
      @close="setOrderDialogClosed"
    >
      <!--内容主题区域-->
      <el-form
        :model="setOrderForm"
        :rules="setOrderFormRules"
        ref="setOrderFormRef"
        label-width="100px"
      >
        <el-form-item label="订单ID">
          <el-input v-model="setOrderForm.orlist.order_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="是否发货">
          <el-radio v-model="setOrderForm.orlist.is_send" label="否">未发货</el-radio>
          <el-radio v-model="setOrderForm.orlist.is_send" label="是">已发货</el-radio>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-radio v-model="setOrderForm.orlist.order_pay" label="0">未支付</el-radio>
          <el-radio v-model="setOrderForm.orlist.order_pay" label="1">支付宝</el-radio>
          <el-radio v-model="setOrderForm.orlist.order_pay" label="2">微信</el-radio>
          <el-radio v-model="setOrderForm.orlist.order_pay" label="3">银行卡</el-radio>
        </el-form-item>
        <el-form-item label="订单价格">
          <el-input v-model="setOrderForm.orlist.order_price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="订单数量">
          <el-input v-model="setOrderForm.orlist.order_number"></el-input>
        </el-form-item>
        <el-form-item label="支付状态">
          <el-radio v-model="setOrderForm.orlist.pay_status" label="0">未付款</el-radio>
          <el-radio v-model="setOrderForm.orlist.pay_status" label="1">已付款</el-radio>
        </el-form-item>
        <el-form-item label="省市区/县" prop="address1">
          <!--级联选择框-->
          <el-cascader v-model="setOrderForm.address1" :options="cityData" :props="orderProps"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="setOrderForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <!--底部按钮区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="setOrderVisible = false">取 消</el-button>
        <el-button type="primary" @click="editOrder">确 定</el-button>
      </span>
    </el-dialog>

    <!--展示物流进度的对话框-->
    <el-dialog title="物流进度" :visible.sync="progressVisible" width="50%">
      <!--时间线-->
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in progressInfo"
          :key="index"
          :timestamp="activity.time"
        >{{activity.context}}</el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import OrderApi from "@/api/order";
import cityData from "@/utils/citydata";
export default {
  name: "Order",
  data() {
    return {
      //查询对象
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      //订单数据列表
      orderlist: [],
      //过去订单总记录数
      total: 0,
      //控制修改订单对话框的显示与隐藏
      setOrderVisible: false,
      //修改订单对话框表单数据
      setOrderForm: {
        address1: [],
        address2: "",
        //保存获取到的订单信息
        orlist: {}
      },
      //修改地址对话框表单验证规则
      setOrderFormRules: {
        address1: [
          { required: true, message: "请选择省市区县", trigger: "blur" }
        ],
        address2: [
          { required: true, message: "请填写详细地址", trigger: "blur" }
        ]
      },
      //获取导入的中国省市区
      cityData: cityData,
      //级联选择器的配置对象
      orderProps: {
        expandTrigger: "hover"
      },
      //控制展示物流进度对话框的显示与隐藏
      progressVisible: false,
      //保存查询到的物流信息
      progressInfo: []
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    //获取所有订单列表
    async getOrderList() {
      const res = await OrderApi.getOrderListAll(this.queryInfo);
      if (res.meta.status !== 200) {
        return this.$Message.error("获取订单列表失败！");
      }
      this.orderlist = res.data.goods;
      this.total = res.data.total;
    },
    //监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getOrderList();
    },
    //监听 当前页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getOrderList();
    },
    //展示修改订单的对话框
    async showBox(oid) {
      const res = await OrderApi.getOrderInfoById(oid);
      if (res.meta.status !== 200) {
        return this.$Message.error("获取订单信息失败！");
      }
      this.setOrderForm.orlist = res.data;
      this.setOrderVisible = true;
    },
    //监听修改订单对话框的关闭事件
    setOrderDialogClosed() {
      this.$refs.setOrderFormRef.resetFields();
    },
    //点击按钮展示物流进度
    async showProgressBox() {
      const res = await OrderApi.getKdInfo("1106975712662");
      if (res.meta.status !== 200) {
        return this.$Message.error("获取物流信息失败！");
      }
      this.progressInfo = res.data;
      this.progressVisible = true;
    },
    //点击提交修改订单信息
    editOrder() {
      this.$refs.setOrderFormRef.validate(async valid => {
        if (!valid) return;
        const res = await OrderApi.setOrderInfo(this.setOrderForm.orlist);
        console.log(res);
        if (res.meta.status !== 201) {
          return this.$Message.error("修改订单信息失败！");
        }
        this.$Message.success("修改订单信息成功！");
        this.getOrderList();
        this.setOrderVisible = false;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-cascader {
  width: 100%;
}
</style>