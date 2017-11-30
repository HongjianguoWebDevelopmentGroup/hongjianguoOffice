<template>
	<div class="clientList">
		<table-component :tableOption="tableOption" :data="tabelData" ref="table" @refreshTableData="refreshTableData"></table-component>
		<contract-pop ref="ContractPop" :popType="popType" @refresh="refresh"></contract-pop>
	</div>
</template>
<script>
import TableComponent from '@/components/common/TableComponent'
import ContractPop from '@/components/page_extension/Contract_pop'
// import AxiosMixins from '@/minxins/axios-mixins'

// const URL = '/api/contracts';
export default {
  name: 'contractList',
  // mixins: [ AxiosMixins ],
  data () {
	return {
	  popType: '',	
	  tableOption: {
	  	'name': 'contractList',
	  	// 'url': URL,
	  	'height': 'default',
	  	'highlightCurrentRow': true,
	  	'rowClick': this.handleRowClick,
	  	'header_btn': [
	  	   { type: 'add', click: this.addPop},
	  	   { type: 'delete'},
	  	   { type: 'control', label: '字段'},
	  	],
	  	'columns': [
	  	  { type: 'selection' },
	  	  { type: 'text', label: '合同编号', prop: 'number', sortable: true, width: '200'},
	  	  { type: 'text', label: '相关客户', prop: 'customer', render_simple: 'name', sortable: true, width: '178'},
	  	  { type: 'text', label: '分所', prop: 'agency', render_simple: 'name',  sortable: true, width: '178'},
	  	  { type: 'text', label: '上传用户', prop: 'up_member', sortable: true, width: '198'},
	  	  { type: 'text', label: '签订日期', prop: 'date', sortable: true, width: '178'},
	  	  { type: 'text', label: '上传日期', prop: 'up_date', sortable: true, width: '178'},  
	  	  { type: 'text', label: '状态', prop: 'status', sortable: true, width: '178'},
	  	  { type: 'text', label: '扫描文件', prop: 'file', sortable: true, width: '150'},
	  	  { type: 'text', label: '备注', prop: 'remark', sortable: true, width: '200'},
	  	  { 
	  	  	type: 'action',
	  	  	label: '操作',
	  	  	width: '200',
	  	  	btns: [
	  	  	 { type: 'edit', click: this.editPop },
	  	  	 { type: 'delete', click: this.deleteSingle},
	  	  	]	
	  	  }
	  	],
	  },
	  tabelData: [
	  	{
	  		id: 1,
	  		number: "45646848",
	  		customer: {id: '1',name:'kevin'},
	  		agency: {id:'1',name:'红坚果'},
	  		up_member: "文浩",
	  		date: "2017/11/30",
	  		up_date: "2017/11/30",
	  		status: "待签订",
	  		file: {},
	  		remark: "测试合同"	
	  	},
	  	{
	  		id: 2,
	  		number: "123456",
	  		customer: {id: '1',name:'kevin'},
	  		agency: {id:'1',name:'红坚果'},
	  		up_member: "文浩",
	  		date: "2017/11/30",
	  		up_date: "2017/11/30",
	  		status: "已签订",
	  		file: {},
	  		remark: "测试合同"	
	  	}
	  ],
	  currentRow: '',
	  shrinkVisible: false,
	  filter: {},
	}	
  },
  computed: {},
  methods: {
  	refreshTableData(option) {
  		
  		const success = d=>{
  			if(option['format'] == 'excel') {
          window.location.href = d.client.downloadUrl;
        }else {
          this.tableData = d.client;  
        }
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
  		console.log(row);
  		this.$refs.ContractPop.show('edit',row);
  	},
   	deleteSingle ({id}) {
  		this.$confirm('删除后不可恢复，确认删除当前合同信息？', '提示', {type: 'warning'})
  			.then(_=>{
  				const url = `${URL}/${id}`;
  				const success = _=>{
  					this.$message({message: '删除成功', type: 'success' });
  					this.update();
  				}

  				this.axiosDelete({url, success});
  			})
  			.catch(_=>{})
  	}, 	
  	handleRowClick (row) {
  		this.currentRow = row;
  		if(!this.shrinkVisible) {
  			this.shrinkVisible = true;	
  		}
  	},
  	refresh () {
  		this.$refs.table.refresh();
  	},
  	update () {
  		this.$refs.table.update();
  	},
  },
  components:{
	TableComponent,
	ContractPop
  }
}
</script>
<style scoped lang="scss"></style>