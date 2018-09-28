<template>
	<div>
		<table-component :data="tableData" :tableOption="option" ref="table" @refreshTableData="refreshTableData"></table-component>
		<pop @refresh="refresh" ref="pop" :customer="customer" :presentId = currentId></pop>
	</div>
</template>
<script>
import TableComponent from '@/components/common/TableComponent'
import Pop from '@/components/page_extension/RequirementList_pop'
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
const URL = '/api/customers';
export default {
	name: 'requirementList',
	props: ['customer', 'itemData'],
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
						prop: 'citizenship', 
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
					{ type: 'text', prop: 'reduction', label: '费减备案' },
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
			currentId :{}
		};
	},
	// computed: {
	// 	...mapGetters([
	// 		'applicantData',
	// 		'caseMap',
	// 	]),	
	// },
	mounted(){
	},
	methods: {
		refreshTableData(option) {
  		const success = _=>{
				this.tableData = _.data;  
			}
  		this.$axiosGet({
  			url: `${URL}/${this.customer.id}/applicants`,
  			data: Object.assign({}, option),
  			success,
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
			this.currentId = row.id
		},
		update () {
			this.$refs.table.update();
		},
		clientDelete (row) {
			const url = `${URL}/${this.customer.id}/applicants/${row.id}`;
			this.$confirm(
				'此操作将永久删除该邮件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(()=>{
					const success = _=>{ 
					this.update();
					this.$message({message: '删除申请人成功！', type: 'success'}) 
				};

				this.$axiosDelete({url, success});
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
			this.tableData = this.itemData;
		}
	},
	components: {
		TableComponent,
		Pop,
	},
	
}
</script>