<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :modal="false" class="dialog-small">
  	<el-form label-width="100px" ref="form" :model="form" :rules="rules">
  		
  		<el-form-item label="案件类型">
  			<static-select type="case_type" v-model="form.type"></static-select>
  		</el-form-item>
  		<el-form-item label="客户要求">
  			<el-input type="textarea" v-model="form.content" placeholder="请填写客户要求"></el-input>
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

export default {
  name: 'RequireListPop',
  mixins: [ PopMixins ],
  props: [ 'customerId' ],
  data () {
		return {
      form: {
        type: '',
        content: '',
      },
      rules: {
        type: { required: true, message: '案件类型不能为空', trigger: 'change' },
        content: { required: true, message: '客户要求不能为空', trigger: 'blur' },
      }
		}
  },
  methods: {
  	submitForm () {
  		return Object.assign({}, this.form, {customer_id: this.customerId});
  	}
  },
  components: { StaticSelect },
  URL: '/api/requirements',
  REMINDER_TEXT: '客户要求',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>