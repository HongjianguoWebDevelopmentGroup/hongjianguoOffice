<template>
	<table-compoent></table-compoent>
	<el-dialog title="修改报价" :visible.sync="dialogVisible" class="dialog-mini">
		<el-form>
			<el-form-item label="报价">
				<el-input></el-input>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>
<script>
const URL = '/api/offers';
import TableComponent from '@/components/common/TableComponent'
export default {
	name: 'offerC',
	data () {
		return {
			dialogVisible: false,
		};
	},
	components: {
		TableComponent,
	},
}
</script>