<template>
	<div class="main">
		<table-component :data="tableData" :tableOption="option" @refreshTableData="refreshTableData" ref="table">
			<static-select type="area" v-model="area" slot="area" style="width: 150px; margin-left: 5px;"></static-select>
		</table-component>
		<pop ref="pop" @refresh="popRefresh"></pop>
	</div>
</template>
<script>
const URL = '/api/offers'
import TableComponent from '@/components/common/TableComponent'
import Pop from '@/components/page_extension/Offer_pop'
import StaticSelect from '@/components/form/StaticSelect'
import {mapGetters} from 'vuex'
export default {
	name: 'offer',
	data () {
		return {
			option: {
				name: 'offerList',
				url: URL,
				height: 'default2',
				search_placeholder: '服务名称',
				rowClick: this.editPop,
				header_btn: [
					{ type: 'add', click: this.addPop },
					{ type: 'delete' },
				],
				header_slot: ['area'],
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
						render_text: _=>this.areaMap.get(_),
					},
					{
						type: 'text',
						label: '默认报价',
						prop: 'price',
						width: 150,
						sortable: true,
					}
				],
			},
			tableData: '',
			area: '',
		};
	},
	computed: {
		...mapGetters([
			'areaMap'
		])
	},
	methods: {
		refreshTableData (option) {
			this.$axiosGet({
				url: URL,
				data: Object.assign({}, {area: this.area}, option),
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
	watch: {
		area () {
			this.refresh();
		}
	},
	components: {
		TableComponent,
		Pop,
		StaticSelect,
	}
}
</script>