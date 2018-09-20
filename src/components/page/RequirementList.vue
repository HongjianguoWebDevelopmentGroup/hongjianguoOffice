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
const URL = '/api/applicantlist';
export default {
	name: 'requirementList',
	props: ['customer'],
	data () {
		return {
			option: {
				name: 'requirementList',
				url: URL,
				header_btn: [
					{ type: 'add', click: this.addPop }, 
				],
				columns: [
					{ type: 'selection' },
					{ 
						type: 'text', 
						prop: 'residence', 
						label: '国家',
						// render_text: _=>this.caseMap.get(Number.parseInt(_)),
					},
					{ type: 'text', prop: 'province', label: '省份' },
					{ type: 'text', prop: 'city', label: '城市' },
					{ type: 'text', prop: 'name', label: '申请人名称', width: '160' },
					{ type: 'text', prop: 'customer_type', label: '申请人类型', width: '160' },
					{ type: 'text', prop: 'identity', label: '证件号码' },
					{ type: 'text', prop: 'address', label: '地址' },
					{ type: 'text', prop: 'postcode', label: '邮编' },
					{ type: 'text', prop: 'english_name', label: '英文名称' },
					{ type: 'text', prop: 'english_address', label: '英文地址' },
					{ type: 'text', prop: 'reduction ', label: '费减备案' },
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
				is_search: false,			
			},
			tableData: [],
		};
	},
	computed: {
		...mapGetters([
			'caseMap',
		]),
	},
	created(){
		const url = `${URL}/${this.customer.id}`;
			// const data = Object.assign({},option);
			const success = _=>{
				this.tableData = _.data.data;
			}
			// this.$axiosGet({url, data, success});
			this.$axiosGet({
				url: url,
				data: Object.assign({}, this.option),
				success,
			})
	},
	methods: {
		addPop () {
			this.$refs.pop.show();
		},
		refresh () {
			this.$refs.table.refresh();
		},
		editPop (row) {
			this.$refs.pop.show('edit', row);
		},
		clientDelete () {
			const url = `${URL}/${this.customer.id}`;
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