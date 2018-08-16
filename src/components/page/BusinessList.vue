<!--项目管理-->
<template>
	<div class="main">
	<table-component :data="tableData" :tableOption="options" @refreshTableData="refreshTableData" ref="table"></table-component>
	
	<app-shrink title="项目详情" :visible.sync="shrinkVisible">
		<detail :row="currentRow" @refresh="update" @rowClick="projectClick"></detail>
	</app-shrink>

	<common-detail
    style="width: 916px;"
    :type="project.category ? categoeyMap[project.category] : ''" 
    :id="project.id" 
    :visible.sync="projectVisible" 
    :title="project.title"
    ref="detail">
  </common-detail>  
	
	</div>
</template>
<script>
import TableComponent from '@/components/common/TableComponent'
import AppShrink from '@/components/common/AppShrink'
import Detail from '@/components/page_extension/BusinessList_detail'
import CommonDetail from '@/components/page_extension/Common_detail'

const URL = '/api/businesses';
export default {
	name: 'businessList',
	data () {
		return {
			id: '',
			options: {
				name: 'businessList',
				url: URL,
				height: 'default2',
		  	highlightCurrentRow: true,
		  	rowClick: this.handleRowClick,
				header_btn: [
					{type: 'add', click: _=>{this.$router.push('/business/add')}},
					{type: 'delete'},
				],
				columns: [
					{type: 'selection'},
					{
						type: 'text',
						label: '项目名称',
						prop: 'name',
					},
					{
						type: 'text',
						label: '项目描述',
						prop: 'description',
					},
					{
						type: 'text',
						label: '项目客户',
						prop: 'customer',
						render_simple: 'name',
					},
					{
						type: 'text',
						label: '创建时间',
						prop: 'create_time',
					},
					{
						type: 'text',
						label: '创建用户',
						prop: 'member',
						render_simple: 'name',
					}
				]
			},
			currentRow: '',
			shrinkVisible: false,
			tableData: '',
			project: '',
			projectVisible: false,
			categoeyMap: {
				1: 'patent',
				2: 'trademark',
				3: 'copyright',
			}
		}
	},
	methods: {
		refreshTableData (option) {
			this.$axiosGet({
				url: URL,
				data: option,
				success: _=>{
					this.tableData = _.businesses;
				},
			})
		},
		handleRowClick (row) {
			this.currentRow = row;
			if(this.projectVisible) {
				this.projectVisible = false;
			}
			if( !this.shrinkVisible ) {
				this.shrinkVisible = true;
			}
			
		},
		projectClick (row) {
			this.project = row;
			if( !this.projectVisible ) {
				this.projectVisible = true;
			}
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
		AppShrink,
		Detail,
		CommonDetail,
	}
}
</script>