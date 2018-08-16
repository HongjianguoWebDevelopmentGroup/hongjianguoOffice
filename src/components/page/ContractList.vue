<template>
	<div class="clientList">
		<table-component :tableOption="tableOption" :data="tableData" ref="table" @refreshTableData="refreshTableData"></table-component>
		<contract-pop ref="ContractPop" :popType="popType" @refresh="handlePop"></contract-pop>
	</div>
</template>
<script>
import TableComponent from '@/components/common/TableComponent'
import ContractPop from '@/components/page_extension/ContractList_pop'

const URL = '/api/contracts';
export default {
  name: 'contractList',
  data () {
		return {
		  popType: '',	
		  tableOption: {
		  	'name': 'contractList',
		  	'url': URL,
		  	'height': 'default2',
		  	'search_placeholder': '编号、客户、部门、上传用户',
		  	'rowClick': this.editPop,
		  	'header_btn': [
		  	   { type: 'add', click: this.addPop},
		  	   { type: 'delete'},
		  	   { type: 'control', label: '字段'},
		  	],
		  	'columns': [
		  	  { type: 'selection' },
		  	  { 
		  	  	type: 'text', 
		  	  	label: '合同编号', 
		  	  	prop: 'number', 
		  	  	width: '200'
		  	  },
		  	  { 
		  	  	type: 'text', 
		  	  	label: '相关客户', 
		  	  	prop: 'client', 
		  	  	render_simple: 'name', 
		  	  	width: '178'
		  	  },
		  	  { 
		  	  	type: 'text', 
		  	  	label: '部门', 
		  	  	prop: 'branch', 
		  	  	render_simple: 'name',  
		  	  	width: '178',
		  	  },
		  	  { 
		  	  	type: 'text', 
		  	  	label: '上传用户', 
		  	  	prop: 'member', 
		  	  	render_simple: 'name', 
		  	  	width: '198',
		  	  },
		  	  { 
		  	  	type: 'text', 
		  	  	label: '签订日期', 
		  	  	prop: 'date',  
		  	  	width: '178',
		  	  },
		  	  { 
		  	  	type: 'text', 
		  	  	label: '上传日期', 
		  	  	prop: 'update_time', 
		  	  	width: '178'
		  	  },  
		  	  { 
		  	  	type: 'text', 
		  	  	label: '状态', 
		  	  	prop: 'status', 
		  	  	width: '178',
		  	  	render_text (item) {
		  	  		return item ? '有效' : '无效';
		  	  	}
		  	  },
		  	  { 
		  	  	type: 'text', 
		  	  	label: '扫描文件', 
		  	  	prop: 'file',
		  	  	width: '200',
		  	  	render (h, item) {
		  	  		return h('a',{
		  	  			attrs: {
		  	  				href: item.downloadUrl
		  	  			}
		  	  		}, item.name);
		  	  	},
		  	  },
		  	  { 
		  	  	type: 'text', 
		  	  	label: '备注', 
		  	  	prop: 'remark',
		  	  	width: '200'
		  	  }
		  	],
		  },
		  tableData: '',
		}
  },
  methods: {
  	refreshTableData(option) {
  		
  		const success = d=>{
        this.tableData = d.contracts;          
  		}
  		this.$axiosGet({
  			url: URL,
  			data: Object.assign({}, this.filter, option),
  			success,
  		})
  	},
  	addPop () {
  		this.popType = "add";
  		this.$refs.ContractPop.show('add');
  	},
  	editPop (row) {
  		this.popType = "edit";
  		this.$refs.ContractPop.show('edit',row);
  	},
  	handlePop (t) {
  		t == 'add' ? this.refresh() : this.update();
  	},
  	refresh () {
  		this.$refs.table.refresh();
  	},
  	update () {
  		this.$refs.table.update();
  	},
  },
  mounted () {
  	this.refresh();
  },
  components:{
		TableComponent,
		ContractPop,
  }
}
</script>
<style scoped lang="scss"></style>