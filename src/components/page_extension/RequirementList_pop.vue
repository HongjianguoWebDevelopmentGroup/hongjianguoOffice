<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :modal="false" class="dialog-small">
  	<el-form label-width="100px" ref="form" :model="form" :rules="rules">
  		
  		<el-form-item label="名称" prop="name">
  			<el-input v-model="form.name" ></el-input>
  		</el-form-item>
  		<el-form-item label="申请人类型" prop="customer_type">
  			<static-select type="applicant_type" v-model="form.customer_type"></static-select>
  		</el-form-item>
      <el-form-item label="邮编" prop="postcode">
  			<el-input v-model="form.postcode" ></el-input>
  		</el-form-item>
      <el-form-item label="社会信用代码">
  			<el-input v-model="form.identity" ></el-input>
  		</el-form-item>
      <el-form-item label="邮件地址" prop="email_address">
  			<el-input v-model="form.email_address" ></el-input>
  		</el-form-item>
      <el-form-item label="电话号码" prop="phone_number">
  			<el-input v-model="form.phone_number" ></el-input>
  		</el-form-item>
      <el-form-item label="地址" prop="address">
  			<el-input v-model="form.address" ></el-input>
  		</el-form-item>
      <el-form-item label="住宿所在地">
  			<el-input v-model="form.residence" ></el-input>
  		</el-form-item>
      <el-form-item label="国籍">
  			<el-input v-model="form.citizenship" ></el-input>
  		</el-form-item>
      <el-form-item label="地区">
  			<provincial-linkage v-model="cityInfo"  class="select-city" @input="chooseAddress"></provincial-linkage>
  		</el-form-item>
      <el-form-item label="英文名称" prop="english_name">
  			<el-input v-model="form.english_name" ></el-input>
  		</el-form-item>
      <el-form-item label="英文地址">
  			<el-input v-model="form.english_address" ></el-input>
  		</el-form-item>
      <el-form-item  label="">
          <el-checkbox v-model="form.is_default">是否默认申请人</el-checkbox>
          <el-checkbox v-model="form.is_fee_discount">是否费减备案</el-checkbox>
        </el-form-item>
			<el-form-item style="margin-bottom: 0px;">
				<el-button type="primary" @click="add" v-if="type === 'add'" :disabled="btn_disabled">添加</el-button>
				<el-button type="primary" @click="edit" v-if="type === 'edit'" :disabled="btn_disabled">编辑</el-button>
			</el-form-item>

  	</el-form>
  </el-dialog>
</template>

<script>
import PopMixins from '@/mixins/pop-mixins'
import StaticSelect from '@/components/form/StaticSelect'
import ProvincialLinkage from '@/components/form/ProvincialLinkage'
const URL = '/api/applicants'
export default {
  name: 'RequireListPop',
  mixins: [ PopMixins ],
  props: [ 'customer' ],
  data () {
		return {
      cityInfo:'',
      form: {
        name: '',
        customer_type: '',
        postcode: '',
        identity:'',
        email_address:'',
        phone_number:'',
        address:'',
        residence:'',
        citizenship:'',
        province:'',
        city:'',
        district:'',
        english_name:'',
        english_address:'',
        province_code:'',
        city_code:'',
        district_code:'',
        is_default:false,
        is_fee_discount:false
      },
      'rules': {
        'name': [{ required: true, message: '客户名称不能为空', trigger: 'blur'},
                 { min: 1, max: 50, message: '长度不超过50个字符', trigger: 'blur'},
                 { pattern: /^[^~!@#$%^&*]+$/, message: '客户名不能包含非法字符', trigger: 'blur' }],
        'customer_type': { required: true, message: '申请人类型不能为空', trigger: 'change' },
        'postcode': { required: true, message: '邮编不能为空', trigger: 'blur' },
        'email_address': [{ required: true, message: '客户名称不能为空', trigger: 'blur'},
                      { min: 1, max: 200, message: '长度不超过200个字符', trigger: 'blur'},
                    { pattern: /^[^~!@#$%^&*]+$/, message: '地址不能包含非法字符', trigger: 'blur' }],
        'phone_number': { pattern: /(^[0-9]{3,4}\-[0-9]{7,8})$|(^[0-9]{3,4}\-[0-9]{7,8})(-\d{1,6}?$)|^1[3|4|5|7|8][0-9]{9}$/, message: '手机号码或者座机号码格式错误', trigger: 'blur' },
        'address': [{ required: true, message: '客户名称不能为空', trigger: 'blur'},
                   { min: 1, max: 200, message: '长度不超过200个字符', trigger: 'blur'},
                    { pattern: /^[^~!@#$%^&*]+$/, message: '地址不能包含非法字符', trigger: 'blur' }],
        'english_name':[{ required: true, message: '客户英文不能为空', trigger: 'blur'},
                 { min: 1, max: 50, message: '长度不超过50个字符', trigger: 'blur'},
                 { pattern: /^[^~!@#$%^&*]+$/, message: '英文名称不能包含非法字符', trigger: 'blur' }],
      }
		}
  },
  computed: {
  //cityName 为选择的省市区名称
    cityName() {
      const names = [];
      this.cityInfo.province && names.push(this.cityInfo.province.name + ' ')
      this.cityInfo.city     && names.push(this.cityInfo.city.name + ' ')
      this.cityInfo.block    && names.push(this.cityInfo.block.name + ' ')
      return names.join('')
    }
  },
  methods: {
  	submitForm () {
  		return Object.assign({}, this.form, {customer_id: this.customerId});
    },
    add(){
      // console.log(this.form.province_code);
      const url = `${URL}`;
      const data = Object.assign({},this.form);
      const success = _=>{
      	this.$refs.table.update();
      }
      this.$axiosPost({url, data, success});
    },
    chooseAddress (info) {
        this.form.province_code = info.province.code;
        this.form.city_code = info.city.code;
        this.form.district_code = info.block.code;
        this.form.province = info.province.name;
        this.form.city = info.city.name;
        this.form.district = info.block.name;
    }
  },
  components: { 
    StaticSelect,
    ProvincialLinkage
  },
  URL: '/api/requirements',
  REMINDER_TEXT: '客户要求',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>