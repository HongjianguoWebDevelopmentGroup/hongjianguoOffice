<template>
	<div>
		<table-component :data="inventorData" :tableOption="option" ref="table"></table-component>
		<pop @refresh="refresh" ref="pop" :customer="customer" :presentData = inventorData></pop>
	</div>
</template>
<script>
import TableComponent from '@/components/common/TableComponent'
import Pop from '@/components/page_extension/RequirementList_pop'
import {mapGetters} from 'vuex'
export default {
	name: 'clientlistInventor',
	props: ['customer','itemData'],
	data () {
		return {
			option: {
				name: 'clientlistInventor',
                url: URL,
                is_search: true,
				header_btn: [
					{ type: 'add', click: this.addPop }, 
				],
				columns: [
					{ type: 'selection' },
					{ 
						type: 'text', 
						prop: 'name', 
						label: '发明人姓名',
						// render_text: _=>this.caseMap.get(Number.parseInt(_)),
					},
					{ type: 'text', prop: 'citizenship', label: '国籍' },
					{ type: 'text', prop: 'identity', label: '证件号码' },
					{ type: 'text', prop: 'phone_number', label: '电话', width: '160' },
					{ type: 'text', prop: 'email_address', label: '邮箱', width: '160' },
					{ type: 'text', prop: 'id_number', label: '英文姓名' },
					{ type: 'text', prop: 'is_publish_name', label: '不公开姓名' },
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
			inventorData: [],
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
		editPop (row) {
			this.$refs.pop.show('edit', row);
		},
		clientDelete ({id}) {
			const url = `${URL}/${this.customer.id}/applicants/${this.itemData.id}`;
			this.$confirm(
				'此操作将永久删除该信息, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(()=>{
				const success = _=>{ 
				this.update();
				this.$message({message: '删除成功', type: 'success'}) 
				this.axiosDelete({url, success});
			};

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
			this.inventorData = this.itemData;
		}
	},
	components: {
		TableComponent,
		Pop,
	},
	
}
</script>