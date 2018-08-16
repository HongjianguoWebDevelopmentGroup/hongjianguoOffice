<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" class="dialog-small" @close="clear">
  	<el-form label-width="100px" ref="form" :model="form" :rules="rules">
  		
      		<el-form-item label="发明人姓名" prop="name">
      			<el-input v-model='form.name' placeholder='请输入发明人姓名'></el-input>
      		</el-form-item>
        
          <el-form-item label="关联客户" prop="client">
            <remote-select type="client" v-model="form.client" :disabled="type == 'edit'"></remote-select>
          </el-form-item>

    			 <el-form-item label="英文名" prop="en_name">
            <el-input v-model="form.en_name" placeholder="请输入英文名"></el-input>
          </el-form-item>

          <el-form-item label="发明人国籍" prop="area">
            <static-select type="area" v-model="form.area"></static-select>
          </el-form-item>  
        
          <el-form-item label="证件号码" prop="identity">
            <el-input v-model="form.identity" placeholder="请输入证件号码"></el-input>
          </el-form-item> 
	        
	        <el-form-item label="手机号" prop="phone_number">
            <el-input v-model="form.phone_number" placeholder="请输入手机号"></el-input> 
          </el-form-item>

          <el-form-item label="邮箱地址" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱地址"></el-input>  
          </el-form-item>
        
        
          
        
      
      
		
      
			

			<el-form-item style="margin-bottom: 0px;">
				<el-button type="primary" size="small" @click="save" :loading="btn_disabled">{{ btn_disabled ? '保存中' : '保存' }}</el-button>
				<el-button type="danger" size="small" @click="dialogVisible = false">取消</el-button>
			</el-form-item>

  	</el-form>
  </el-dialog>
</template>

<script>
import PopMixins from '@/mixins/pop-mixins'
import StaticSelect from '@/components/form/StaticSelect'
import RemoteSelect from '@/components/form/RemoteSelect'

export default {
  name: 'inventorListPop',
  mixins: [ PopMixins ],
  data () {
		return {
      form: {
        name: '',
        client: '',
        en_name: '',
        identity: '',
        area: '',
        phone_number: '',
        email: '',
      },
      rules: {
        name: { required: true, message: '发明人姓名不能为空', trigger: 'blur' },
        client: { type: 'number', required: true, message: '关联客户不能为空', trigger: 'change' },
      }
		}
  },
  methods: {
    save () {
      if(this.type == 'add') {
        this.add();
      }else if(this.type == 'edit') {
        this.edit();
      }
    }
  },
  components: { 
    RemoteSelect,
    StaticSelect,
  },
  URL: '/api/inventors',
  REMINDER_TEXT: '发明人',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>