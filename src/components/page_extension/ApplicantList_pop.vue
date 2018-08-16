<template>
	<el-dialog :title="title" :visible.sync="dialogVisible" class="dialog-medium">
		<el-form label-width="130px" :model="form" :rules="rules" ref="form">
			<el-row>
				<el-col :span="12">
					<el-form-item label="申请人姓名" prop="name">
						<el-input v-model="form.name"  placeholder="请填写申请人姓名"></el-input>
					</el-form-item>	
				</el-col>
				<el-col :span="12">
					<el-form-item label="关联客户" prop="client">
						<remote-select type="client" v-model="form.client" :disabled="type == 'edit'"></remote-select>
					</el-form-item>					
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="12">
					<el-form-item prop="type" label="申请人类型">
						<static-select type="applicant_type" v-model="form.type"></static-select>		
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="申请人地区" prop="area">
						<static-select type="area" v-model="form.area"></static-select>
					</el-form-item>		
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="12">
					<el-form-item label="申请人城市" prop="province_city">
						<city v-model="form.province_city"></city>
					</el-form-item>		
				</el-col>
				<el-col :span="12">
					<el-form-item label="费用备案" prop="fee_discount">
						<el-select v-model="form.fee_discount" placeholder="请选择费用备案">
							<el-option 
								v-for="item in option.fee_discount"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
					</el-form-item>	
					
				</el-col>
			</el-row>

			<el-form-item label="证件号码" prop="identity">
				<el-input v-model="form.identity" placeholder="请填写证件号码"></el-input>
			</el-form-item>

			<el-form-item label="详细地址" prop="address">
				<el-input type="textarea" v-model="form.address" placeholder="请输入详细地址"></el-input>
			</el-form-item>	

			<el-form-item style="margin-bottom: 0;">
				<el-button type="primary" :loading="btn_disabled" @click="save" size="small">{{ btn_disabled ? '保存中...' : '保存' }}</el-button>
				<el-button type="danger" @click="dialogVisible = false" size="small">取消</el-button>
			</el-form-item>


		</el-form>
	</el-dialog>
</template>

<script>
import PopMixins from '@/mixins/pop-mixins'
import City from '@/components/form/City'
import RemoteSelect from '@/components/form/RemoteSelect'
import StaticSelect from '@/components/form/StaticSelect'

export default {
  name: 'applicantListPop',
  mixins: [ PopMixins ],
  data () {
		return {
		  form: {
		  	type: '',
		  	client: '',
		  	name: '',
		  	identity: '',
		  	area: '',
		  	address: '',
		  	fee_discount: '',
		  	province_city: [],
		  },
		  option: {
		  	fee_discount: [
		  		{ label: '未完成', value: 0 },
		  		{ label: '已完成', value: 1 },
		  	],
		  },
		  rules: {},
		}
  },
  methods: {
  	setForm (data) {
  		for(let k in this.form) {
  			const d = data[k];
  			if(k == 'province_city') {
  				let arr = [];
  				arr[0] = data['province'];
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
  	}
  },
  URL: '/api/applicants',
  REMINDER_TEXT: '申请人',
  components: { 
  	StaticSelect,
  	RemoteSelect, 
  	City,
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>