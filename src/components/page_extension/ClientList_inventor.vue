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
                is_search: true,
				header_btn: [
					{ type: 'add', click: this.addPop }, 
				],
				columns: [
					{ type: 'selection' },
					{ 
						type: 'text', 
						prop: 'type', 
						label: '发明人姓名',
						render_text: _=>this.caseMap.get(Number.parseInt(_)),
					},
					{ type: 'text', prop: 'province', label: '国籍' },
					{ type: 'text', prop: 'city', label: '证件号码' },
					{ type: 'text', prop: 'proposer_name', label: '电话', width: '160' },
					{ type: 'text', prop: 'proposer_type', label: '邮箱', width: '160' },
					{ type: 'text', prop: 'id_number', label: '英文姓名' },
					{ type: 'text', prop: 'location', label: '不公开姓名' },
					{ 
						type: 'action',
						width: '100',
						align: 'center',
						btns: [
							{ type: 'edit', click:  this.editPop },
							{ type: 'delete', click:  this.clientDelete }
						]
					
					},
				],
				is_pagination: false,
				is_border: false,			
			},
			tableData: [
				{
					id:0,
					name:'kdsaokd'
				}
			],
		};
	},
	computed: {
		...mapGetters([
			'caseMap',
		]),
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
		},
		editPop (row) {
			this.$refs.pop.show('edit', row);
		},
		clientDelete ({id}) {
			const url = `${URL}/${id}`;
			this.$confirm(
				'此操作将永久删除该信息, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(()=>{
				const success = _=>{ 
				this.update();
				this.$message({message: '删除成功', type: 'success'}) 
			};

				this.axiosDelete({url, success});
			}).catch(()=>{
			this.$message({
				type: 'info',
				message: '已取消删除！'
			})
			})
		},
	},
	components: {
		TableComponent,
		Pop,
	},
	
}
</script>