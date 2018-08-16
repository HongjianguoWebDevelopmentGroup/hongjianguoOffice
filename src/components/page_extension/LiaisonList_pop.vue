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
    			<el-form-item label="关联客户" prop="customer">
            <remote-select type="customer" v-model="form.customer"></remote-select>
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
import RemoteSelect from '@/components/form/RemoteSelect'

export default {
  name: 'inventorListPop',
  mixins: [ PopMixins ],
  data () {
		return {
      form: {
        name: '',
        customer: '',
        area: '',
        mobile: '',
        email: '',
        qq: '',
        weixin: '',
      },
      rules: {
        name: { required: true, message: '接口人姓名不能为空', trigger: 'blur' },
        customer: { type: 'number', required: true, message: '关联客户不能为空', trigger: 'change' },
      }
		}
  },
  components: { 
    RemoteSelect,
  },
  URL: '/api/liaisons',
  REMINDER_TEXT: '接口人',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>