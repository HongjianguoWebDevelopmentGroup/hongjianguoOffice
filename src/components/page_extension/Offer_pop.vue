<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" class="dialog-small" @close="clear">
  	<el-form label-width="100px" ref="form" :model="form" :rules="rules" >
  		
  		<el-form-item label="服务名称" prop="name">
  			<el-input v-model="form.name" placeholder="请输入服务名称"></el-input>
  		</el-form-item>

			<el-form-item label="地区" prop="area">
				<static-select v-model="form.area" type="area"></static-select>
			</el-form-item>

			<el-form-item label="默认报价" prop="price">
				<el-input-number :controls="false" v-model="form.price" style="width: 100%;"></el-input-number>
			</el-form-item>

			<el-form-item style="margin-bottom: 0;">
        <el-button type="primary" size="small" @click="save" :loading="btn_disabled">{{ btn_disabled ? '保存中...' : '保存' }}</el-button>
        <el-button type="danger" size="small" @click="dialogVisible = false" :disabled="btn_disabled">取消</el-button>
			</el-form-item>

  	</el-form>
  </el-dialog>
</template>

<script>
import PopMixins from '@/mixins/pop-mixins'
import StaticSelect from '@/components/form/StaticSelect'
export default {
  name: 'offerPop',
  mixins: [ PopMixins ],
  data () {
		return {
      form: {
      	name: '',
      	area: '',
      	price: '',
      },
      rules: {
        'name': { required: true, message: '服务名称不能为空', trigger: 'blur' },
        'area': { required: true, message: '地区不能为空', trigger: 'change' },
        'price': { type: 'number', required: true, message: '报价不能为空', trigger: 'blur' },
      }
		}
  },
  methods: {
    save () {
      if(this.type == 'add') {
        this.add();
      }

      if(this.type == 'edit') {
        this.edit();
      }
    }
  },
  components: {
  	StaticSelect,
  },
  URL: '/api/offers',
  REMINDER_TEXT: '服务',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>