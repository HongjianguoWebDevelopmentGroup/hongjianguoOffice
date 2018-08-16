<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" @close="close" class="dialog-small">
    <el-form :key="type" :model="form" label-width="100px" ref="form" :rules="rules">

      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"  placeholder="请填写姓名"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="branch">
        <branch v-model="form.branch" multiple></branch>
      </el-form-item>
      <el-form-item label="工号" prop="number">
        <el-input v-model="form.number" placeholder="请填写工号"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone_number">
        <el-input v-model="form.phone_number"  placeholder="请填写手机号"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请填写邮箱"></el-input>
      </el-form-item>
      <template v-if="type == 'add'">
        <el-form-item label="新建账号" prop="is_account">
          <el-checkbox v-model="form.is_account"></el-checkbox>
        </el-form-item>

        
          <el-form-item label="用户名不能为空" v-show="!!form.is_account">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" v-show="!!form.is_account">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" v-show="!!form.is_account">
            <el-input type="password" v-model="form.password_again"></el-input>
          </el-form-item>
        
      </template>
      
      <el-form-item style="margin-bottom: 0;">
        <el-button type="primary" @click="save"  size="small" :loading="btn_disabled">{{ btn_disabled ? '保存中...' : '保存'}}</el-button>
        <el-button @click="dialogVisible = false" size="small">取消</el-button>
      </el-form-item>
    
    </el-form>
  </el-dialog>
</template>

<script>

import PopMixins from '@/mixins/pop-mixins'
import Branch from '@/components/form/Branch'

export default {
  name: 'employeePop',
  mixins: [ PopMixins ],
  data () {
    return {
      form: {
        name: '',
        branch: [],
        number: '',
        phone_number: '',
        email: '',
        is_account: false,
        password: '',
        password_again: '',
      },
      rules: {
        name: { required: true, message: '人员名称不能为空', trigger: 'blur'},
        branch: {required: true, type: 'array', message: '部门不能为空', trigger: 'change' },
        phone_number: {type: 'string', pattern: /^1[0-9]{10}$/, message: '手机号格式错误'},
        email:  {type: 'string', pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式错误'},
      },
      dialogVisible: false,
    }
  },
  computed: {},
  methods: {
    close () {
      this.clear();
    },
    save () {
      if(this.type == 'add') {
        if(this.form.is_account) {
          if(!this.form.username) return this.$message({type: 'warning', message: '用户名不能为空'});
          if(!this.form.password) return this.$message({type: 'warning', message: '密码不能为空'});
          if(!this.form.password_again) return this.$message({type: 'warning', message: '确认密码不能为空'});
          if(this.form.password != this.form.password_again) return this.$message({type: 'warning', message: '密码不一致'});
        }
        this.add();
      }
      if(this.type == 'edit') {
        this.edit();
      }
    },
    setForm (data) {
      this.$tool.coverObj(this.form, data);
      if(this.type == 'edit') {
        this.form.branch = this.form.branch.map(_=>_.id);
      }
    },
    editForm () {
      return this.$tool.shallowCopy(this.form, {skip: [ 'is_account', 'password', 'password_again']})
    }
  },
  components: {
    Branch,
  },
  URL: '/api/employees',
  REMINDER_TEXT: '人员',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
