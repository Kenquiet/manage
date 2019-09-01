<template>
  <div class="fundList">
    <div>
      <el-form :inline="true" ref="search_data" class="form_search" :model="search_data">
        <el-form-item label="按照时间筛选:">
          <el-date-picker
              v-model="search_data.startTime"
              type="datetime"
              placeholder="选择开始时间">
          </el-date-picker>
          --
          <el-date-picker
              v-model="search_data.endTime"
              type="datetime"
              placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="view" @click="handleSearch()"
          >筛选</el-button>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button
              type="primary"
              size="small"
              icon="view"
              v-if="user.identity === 'manager'"
              @click="onAddMoney()"
          >添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
          v-if="DataList.length > 0"
          :data="DataList"
          style="width: 100%"
          max-height="100%"
          border
      >
        <el-table-column type="index" label="序号" width="70px" align="center"></el-table-column>
        <el-table-column prop="date" label="创建日期" width="250px" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="收支类型" width="170px" align="center"></el-table-column>
        <el-table-column prop="describe" label="收支描述" width="170px" align="center"></el-table-column>
        <el-table-column prop="income" label="收入" width="120px" align="center">
          <template slot-scope="scope">
            <span style="color: #00d053">{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出" width="120px" align="center">
          <template slot-scope="scope">
            <span style="color: #f56767">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cash" label="账户现金" width="170px" align="center">
          <template slot-scope="scope">
            <span style="color: #4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="170px" align="center"></el-table-column>
        <el-table-column
            prop="operation"
            fixed="right"
            label="操作"
            width="170px"
            align="center"
            v-if="user.identity === 'manager'"
        >
          <template slot-scope="scope">
            <el-button
                size="small"
                type="warring"
                icon="edit"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
                size="small"
                type="danger"
                icon="delete"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24" class="pagination">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
    <DialogFound :dialog="dialog"  :form="form" @update="getProfiles"></DialogFound>
  </div>
</template>

<script>
  import DialogFound from '../components/DialogFound'
  export default {
    name: "FundList",
    data () {
      return {
        paginations: {
          page_index: 1, // 当前显示哪一页
          total: 0, // 页数总数
          page_size: 5 , // 一页显示多少条
          page_sizes: [5,10,15,20], // 每页显示多少条
          layout: "total, sizes, prev, pager, next, jumper"
        },
        DataList: [],
        allDataList:[],
        filterDataList:[],
        dialog:{
          show: false,
          title: "",
          option: "edit"
        },
        form: {
          type: "",
          describe: "",
          income: "",
          expend: "",
          cash: "",
          remark: "",
          id: ""
        },
        search_data: {
          startTime: '',
          endTime: ''
        }
      }
    },
    created() {
      this.getProfiles()
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    methods: {
      getProfiles() {
        this.$axios.get('/api/profile')
          .then(res => {
            this.allDataList =res.data;
            this.filterDataList = res.data;
            this.setPagination()
          })
          .catch(err => {
            console.log(err)
          })
      },
      setPagination() {
        //设置分页数据
        this.paginations.total = this.allDataList.length;
        this.paginations.page_size = 5;
        this.paginations.page_index= 1;

        // 过滤数据
        this.DataList = this.allDataList.filter((item,index) => {
          return index < this.paginations.page_size
        })
      },

      //页码大小的方法，展示一页有多少条信息
      handleSizeChange(page_size) {
        this.paginations.page_size = page_size;
        this.paginations.page_index = 1;
        // 过滤数据
        this.DataList = this.allDataList.filter((item,index) => {
          return index < this.paginations.page_size
        })
      },
      // 当前页变动时触发的方法
      handleCurrentChange(page) {
        // 每一页的下标
        let index = this.paginations.page_size * (page-1);

        // 数据的总数
        let nums = this.paginations.page_size * page;

        let tabels = [];

        for (let i = index; i < nums; i++) {
          if (this.allDataList[i]) {
            tabels.push(this.allDataList[i])
          }
          this.DataList = tabels;
        }
      },
      // 根据时间筛选数据
      handleSearch() {
        if (!this.search_data.startTime && !this.search_data.endTime) {
          this.$message({
            message:'请选择时间区间',
            type:'warning'
          });
          this.getProfiles();
          return
        }

        const sTime = this.search_data.startTime.getTime();
        const eTime = this.search_data.endTime.getTime();
        console.log(sTime,eTime)
        this.allDataList = this.filterDataList.filter( item => {
          let date = new Date(item.date);
          let time = date.getTime();
          return time >= sTime && time <= eTime
        });
        // 筛选完就进行调用分页方法
        this.setPagination()
      },

      handleEdit(index,row) {
        this.dialog = {
          show: true,
          title: "修改资金信息",
          option: "edit"
        };
        this.form = {
          type: row.type,
          describe: row.describe,
          income: row.income,
          expend: row.expend,
          cash: row.cash,
          remark: row.remark,
          id: row._id
        };

      },
      handleDelete(index,row) {
        this.$axios.delete(`/api/profile/delete/${row._id}`)
          .then(res => {
            this.$message('删除成功！');
            this.getProfiles()
          })
      },
      onAddMoney() {
        this.dialog = {
          show: true,
          title: "添加资金信息",
          option: "add"
        };
      }
    },
    components:{
      DialogFound
    }
  }
</script>

<style scoped >
  .btnRight{
    float:right;
    margin-right:10px;
  }
  .pagination{
    text-align: right;
    margin-top: 10px;
    padding-right: 20px;
  }
  .form_search{
    margin-top: 10px;
    margin-left: 10px;
  }
</style>
