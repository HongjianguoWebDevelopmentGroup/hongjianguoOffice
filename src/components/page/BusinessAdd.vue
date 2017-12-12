<template>
	<div class="main">
		<el-form :model="form" ref="form" label-width="100px">
			<el-form-item label="项目名称">
				<el-input v-model="form.name" placeholder="请填写项目名称"></el-input>
			</el-form-item>
			<el-form-item label="项目客户">
				<remote-select v-model="form.customer" type="customer"></remote-select>
			</el-form-item>
			<el-form-item label="项目描述">
				<el-input v-model="form.description" placeholder="请填写项目描述" type="textarea"></el-input>
			</el-form-item>
			<el-form-item label="相关专利">
				<add-patent v-model="form.patent"></add-patent>
			</el-form-item>
			<el-form-item label="相关版权">
				<add-copyright v-model="form.copyright"></add-copyright>
			</el-form-item>
			<el-form-item label="相关商标">
				<add-trademark v-model="form.trademark"></add-trademark>
			</el-form-item>
			<el-form-item style="margin-bottom: 0px;">
				<el-button @click="add" type="primary" :loading="loading">{{ loading ? '请稍候' : '新建项目' }}</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
import RemoteSelect from '@/components/form/RemoteSelect'
import AddPatent from '@/components/form/AddPatent'
import AddCopyright from '@/components/form/AddCopyright'
import AddTrademark from '@/components/form/AddTrademark'
const URL = '/api/businesses'

export default {
	name: 'businessAdd',
	data () {
		return {
			form: {
				name: '',
				customer: '',
				description: '',
				patent: [],
				copyright: [],
				trademark: [],
			},
			loading: false,
		};
	},
	methods: {
		add () {
			this.loading = true;
			const success = _=>{
				this.$message({message: _.info, type: 'success'});
				this.$router.push('/business/list');
			}
			const complete = _=>{
				this.loading = false;
			}
			this.$axiosPost({
				url: URL,
				data: this.form,
				success,
				complete,
			})
		}
	},
	components: {
		RemoteSelect,
		AddPatent,
		AddCopyright,
		AddTrademark,
	}
}
</script>