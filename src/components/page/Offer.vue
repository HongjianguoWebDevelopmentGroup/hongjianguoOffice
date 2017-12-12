<template>
	<div class="main">
		<table-component :data="tableData" :tableOption="option" @refreshTableData="refreshTableData" ref="table"></table-component>
		<pop ref="pop" @refresh="popRefresh"></pop>
	</div>
</template>
<script>
const URL = '/api/offers'
import TableComponent from '@/components/common/TableComponent'
import Pop from '@/components/page_extension/Offer_pop'
export default {
	name: 'offer',
	data () {
		return {
			option: {
				name: 'offerList',
				url: URL,
				height: 'default2',
				search_placeholder: '服务名称',
				header_btn: [
					{ type: 'add', click: this.addPop },
					{ type: 'delete' },
				],
				columns: [
					{ type: 'selection' },
					{ 
						type: 'text',
						label: '服务名称',
						prop: 'name',
						min_width: 200,
					},
					{
						type: 'text',
						label: '地区',
						prop: 'area',
						width: 100,
					},
					{
						type: 'text',
						label: '默认报价',
						prop: 'price',
						width: 150,
					},
					{
						type: 'action',
						width: 100,
						btns: [
							{ type: 'edit', click: this.editPop },
						],
					}
				],
			},
			tableData: '',
		};
	},
	methods: {
		refreshTableData (option) {
			this.$axiosGet({
				url: URL,
				data: option,
				success: _=>{
					this.tableData = _.offers;
				}
			});
		},
		addPop () {
			this.$refs.pop.show();
		},
		editPop (row) {
			this.$refs.pop.show('edit', row);
		},
		popRefresh (type) {
			type == 'add' ? this.refresh() : this.update();
		},
		refresh () {
			this.$refs.table.refresh();
		},
		update () {
			this.$refs.table.update();
		}
	},
	mounted () {
		this.refresh();
	},
	components: {
		TableComponent,
		Pop,
	}
}
</script>