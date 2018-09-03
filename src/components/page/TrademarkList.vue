<template>
  <div class="main">
  	<strainer v-model="filter" @refresh="refresh"></strainer>
		<table-component :tableOption="tableOption" :data="tableData" ref="table" @refreshTableData="refreshTableData"></table-component>
		<common-detail
      :title="currentRow.title"
      :visible.sync="shrinkVisible" 
      type="trademark" 
      :id="currentRow.id"
      @editSuccess="refresh">
    </common-detail>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import AppDatePicker from '@/components/common/AppDatePicker'
import CommonDetail from '@/components/page_extension/Common_detail'
import Strainer from '@/components/page_extension/TrademarkList_strainer'

const URL = '/api/trademarks'
export default {
  name: 'trademarkList', 
  data () {
		return {
			dialogScreenVisible: false,
			tableOption: {
				'name': 'trademark',
				'url': URL,
				'is_filter' : true,
				'header_btn': [{
					'type': 'add',
					click: _=>{
						this.$router.push('/trademark/add');
					}
				},
				{
					'type': 'delete',
				},
				{
					'type': 'import',
				},
				{
					'type': 'export',
				},
				{
					'type': 'batch_upload',
				},
				{
					'type': 'control',
					'label': '字段'
				}],
				'import_type': 'trademark',
				'upload_type': 'trademark',
				'highlightCurrentRow': true, 
	      		'rowClick': this.handleRowClick,
				'height': 'default',
				'columns': [{
					'show': true,
					'type': 'selection'
				},
				{
					'show': true,//默认为true
					'type': 'text',
					'label': '案号',
					'prop': 'serial',
					'width': '198',
				},
				{
					type: 'text',
					label: '事务所案号',
					prop: 'agency_serial',
					width: '198',
					show: true 
				},
				{
					'show': true,
					'type': 'text',
					'label': '商标名称',
					'prop': 'title',
					'width': '168',
					'is_import': true,
				},
				{
					'show': true,
					'type': 'text',
					'label': '商标类型',
					'prop': 'type',
					'render_simple':'name',
					'width': '145',
					'is_import': true,
				},
				{
					'show': true,
					'type': 'text',
					'label': '商标图形',
					'prop': 'figure',
					'align': 'center',
					'header_align': 'left',
					render:(h,item)=>{
						return h('img',{
							attrs:{
								src:item.viewUrl,
								width: '150px',		
							},
							style:{
								marginTop:'5px',
							}
						})
					},
					'width': '200',
				},
			  	{
					'show': true,
					'type': 'text',
					'label': '地区',
					'prop': 'area',
					'is_import': true,
					'render_simple': 'name',
					'width': '145',
					'is_import': true,
			  },
			  {
					'show': true,
					'type': 'text',
					'label': '详细类别',
					'prop': 'detail',
					'is_import': true,
					'width': '260',
					'is_import': true,
			  },
			   {
					'show': true,
					'type': 'array',
					'label': '商标类别',
					'prop': 'categories',
					render:_=>_.map(_=>_.name),
					'is_import': true,
					'width': '260',
					'is_import': true,
			  },
			  {
					'show': true,
					'type': 'array',
					'label': '申请人',
					'prop': 'applicants',
					'is_import': true,
					'width': '260',
					render:_=>_.map(_=>_.name),
					'is_import': true,
			  },
			  {
					'show': true,
					'type': 'text',
					'label': '申请号',
					'prop': 'apn',
					'width': '240',
					'is_import': true,
			  },
			  {
					'show': true,
					'type': 'text',
					'label': '申请日',
					'prop': 'apd',
					'width': '168',
					'is_import': true,
			  },
			  {
					'show': true,
					'type': 'text',
					'label': '初审公告日',
					'prop': 'public_date',
					'width': '168',
					'is_import': true,
			  },
			  {
					'show': true,
					'type': 'text',
					'label': '初审公告期数',
					'prop': 'public_number',
					'width': '168',
					'is_import': true,
			  },
			  {
					'show': true,
					'type': 'text',
					'label': '核准注册日',
					'prop': 'issue_date',
					'width': '168',
					'is_import': true,
			  },
			  {
					'show': true,
					'type': 'text',
					'label': '核准公告期数',
					'prop' : 'issue_number',
					'width': '168',
					'is_import': true,
			  },  
			  {
					'show': true,
					'type': 'text',
					'label': '专用权期限',
					'prop': 'expiring_date',
					 'width' : '145',
					 'is_import': true,
			  },
			  {
					'show': true,
					'type': 'text',
					'label': '备注',
					'prop': 'remark',
					'width': '280',
					'is_import': true,
			  },] 
			},
			tableData: [],
			currentRow: '',
			shrinkVisible: false,
			filter: {},
		};
  },
  methods: {
  	refreshTableData(option) {
  		
  		const success = d=>{
  			if(option['format'] == 'excel') {
          window.location.href = d.trademarks.downloadUrl;
        }else {
          this.tableData = d.trademarks;  
        }
  		}
  		this.$axiosGet({
  			url: URL,
  			data: Object.assign({}, this.filter, option),
  			success,
  		})
  	},
  	refresh () {
  		this.$refs.table.refresh();
  	},
  	handleRowClick (row) {
  		this.currentRow = row;
  		if(!this.shrinkVisible) {
  			this.shrinkVisible = true;	
  		}
  	}
  },
  mounted () {
  	this.refresh();
  },
  components: { 
  	TableComponent, 
  	AppDatePicker,
  	CommonDetail,
  	Strainer,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>