<template>
	<el-form label="100px" label-width="100px">
		<el-form-item label="项目名称">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="项目描述">
			<el-input type="textarea" v-model="form.description"></el-input>
		</el-form-item>
		<el-form-item label="项目客户">
			<span>{{ form.customer }}</span>
		</el-form-item>
		<el-form-item label="创建时间">
			<span>{{ form.create_time }}</span>
		</el-form-item>
		<el-form-item label="创建用户">
			<span>{{ form.member }}</span>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="edit">编辑</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
const URL = '/api/businesses'
export default {
	name: 'businessListInfo',
	props: ['row'],
	data () {
		return {
			form: {
				name: '',
				description: '',
				create_time: '',
				member: '',
				customer: '',
			},
		}
	},
	methods: {
		refresh () {
			this.$tool.coverObj(this.form, this.row, {
				obj: {
					key: 'name',
					arr: ['member', 'customer'],
				}
			})
		},
		edit () {
			const copy = this.$tool.shallowCopy(this.form, {skip: ['create_time', 'member', 'customer']});
			this.$axiosPut({
				url: `${URL}/${this.row.id}`,
				data: copy,
				success: _=>{
					this.$message({message: _.info, type: 'success'})
					this.$emit('refresh')
				}
			})
		}
	}
}
</script>