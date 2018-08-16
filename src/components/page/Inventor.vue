<template>
  <div class="main">
    <!-- <strainer v-model="filter" @refresh="refresh"></strainer> -->
  	<table-component :tableOption="option" :data="tableData" @refreshTableData="refreshTableData" ref="table"></table-component>
  	<pop-panel ref="pop" @refresh="handlePopRefresh"></pop-panel>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
// import Strainer from '@/components/page_extension/strainer'
import PopPanel from '@/components/page_extension/Inventor_pop'
import AxiosMixins from '@/mixins/axios-mixins'
import {mapGetters} from 'vuex'

const URL = '/api/inventors'

export default {
  name: 'inventorList',
  mixins: [ AxiosMixins ],
  data () {
		return {
		  option: {
        'name': 'inventorList',
        'url': URL,
        'height': 'default2',
		  	'header_btn': [
		  		{ type: 'add', click: this.addPop },
          { type: 'delete' },
		  		{ type: 'control' },
		  	],
		  	'rowClick': this.editPop,
		  	'columns': [
          { type: 'selection' },
		  		{ type: 'text', label: '发明人姓名', prop: 'name', width: '150' },
		  		{ type: 'text', label: '英文名', prop: 'en_name', width: '150'},
		  		{ type: 'text', label: '关联客户', prop: 'client', render_simple: 'name', width: '150' },
		  		{ type: 'text', label: '证件号码', prop: 'identity', width: '240' },
		  		{ 
		  			type: 'text', 
		  			label: '国籍', 
		  			prop: 'area', 
		  			width: '145',
		  			render_text: _=>{
		  				return this.areaMap.get(_);
		  			} 
		  		},
		  		{ type: 'text', label: '手机', prop: 'phone_number', width: '175' },
		  		{ type: 'text', label: '邮箱', prop: 'email', sortable: true, min_width: '200' },
		  	],
		  },
		  tableData: '',
      filter: {},
		}
  },
  computed: {
  	...mapGetters([
  		'areaMap',
  	]), 
  },
  methods: {
  	addPop () {
  		this.$refs.pop.show();
  	},
  	editPop (row) {
  		this.$refs.pop.show('edit',row);
  	},
  	refreshTableData (option) {
      const url = URL;
      const data = Object.assign({}, option);
      const success = _=>{ this.tableData = _.result };

      this.axiosGet({url, data, success});
  	},
    refresh () {
      this.$refs.table.refresh();
    },
    update () {
      this.$refs.table.update();
    },
    handlePopRefresh (key) {
      this.refresh();
    }
  },
  mounted () {
    this.refresh();
  },
  components: { 
  	TableComponent, 
  	PopPanel 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>