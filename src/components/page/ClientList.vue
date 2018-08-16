<!--客户管理-->
<template>
	<div class="clientList">
		<table-component :tableOption="tableOption" :data="tableData" ref="table" @refreshTableData="refreshTableData"></table-component>
		<el-dialog :visible.sync="dialogVisible" title="新建客户" class="dialog-medium">
			<client-form @refresh="addRefresh" ref="form"></client-form>
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

const URL = '/api/clients';
export default {
  name: 'clientList',
  data () {
		return {
		  popType: '',	
		  tableOption: {
		  	'name': 'clientList',
		  	'url': URL,
		  	'height': 'default2',
		  	'highlightCurrentRow': true,
		  	'search_placeholder': '客户名称、英文名称、联系人',
		  	'rowClick': this.handleRowClick,
		  	'header_btn': [
		  	   { type: 'add', click: this.addPop},
		  	   { type: 'delete'},
		  	   { type: 'control', label: '字段'},
		  	],
		  	'columns': [
		  	  { type: 'selection' },
		  	  { type: 'text', label: '客户名称', prop: 'name', min_width: '178', show_option: false},
		  	  { 
            type: 'text', 
            label: '地区', 
            prop: 'area', 
            width: '200',
            render_text: _=>{
              return this.areaMap.get(_);
            },
          },
		  	  { type: 'text', label: '英文名称', prop: 'en_name', width: '178'},
		  	  { 
            type: 'text', 
            label: '省份', 
            prop: 'province', 
            width: '200',
            render_text: _=>{
              return this.provinceMap.get(_);
            }
          },
		  	  { 
            type: 'text', 
            label: '城市', 
            prop: 'city', 
            width: '200',
            render_text: _=>{
              return this.cityMap.get(_);
            }
          },
		  	  { type: 'text', label: '联系人', prop: 'contact', width: '178'},
		  	  { type: 'text', label: '电子邮箱', prop: 'email', width: '220'},
          { type: 'text', label: '手机号', prop: 'phone_number', width: '200' },
		  	  { type: 'text', label: '案件数', prop: 'project_count', width: '150' },
		  	],
		  },
		  tableData: '',
		  currentRow: '',
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
  	handleRowClick (row) {
  		this.currentRow = row;
  		if(this.shrinkVisible) {
  			this.shrinkVisible = true;	
  		}
  	},
  	refreshTableData(option) {
  		
  		const success = _=>{
        this.tableData = _.result;  
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
  		
  		this.dialogVisible = true;
  	},
  	addRefresh () {
  		this.dialogVisible = false;
  		this.refresh();
  	},
    editRefresh () {
      this.update();
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