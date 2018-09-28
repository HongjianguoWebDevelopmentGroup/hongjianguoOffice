<template>

  <el-form :model="form" label-width="100px" ref="form" :rules="rules">
    <el-row>
      <el-col :span="24">
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="客户代码" prop="consultant_id" >
          <el-input v-model="form.consultant_id" ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="所属销售" prop="sales_id">
          <static-select type="market" v-model="form.sales_id"></static-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="联系人" prop="linkman">
          <el-input v-model="form.linkman"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="地址" prop="address">
      <el-input v-model="form.address"></el-input>
    </el-form-item>
    <el-row>
      <el-col :span="24">
        <el-form-item label="邮箱" prop="email_address">
          <el-input v-model="form.email_address"></el-input>  
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="电话" prop="phone_number">
          <el-input v-model="form.phone_number"></el-input> 
        </el-form-item>
      </el-col>
    </el-row>    
    <el-form-item label="备注" prop="remark">
      <el-input type="textarea" v-model="form.remark"></el-input>
    </el-form-item>
    <el-form-item style="margin-bottom: 0;">
      <el-button type="primary" @click="formSave" v-if="popType == 'edit'" size="small">保存</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
import PopMixins from '@/mixins/pop-mixins'
import RemoteSelect from '@/components/form/RemoteSelect'
import StaticSelect from '@/components/form/StaticSelect'
import City from '@/components/form/City'

const URL = '/api/customers';

export default {
  name: 'clientListForm',
  mixins: [ PopMixins ],
  props:['popType', 'customer','shrinkVisible'],
  data () {
    return {
      form: {
        name: '',
        consultant_id: '',
        sales_id: '',
        address: '',
        phone_number: '',
        email_address: '',
        remark: '',
        linkman: '',
      },
      'rules': {
        'sales_id': { required: true, message: '销售类型不能为空', trigger: 'change'},
        'name': [{ required: true, message: '客户名称不能为空', trigger: 'blur'},
                 { min: 1, max: 50, message: '长度不超过50个字符', trigger: 'blur'},
                 { pattern: /^[^~!@#$%^&*]+$/, message: '客户名称不能包含非法字符', trigger: 'blur' }],
        'consultant_id': [{ min: 1, max: 50, message: '长度不超过50个字符', trigger: 'blur'},
                    { pattern: /^[^~!@#$%^&*]+$/, message: '客户代码不能包含非法字符', trigger: 'blur' }],
        'address': [{ min: 1, max: 200, message: '长度不超过200个字符', trigger: 'blur'},
                    { pattern: /^[^~!@#$%^&*]+$/, message: '地址不能包含非法字符', trigger: 'blur' }],
        'email_address': { pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, message: '邮箱格式错误', trigger: 'blur' },
        'phone_number': { pattern: /(^[0-9]{3,4}\-[0-9]{7,8})$|(^[0-9]{3,4}\-[0-9]{7,8})(-\d{1,6}?$)|^1[3|4|5|7|8][0-9]{9}$/, message: '手机号码或者座机号码格式错误', trigger: 'blur'},
      },
      dialogVisible: false,
      editPsd: false,
    }
  },
  created(){
    let data = this.customer;
    this.form.name = data.name;
    this.form.consultant_id = data.id;
    this.form.sales_id = data.sales_id;
    this.form.address = data.address;
    this.form.email_address = data.email_address;
    this.form.phone_number = data.phone_number;
    this.form.market = data.market;
  },
  methods: {
    setForm (data) {
      for(let k in this.form) {
        const d = data[k];
        if(k == 'province_city') {
          let arr = [];
          arr[0] = Number.parseInt(data['province']);
          arr[1] = data['city'] + '';
          this.form[k] = arr;
        }else {
          this.form[k] = d;
        }
      }
    },
    submitForm () {
      const o = {};
      for(let k in this.form) {
        const d = this.form[k];
        if(k == 'province_city') {
          o.province = d[0] ? d[0] : '';
          o.city = d[1] ? d[1] : '';
        }else {
          o[k] = d;
        }
      }
      return o;
    },
    formSave () {
      const url = `${URL}/${this.customer.id}`;
      const data = Object.assign({},this.form);
      const success = _=>{
        // this.shrinkVisible = false;
        this.$emit('refreshTableData');
        this.$message({message: '更新客户成功！', type: 'success'})
      }
      this.$axiosPut({url, data, success});
    }
  },
  components: { 
    RemoteSelect,
    StaticSelect,
    City,
  },
  // URL: '/api/clients',
  // REMINDER_TEXT: '客户',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
