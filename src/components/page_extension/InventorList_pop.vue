<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" class="dialog-medium">
  	<el-form label-width="100px" ref="form" :model="form" :rules="rules">
  		
      <el-row>
        <el-col :span="12">
      		<el-form-item label="发明人姓名" prop="name">
      			<el-input v-model='form.name' placeholder='请输入发明人姓名'></el-input>
      		</el-form-item>
        </el-col>
        <el-col :span="12">
    			 <el-form-item label="英文名" prop="en_name">
            <el-input v-model="form.en_name" placeholder="请输入英文名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="发明人国籍" prop="area">
            <static-select type="area" v-model="form.area"></static-select>
          </el-form-item>  
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件号码" prop="identity">
            <el-input v-model="form.identity" placeholder="请输入证件号码"></el-input>
          </el-form-item> 
        </el-col>
      </el-row>

  		<el-row>
        <el-col :span="12">
          <el-form-item label="关联客户" prop="customer">
            <remote-select type="customer" v-model="form.customer"></remote-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="不公开姓名" prop="not_disclose_name">
            <app-switch v-model="form.not_disclose_name" type="is"></app-switch>
          </el-form-item>
        </el-col>
      </el-row>
      
			<el-row>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>  
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input> 
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="QQ" prop="qq">
            <el-input v-model="form.qq" placeholder="请输入QQ"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信号" prop="weixin">
            <el-input v-model="form.weixin" placeholder="请输入微信"></el-input> 
          </el-form-item>
        </el-col>
      </el-row>
      
			

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
import RemoteSelect from '@/components/form/RemoteSelect'
import AppSwitch from '@/components/form/AppSwitch'

export default {
  name: 'inventorListPop',
  mixins: [ PopMixins ],
  data () {
		return {
      form: {
        name: '',
        en_name: '',
        identity: '',
        customer: '',
        area: '',
        mobile: '',
        email: '',
        qq: '',
        weixin: '',
        not_disclose_name: 0,
      },
      rules: {
        name: { required: true, message: '发明人姓名不能为空', trigger: 'blur' },
        area: { required: true, message: '发明人国籍不能为空', trigger: 'change' },
        customer: { type: 'number', required: true, message: '关联客户不能为空', trigger: 'change' },
      }
		}
  },
  components: { 
    RemoteSelect,
    StaticSelect,
    AppSwitch,
  },
  URL: '/api/inventors',
  REMINDER_TEXT: '发明人',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>