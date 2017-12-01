<template>
	<div>
		<table-component :data="tableData" :tableOption="option" ref="table" @refreshTableData="refreshTableData"></table-component>
	</div>
</template>
<script>
import TableComponent from '@/components/common/TableComponent'
const URL = '/api/reuirements';
export default {
	name: 'requirementList',
	props: ['customerId'],
	data () {
		return {
			option: {
				name: 'requirementList',
				url: URL,
				header_btn: [
					{ type: 'add', click: this.addPop },
					{ type: 'delete' },  
				],
				columns: [
					{ type: 'selection' },
					{ type: 'text', prop: 'type', label: '案件类型' },
					{ type: 'text', prop: 'date', label: '备注日期' },
					{ type: 'text', prop: 'member', label: '备注用户' },
					{ type: 'text', prop: 'content', label: '备注内容' },
				],
				is_pagination: false,
				is_border: false,
				is_search: false,			
			},
			tableData: [],
		};
	},
	methods: {
		refreshTableData () {
			this.$axiosGet({
				url: URL,
				data: {
					'customer_id': this.customerId,
				},
				success (_) {
					console.log(_);
				}
			})
		},
		addPop () {

		},
		refresh () {
			this.$refs.table.refresh();
		}
	},
	components: {
		TableComponent
	},
	
}
</script>