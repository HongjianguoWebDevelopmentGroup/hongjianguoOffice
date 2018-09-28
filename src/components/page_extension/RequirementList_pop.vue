<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :modal="false" class="dialog-small">
  	<el-form label-width="100px" ref="form" @update ='update' :model="form" :rules="rules">
  		
  		<el-form-item label="名称" prop="name">
  			<el-input v-model="form.name" ></el-input>
  		</el-form-item>
  		<el-form-item label="申请人类型" prop="type">
  			<static-select type="applicant_type" v-model="form.type"></static-select>
  		</el-form-item>
      <el-form-item label="邮编" prop="postcode">
  			<el-input v-model="form.postcode" ></el-input>
  		</el-form-item>
      <el-form-item label="证件号码">
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
      <el-form-item label="费减备案" prop="is_fee_discount">
  			<static-select type="records" v-model="form.is_fee_discount"></static-select>
  		</el-form-item>
      <el-form-item  label="">
          <el-checkbox v-model="form.is_default">是否默认申请人</el-checkbox>
        </el-form-item>
			<el-form-item style="margin-bottom: 0px;">
				<el-button type="primary" @click="add" v-if="type === 'add'" :disabled="btn_disabled">添加</el-button>
				<el-button type="primary" @click="edit" v-if="type === 'edit'" :disabled="btn_disabled">编辑</el-button>
        <el-button type="button" @click="cancel" :disabled="btn_disabled">取消</el-button>
			</el-form-item>

  	</el-form>
  </el-dialog>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
import PopMixins from '@/mixins/pop-mixins'
import StaticSelect from '@/components/form/StaticSelect'
import ProvincialLinkage from '@/components/form/ProvincialLinkage'
const URL = '/api/customers'
export default {
  name: 'RequireListPop',
  mixins: [ PopMixins ],
  props: [ 'customer', 'presentId' ],
  data () {
		return {
      cityInfo:'',
      form: {
        name: '',
        type: '',
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
        is_fee_discount:''
      },
      'rules': {
        'name': [{ required: true, message: '申请人名称不能为空', trigger: 'blur'},
                 { min: 1, max: 50, message: '长度不超过50个字符', trigger: 'blur'},
                ],
        'type': { required: true, message: '申请人类型不能为空', trigger: 'change' },
        'identity':[{required: true, message: '证件号码不能为空', trigger: 'blur'},
                  { min: 1, max: 50, message: '长度不超过50个字符', trigger: 'blur'},
                ],
        'postcode': [{ required: true, message: '邮编不能为空', trigger: 'blur' },
                      { pattern: /^[\d]{4}|[\d]{6}]+$/, message: '邮编为4-6位数字', trigger: 'blur' }
                    ],
        'email_address': [
                    { pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, message: '邮件地址格式不正确', trigger: 'blur' }],
        'phone_number': { pattern: /^1[345678]\d{9}$/, message: '手机号码或者座机号码格式错误', trigger: 'blur' },
        'address': [{ required: true, message: '地址名称不能为空', trigger: 'blur'},
                   { min: 4, max: 255, message: '地址长度应在4-225个字符之间', trigger: 'blur'},
                    { pattern: /^[^~!@#$%^&*]+$/, message: '地址不能包含非法字符', trigger: 'blur' }],
        'english_name':[
                 { pattern: /^[a-zA-Z]+$/, message: '英文名称应为英文字符', trigger: 'blur' }],
        'english_address':{ pattern: /^[a-zA-Z 0-9]+$/, message: '英文地址为英文字母、数字和空格', trigger: 'blur' },
        'is_fee_discount': { required: true, message: '费减状态备案不能为空', trigger: 'change' },
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

  	// submitForm () {
  	// 	return Object.assign({}, this.form, {customer_id: this.customerId});
    // },
    update(){
      this.$refs.table.update();
    },
    add(){
      if(this.form.name !='' && this.form.type !='' && this.form.identity !='' && this.form.postcode !='' && this.form.address !='' && this.form.is_fee_discount !=''){
          const url = `${URL}/${this.customer.id}/applicants`;
          const data = Object.assign({},this.form);
          const success = _=>{
            this.dialogVisible = false;
            this.update();
            this.$message({message: '添加成功！', type: 'success'})
          }
          this.$axiosPost({url, data, success});
      }else{
        this.$message({type: 'warning',message: '必选项不能为空！'});
      }
      
    },
    edit(){
      const url = `${URL}/${this.customer.id}/applicants/${this.presentId}`;
      const data = Object.assign({},this.form);
      const success = _=>{
        this.$refs.table.update();
        this.$message({message: '编辑成功！', type: 'success'})
      }
      this.$axiosPut({url, data, success});
    },
    cancel(){

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