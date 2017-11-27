<template>
	<div class="edit-password">
		<el-button v-if="!editPsd" type="text" @click="editPsd = true">点击设置</el-button>
		<template v-if="editPsd">
			<el-input type="password" v-model="psd" placeholder="请输入密码..."></el-input>
			<el-button type="text" @click="clearEditPsd">取消</el-button>
		</template>
	</div>
</template>

<script>
export default {
	name: 'EditPassWord',
	props: ['value'],
	data () {
		return {
			psd: '',
			psd_again: '',
			editPsd: false,
		}
	},
	methods: {
		clearEditPsd () {
			this.editPsd = false; 
  		this.psd = '';
		},
		check () {

			const psd = this.psd;
  		const psd_ag = this.psd_again;

  		let message = "";
  		let flag = false;

  		if( !this.editPsd ) {
  			message = "";
  		}else if(psd == "" ) {
  			message = "请填写密码";
  		}

  		if(message) {
  			this.$message({message, type: 'warning'});
  			flag = true;
  		}

  		return flag;
		}
	},
	watch: {
		psd (val) {
			this.$emit('input', val);
		}
	}
}
</script>