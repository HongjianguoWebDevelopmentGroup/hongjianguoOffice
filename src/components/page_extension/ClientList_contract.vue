<template>
	<div>
		<table-component :data="tableData" :tableOption="option" ref="table"></table-component>
		<pop @refresh="refresh" ref="pop" :customer="customer"></pop>
	</div>
</template>
<script>
import TableComponent from '@/components/common/TableComponent'
import Pop from '@/components/page_extension/RequirementList_pop'
import {mapGetters} from 'vuex'
const URL = '/api/requirements';
export default {
	name: 'requirementList',
	props: ['customer','itemData'],
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
                        label: '合同编号',
						render_text: _=>this.caseMap.get(Number.parseInt(_)),
					},
					{ type: 'text', prop: 'proposer_name', label: '合同类型' },
                    { type: 'text', prop: 'proposer_type', label: '联系人' },
                    { type: 'text', prop: 'proposer_name', label: '电话' },
                    { type: 'text', prop: 'proposer_type', label: '邮箱' },
                    { type: 'text', prop: 'proposer_name', label: '电话' },
					{ type: 'text', prop: 'proposer_type', label: '邮箱' },
					{ 
						type: 'action',
						width: '100',
						align: 'left',
						btns: [
							{ type: 'edit', click:  this.editPop },
							{ type: 'delete', click:  this.clientDelete }
						]
					
					},
				],
				is_pagination: false,
				is_border: false,			
			},
			tableData: [],
		};
	},
	computed: {
		...mapGetters([
			'caseMap',
		]),
	},
	methods: {
		addPop () {
			this.$refs.pop.show();
		},
		refresh () {
			this.$refs.table.refresh();
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
	watch:{
		itemData(){
			this.tableData.push(this.itemData);
		}
	},
	components: {
		TableComponent,
		Pop,
	},
	
}
</script>