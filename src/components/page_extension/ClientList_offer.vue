<template>
<div>
	<el-table :data="tableData">
		<el-table-column prop="name" label="服务名称"></el-table-column>
		<el-table-column prop="area" label="地区"></el-table-column>
		<el-table-column prop="price" label="报价"></el-table-column>
		<el-table-column label="操作">
			<template slot-scope="scope">
				<el-button type="text" @click="editPop(scope.row)">编辑报价</el-button>
			</template>
		</el-table-column>
	</el-table>
	<el-dialog title="编辑报价" :visible.sync="dialogVisible" class="dialog-small" :modal="false">
		<div style="margin-bottom: 5px;">修改<span style="color: red; font-size: 14px; font-weight: bold; padding: 0 5px;">{{ name }}</span>报价为</div>
    <el-input-number :controls="false" v-model="price" style="width: 100%; margin-bottom:10px;"></el-input-number>
    <el-button @click="edit" type="primary" :loading="loading">{{ loading ? '修改中' : '确认修改' }}</el-button>
	</el-dialog>
</div>
</template>

<script>
const URL = '/api/offers' 
export default {
	name: 'clientListOffer',
	props: [ 'customerId' ],
	data () {
		return {
			tableData: [],
			id: '',
			name: '',
			price: '',
			loading: false,
			dialogVisible: false,
		}
	},
	methods: {
		refresh () {
			this.$axiosGet({
				url: URL,
				data: {
					customer_id: this.customerId,
				},
				success: _=>{
					this.tableData = _.offers;
				},
			})
		},
		editPop (row) {
			this.id = row.id;
			this.name = row.name;
			this.price = row.price;
			this.dialogVisible = true;
		},
		edit () {
			this.loading = true;
			this.$axiosPut({
				url: `${URL}/${this.id}`,
				data: {
					customer_id: this.customerId,
					price: this.price,
				},
				success: _=>{
					this.refresh();
					this.dialogVisible = false;
				},
				complete: _=>{
					this.loading = false;
				}
			})
		},
	}
}
</script>