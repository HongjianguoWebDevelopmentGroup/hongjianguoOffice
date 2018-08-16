<!--申请人管理-->
<template>
  <div class="main">
		<table-component :tableOption="option" :data="tableData" ref="table" @refreshTableData="refreshTableData"></table-component>
		<pop @refresh="refresh" ref="pop"></pop>
  </div>
</template>

<script>

import AxiosMixins from '@/mixins/axios-mixins'
import TableComponent from '@/components/common/TableComponent'
import Pop from '@/components/page_extension/ApplicantList_pop'
import {mapGetters} from 'vuex'

const URL = '/api/applicants';

export default {
  name: 'applicantList',
  mixins: [ AxiosMixins ],
  data () {
		return {
		  option: {
        'name': 'applicant',
        'url': '/api/applicants',
        'height': 'default2',
        'search_placeholder': '姓名、客户',
        'rowClick': this.editPopUp,
		  	'header_btn': [
		  		{ type: 'add', click: this.addPopUp },
          { type: 'delete' },
		  		{ type: 'control' },
		  	],
		  	'columns': [
		  		{ type: 'selection' },
		  		{ type: 'text', label: '申请人姓名', prop: 'name', width: '250' },
          { type: 'text', label: '关联客户', prop: 'client', render_simple: 'name', width: '200' },
          { type: 'text', label: '证件号码', prop: 'identity', width: '240' },
          { type: 'text', label: '费用备案', prop: 'fee_discount', width: '145', render: (h, item)=>h('span', item ? '已完成' : '未完成') },
		  		{ 
            type: 'text', 
            label: '申请人类型', 
            prop: 'type', 
            width: '200',
            render_text: _=>this.applicantTypeMap.get(_), 
          },
          { 
            type: 'text', 
            label: '地区', 
            prop: 'area', 
            sortable: true, 
            width: '175',
            render_text: _=>this.areaMap.get(_),
          },
          { 
            type: 'text', 
            label: '省份', 
            prop: 'province', 
            sortable: true, 
            width: '175', 
            render_text: _=>this.provinceMap.get(_),
          },
          { 
            type: 'text', 
            label: '城市', 
            prop: 'city', 
            sortable: true, 
            width: '175', 
            render_text: _=>this.cityMap.get(_),
          },
          { type: 'text', label: '详细地址', prop: 'address', width: '260' },
		  	],
		  },
		  tableData: [],
	    filter: {},
	    popType: '',
		}
  },
  computed: {
    ...mapGetters([
      'provinceMap',
      'cityMap',
      'areaMap',
      'applicantTypeMap'
    ])
  },
  methods: {
  	addPopUp () {
  		this.$refs.pop.show('add');
  	},
  	editPopUp (row) {
  		this.$refs.pop.show('edit',row);
  	},
  	applicantDelete ({id, name} ) {
  		this.$confirm(`删除后不可恢复，确认删除‘${name}’？`, {type: 'warning'})
  			.then(_=>{
  				const url = `${URL}/${id}`;
  				const success = _=>{
  					this.$message({message: '删除申请人成功', type: 'success'});
  					this.update();
  				}
  				this.axiosDelete({url, success});
  			})
  			.catch(_=>{});
  	},
  	refreshTableData (option) {
  		const url = URL;
  		const data = Object.assign({}, option);
  		const success = _=>{ this.tableData = _.applicants };

  		this.axiosGet({url, data, success});
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
  components: { TableComponent, Pop }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
