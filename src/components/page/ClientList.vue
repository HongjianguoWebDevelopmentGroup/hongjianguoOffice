<!--客户管理-->
<template>
	<div class="clientList">
		<table-component :tableOption="tableOption" :data="tableData" ref="table" @refreshTableData="refreshTableData"></table-component>
		<el-dialog :visible.sync="dialogVisible" title="新建客户" class="dialog-medium">
			<client-form :row="currentRow" @refresh="addRefresh" ref="form"></client-form>
		</el-dialog>
		<app-shrink :visible.sync="shrinkVisible" title="客户详情">
			<detail :row="currentRow" @refresh="editRefresh"></detail>
		</app-shrink>
	</div>
</template>
<script>
import TableComponent from '@/components/common/TableComponent'
import ClientForm from '@/components/page_extension/ClientList_form'
import ClientListDetail from '@/components/page_extension/ClientList_detail'
import AppShrink from '@/components/common/AppShrink'
import Detail from '@/components/page_extension/ClientList_detail'
import {mapGetters} from 'vuex'

const URL = '/api/customers';
export default {
  name: 'clientList',
  data () {
		return {
		  popType: '',	
		  tableOption: {
		  	'name': 'clientList',
		  	'url': URL,
		  	'height': 'default',
				'highlightCurrentRow': true,
				'is_search': true,
				'is_list_filter': true,
		  	'search_placeholder': '客户名称、联系人',
		  	'rowClick': this.handleRowClick,
		  	'header_btn': [
					{ type: 'import' },
		  	  { type: 'export' },
          { type: 'control' },
          // { type: 'filter', click: ()=>{ this.filterPopUp } },
          
		  	],
		  	'columns': [
		  	  { type: 'selection' },
		  	  { type: 'text', label: '客户名称', prop: 'name', min_width: '178'},
		  	  { 
            type: 'text', 
            label: '客户代码', 
            prop: 'id', 
            width: '200',
            // render_text: _=>{
            //   return this.areaMap.get(_);
            // },
          },
		  	  { type: 'text', label: '所属销售', prop: 'sales_id', width: '178'},
		  	  { 
            type: 'text', 
            label: '联系人', 
            prop: 'province', 
            width: '200',
            render_text: _=>{
              return this.provinceMap.get(_);
            }
          },
		  	  { 
            type: 'text', 
            label: '地址', 
            prop: 'address', 
            width: '200',
            // render_text: _=>{
            //   return this.cityMap.get(_);
            // }
          },
		  	  { type: 'text', label: '邮箱', prop: 'email_address', width: '178'},
		  	  { type: 'text', label: '电话', prop: 'phone_number', width: '220'},
          { type: 'text', label: '备注', prop: 'remark', width: '200' },
		  	],
		  },
			tableData: [],
			client_status:'',
			client_invoice:'',
		  currentRow: {},
		  shrinkVisible: false,
		  dialogVisible: false,
		  filter: {},
		}	
  },
  computed: {
    ...mapGetters([
      'areaMap',
      'cityMap',
      'provinceMap',
		]),
  },
  methods: {
		// handleShrinkClose () {
    //   this.$refs.table.setCurrentRow();
    // },
  	handleRowClick (row) {
			
			this.currentRow = row;
			
  		if(this.shrinkVisible) {
  			this.shrinkVisible = true;	
  		}
  	},
  	refreshTableData(option) {
  		const success = _=>{
				this.tableData = _.data;  
			}
  		this.$axiosGet({
  			url: URL,
  			data: Object.assign({}, option),
  			success,
			})
  	},
  	addPop () {
  		if(this.$refs.form) {
  			this.$refs.form.clear();	
  		}
  		this.currentRow = row;
  		this.dialogVisible = true;
  	},
  	addRefresh () {
			this.currentRow = row;
  		this.dialogVisible = false;
  		this.refresh();
  	},
    editRefresh () {
      this.update();
    },
  	handleRowClick (row) {
			console.log(row)
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
  mounted() {
  	this.refresh();
  },
  components:{
		TableComponent,
		ClientForm,
		AppShrink,
		ClientListDetail,
		Detail,
  }
}
</script>
<style scoped lang="scss"></style>