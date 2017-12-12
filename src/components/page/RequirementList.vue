<template>
	<div>
		<table-component :data="tableData" :tableOption="option" ref="table" @refreshTableData="refreshTableData"></table-component>
		<pop @refresh="refresh" ref="pop" :customer-id="customerId"></pop>
	</div>
</template>
<script>
import TableComponent from '@/components/common/TableComponent'
import Pop from '@/components/page_extension/RequirementList_pop'
import {mapGetters} from 'vuex'
const URL = '/api/requirements';
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
					{ 
						type: 'text', 
						prop: 'type', 
						label: '案件类型',
						render_text: _=>this.caseMap.get(Number.parseInt(_)),
					},
					{ type: 'text', prop: 'create_time', label: '备注日期' },
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
	computed: {
		...mapGetters([
			'caseMap',
		])
	},
	methods: {
		refreshTableData () {
			this.$axiosGet({
				url: URL,
				data: {
					'customer_id': this.customerId,
				},
				success:  _=>{
					this.tableData = _.requirements;
				}
			})
		},
		addPop () {
			this.$refs.pop.show();
		},
		refresh () {
			this.$refs.table.refresh();
		}
	},
	components: {
		TableComponent,
		Pop,
	},
	
}
</script>