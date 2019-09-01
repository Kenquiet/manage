<template>
  <div class="dialog">
    <el-dialog
        :title="dialog.title"
        :visible.sync="dialog.show"
        :close-on-click-modal="false"
        :close-on-press-escape="true"
        :modal-append-to-body="false"
    >
      <div class="form">
        <el-form
            ref="form"
            :model="form"
            :rules="form_rules"
            label-width="120px"
            style="margin: 10px auto"
        >
          <el-form-item label="收支类型">
            <el-select v-model="form.type" placeholder="收支类型">
              <el-option
                  v-for="(formtype,index) in format_type_list"
                  :key="index"
                  :value="formtype"
                  :label="formtype"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="describe" label="收支描述:">
            <el-input type="describe" v-model="form.describe"></el-input>
          </el-form-item>

          <el-form-item prop="income" label="收入:">
            <el-input type="income" v-model="form.income"></el-input>
          </el-form-item>

          <el-form-item prop="expend" label="支出:">
            <el-input type="expend" v-model="form.expend"></el-input>
          </el-form-item>

          <el-form-item prop="cash" label="账户现金:">
            <el-input type="cash" v-model="form.cash"></el-input>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="dialog.show=false">取消</el-button>
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
          </el-form-item>

        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "DialogFound",
    props: {
      dialog: Object,
      form: Object
    },
    data () {
      return {
        format_type_list: [
          "打仗",
          "微信转账",
          "充值",
          "借",
          "还是借",
          "种植"
        ],
        form_rules: {
          describe: [
            { required: true, message: "收支描述不能为空！", trigger: "blur" }
          ],
          income: [
            { required: true, message: "收入不能为空！", trigger: "blur" }
          ],
          expend: [
            { required: true, message: "支出不能为空！", trigger: "blur" }
          ],
          cash: [{ required: true, message: "账户不能为空！", trigger: "blur" }]
        }
      }
    },
    methods:{
      onSubmit(form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            const url = this.dialog.option === 'add'? 'add': `edit/${this.form.id}`;
            this.$axios.post(`/api/profile/${url}`,this.form)
              .then(res => {
                this.$message({
                  message:'数据提交成功',
                  type:'success'
                })
              });
            this.dialog.show = false;
            this.$emit('update')
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
