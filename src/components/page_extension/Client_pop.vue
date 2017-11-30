<template>
  <el-dialog :key="popType" top="2%" :title="popType == 'add' ? '添加用户' : '编辑用户'" :visible.sync="dialogVisible" @close="close">
    <el-form :model="form" label-width="100px" ref="form" :rules="rules">
      
      <el-form-item label="客户国籍" prop="area">
        <static-select type="area" v-model="form.area"></static-select>
      </el-form-item>

      <el-form-item label="客户名称" prop="name">
        <el-input v-model="form.name" ></el-input>
      </el-form-item>
      <el-form-item label="英文名字" prop="en_name" >
        <el-input v-model="form.en_name" ></el-input>
      </el-form-item>
      <el-form-item label="省份" prop="province_city">
        <city v-model="form.province_city"></city>
      </el-form-item>      
      <el-form-item label="详细地址" prop="address">
        <el-input type="textarea" v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="英文地址" prop="en_address">
        <el-input type="textarea" v-model="form.en_address"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contact">
        <el-input v-model="form.contact"></el-input>
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
import AxiosMixins from '@/mixins/axios-mixins'
import PopMixins from '@/mixins/pop-mixins'
import RemoteSelect from '@/components/form/RemoteSelect'
import StaticSelect from '@/components/form/StaticSelect'
import City from '@/components/form/City'


export default {
  name: 'userListPop',
  mixins: [ AxiosMixins,PopMixins ],
  props: {
    'popType': {
      type: String, 
      default: 'add',
    },
  },
  data () {
    return {
      form: {
        area: '',
        name: '',
        en_name: '',
        province_city: [],
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
    setForm (data) {
      for(let k in this.form) {
        const d = data[k];
        if(k == 'province_city') {
          let arr = [];
          arr[0] = Number.parseInt(data['province']);
          arr[1] = Number.parseInt(data['city']);
          console.log(arr);
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
    close () {
      if(this.$refs.psd) {
        this.$refs.psd.clearEditPsd();
      }
    }
  },
  components: { 
    RemoteSelect,
    StaticSelect,
    City,
  },
  URL: '/api/customers'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
