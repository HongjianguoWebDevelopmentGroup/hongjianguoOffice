<template>
	<div class="clientList">
		<table-component :tableOption="tableOption" :data="tabelData" ref="table" @refreshTableData="refreshTableData"></table-component>
		<client-pop ref="ClientPop" :popType="popType" @refresh="refresh"></client-pop>
	</div>
</template>
<script>
import TableComponent from '@/components/common/TableComponent'
import ClientPop from '@/components/page_extension/Client_pop'
// import AxiosMixins from '@/minxins/axios-mixins'

// const URL = '/api/customers';
export default {
  name: 'clientList',
  // mixins: [ AxiosMixins ],
  data () {
	return {
	  popType: '',	
	  tableOption: {
	  	'name': 'clientList',
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
	  	  { type: 'text', label: '地区', prop: 'area', sortable: true, width: '200'},
	  	  { type: 'text', label: '客户名称', prop: 'name', sortable: true, width: '178'},
	  	  { type: 'text', label: '英文名称', prop: 'en_name', sortable: true, width: '178'},
	  	  { type: 'text', label: '省份', prop: 'province', sortable: true, width: '198'},
	  	  { type: 'text', label: '城市', prop: 'city', sortable: true, width: '198'},
	  	  { type: 'text', label: '联系人', prop: 'contact', sortable: true, width: '178'},
	  	  { type: 'text', label: '电子邮箱', prop: 'email', sortable: true, width: '220'},
	  	  { type: 'text', label: '案件数', prop: 'project_count', sortable: true, width: '160'},
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
	  		area: "CN",
	  		name: "文浩",
	  		en_name: "kevin",
	  		province: "广东省",
	  		city: "深圳市",
	  		contact: "kevin",
	  		email: "963170847@qq.com",
	  		project_count: "1542"	
	  	},
	  	{
	  		id: 2,
	  		area: "CN",
	  		name: "谢文浩",
	  		en_name: "kevin",
	  		province: "广东省",
	  		city: "河源市",
	  		contact: "kevin",
	  		email: "963170847@qq.com",
	  		project_count: "1542"	
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
  		this.$refs.ClientPop.show('add');
  	},
  	editPop (row) {
  		this.popType = "edit";
  		console.log(row);
  		this.$refs.ClientPop.show('edit',row);
  	},
   	deleteSingle ({id}) {
  		this.$confirm('删除后不可恢复，确认删除当前客户信息？', '提示', {type: 'warning'})
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
	ClientPop
  }
}
</script>
<style scoped lang="scss"></style>