<template>
  <el-dialog :key="popType" top="2%" :title="popType == 'add' ? '添加用户' : '编辑用户'" :visible.sync="dialogVisible" @close="close">
    <el-form :model="form" label-width="100px" ref="form" :rules="rules">
      
      <el-form-item label="客户国籍" prop="area">
        <static-select type="area" v-model="form.area"></static-select>
      </el-form-item>

      <el-form-item label="客户名称" prop="name" v-if="popType == 'add'">
        <el-input v-model="form.name" ></el-input>
      </el-form-item>
      <el-form-item label="英文名字" prop="en_name" v-if="popType == 'edit'">
        <el-input v-model="form.en_name" ></el-input>
      </el-form-item>
      <el-form-item label="省份" prop="province">
        <city v-model="form.province"></city>
      </el-form-item>      
      <el-form-item label="详细地址" prop="address">
        <el-input type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="英文地址" prop="en_address">
        <el-input type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contact">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>  
      </el-form-item>
      <el-form-item label="手机号" prop="cell_phone">
        <el-input v-model="form.cell_phone"></el-input> 
      </el-form-item>
      <el-form-item label="微信号" prop="wechat">
        <el-input v-model="form.wechat"></el-input> 
      </el-form-item>
      <el-form-item label="QQ" prop="qq">
        <el-input v-model="form.qq"></el-input>
      </el-form-item>

      <el-form-item style="margin-bottom: 0;">
        <el-button type="primary" @click="add" v-if="popType == 'add'">确定</el-button>
        <el-button type="primary" @click="edit" v-if="popType == 'edit'">编辑</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import UserRole from '@/components/form/UserRole'
import AxiosMixins from '@/mixins/axios-mixins'
import EditPassword from '@/components/form/EditPassword'
import RemoteSelect from '@/components/form/RemoteSelect'
import StaticSelect from '@/components/form/StaticSelect'
import City from '@/components/form/City'

const URL = 'api/members'

export default {
  name: 'userListPop',
  mixins: [ AxiosMixins ],
  props: {
    'popType': {
      type: String, 
      default: 'add',
    },
    'group': null,
  },
  data () {
    return {
      'id': '',
      form: {
        area: '',
        name: '',
        en_name: '',
        province: [],
        city: '',
        address: '',
        en_address: '',
        contact: '',
        cell_phone: '',
        email: '',
        qq: '',
        wechat: ''
      },
      'rules': {
        'email': { pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, message: '邮箱格式错误', trigger: 'blur' },
        'cell_phone': { pattern: /(^[0-9]{3,4}\-[0-9]{7,8})$|(^[0-9]{3,4}\-[0-9]{7,8})(-\d{1,6}?$)|^1[3|4|5|7|8][0-9]{9}$/, message: '手机号码或者座机号码格式错误', trigger: 'blur'},
        'qq': { pattern: /^[1-9][0-9]{4,9}$/, message: 'qq号码格式错误', trigger: 'blur,change'},
      },
      dialogVisible: false,
      editPsd: false,
    }
  },
  computed: {
    dialogTitle () {
      return this.popType == 'add' ? '添加用户' : '编辑用户';
    },
  },
  methods: {
    show (row) {
      this.dialogVisible = true;
      
      // console.log("----------------------------------")
      // console.log(this.$refs.form.fields);
/*      this.$nextTick(()=>{
      // console.log(this.$refs.form.fields);
      // console.log("------------------------------------")
        if(this.$refs.form) {
          this.$refs.form.resetFields();
          this.form.username = "";
          this.form.password = "";
          this.form.password_again = "";
          this.form.name = "";
          this.form.email = "";
          this.form.mobile = "";
          this.form.weixin = "";
          this.form.qq = "";
        } 
        if(this.popType == 'add') {
          this.form.group_id = this.group && this.group.id ? this.group.id : '';
        }

        if(this.popType == 'edit') {
          this.$tool.coverObj(this.form, row); 
          this.id = row.id;
        }
          
      });*/
    },
    add () {
      let flag = false;
      this.$refs.form.validate(_=>{ flag = !_ });
      if( flag || this.psdCheck() ) return;

      const url = URL;
      const data = this.form;
      const success = _=>{
        this.$message({message: '添加用户成功', type: 'success'});
        this.dialogVisible = false;
        this.$emit('refresh');
      }

      this.axiosPost({url, data, success});
    },
    edit () {
      let flag = false;
      this.$refs.form.validate(_=>{ flag = !_ })
      if( flag || this.$refs.psd.check() ) return;

      const url = `${URL}/${this.id}`;
      const data = this.$tool.shallowCopy(this.form, {skip: ['group_id']});
      const success = _=>{
        this.$message({message: '编辑用户成功', type: 'success'});
        this.dialogVisible = false;
        this.$emit('refresh');
      }

      this.axiosPut({url, data, success});
    },
    close () {
      if(this.$refs.psd) {
        this.$refs.psd.clearEditPsd();
      }
    }
  },
  components: { 
    UserRole,
    EditPassword,
    RemoteSelect,
    StaticSelect,
    City,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
