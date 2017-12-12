<template>
<div>
  <table-component :data="tableData" :tableOption="options" @refreshTableData="refreshTableData" ref="table">
  	<static-select type="project_type" v-model="category" style="width: 100px; margin-left: 5px;" slot="type"></static-select>
  </table-component>
  <el-dialog :visible.sync="dialogVisible" title="移入项目" :modal="false" @close="dialogClose">
  	<div style="margin-bottom: 5px;">移入<span style="color: red; font-size: 14px; font-weight: bold; padding: 0 5px;">{{ row.name }}</span></div>
    <remote-select type="project" v-model="project" multiple style="width: 100%; margin-bottom:10px;"></remote-select>
    <el-button @click="addP" type="primary" :loading="loading">{{ loading ? '移入中' : '确认移入' }}</el-button>
  </el-dialog>
</div>
</template>
<script>
import TableComponent from '@/components/common/TableComponent'
import StaticSelect from '@/components/form/StaticSelect'
import RemoteSelect from '@/components/form/RemoteSelect'

const URL = '/api/businesses'
export default {
	name: 'businessListProject',
	props: ['row'],
	data () {
		return {
			options: {
				name: 'businessListProject',
				url: URL,
				is_border: false,
				is_pagination: false,
				rowClick: _=>{this.$emit('rowClick', _)},
				header_btn: [
					{type: 'custom', label: '移出项目', click: this.removeP},
					{type: 'custom', label: '移入项目', click: this.addPop},
				],
				header_slot: ['type'],
				columns: [
					{type: 'selection'},
					{
						type: 'text',
						label: '案号',
						prop: 'serial',
					},
					{
						type: 'text',
						label: '案件名称',
						prop: 'title',
					},
					{
						type: 'text',
						label: '案件类型',
						prop: 'category',
					}
				]
			},
			tableData: [],
			category: '',
			dialogVisible: false,
			projectVisible: false,
			loading: false,
			project: [],
		};
	},
	computed: {
		customerId () {
			if(this.row) {
				return this.row.id;
			}else {
				return '';
			}
		}
	},
	methods: {
		refreshTableData (option) {
			this.$axiosGet({
				url: `${URL}/${this.customerId}`,
				data: {
					keyword: option['keyword'],
					category: this.category,
				},
				success: _=>{
					this.tableData = _.detail;
				},
			})
		},
		refresh () {
			this.$refs.table.refresh();
		},
		dialogClose () {
			this.project = [];
		},
		addPop () {
			this.dialogVisible = true;
		},
		addP () {
			this.$axiosPost({
				url: '/api/businessin',
				data: {
					id: this.project,
					business: this.row.id,
				},
				success: _=>{
					this.$message({message: _.info, type: 'success'});
					this.dialogVisible = false;
					this.refresh();
				}
			})
		},
		removeP () {
			
			let arr = this.$refs.table.getSelect();
			if( !arr ) return;

			arr = this.$tool.splitObj(arr, 'id');
			this.$axiosPost({
				url: '/api/businessout',
				data: { id: arr },
				success: _=>{
					this.$message({message: _.info, type: 'success'});
					this.refresh();
				}
			})
		}
	},
	watch: {
		category () {
			this.refresh();
		}
	},
	components: {
		TableComponent,
		StaticSelect,
		RemoteSelect,
	}
}
</script>