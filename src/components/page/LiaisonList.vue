<template>
  <div class="main">
  	<table-component :tableOption="option" :data="tableData" @refreshTableData="refreshTableData" ref="table"></table-component>
  	<pop-panel ref="pop" @refresh="handlePopRefresh"></pop-panel>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import PopPanel from '@/components/page_extension/LiaisonList_pop'

const URL = '/api/liaison'

export default {
  name: 'liaisonList',
  data () {
		return {
		  option: {
        'name': 'liaisonList',
        'url': URL,
        'height': 'default2',
		  	'header_btn': [
		  		{ type: 'add', click: this.addPop },
          { type: 'delete' },
		  	],
		  	'columns': [
          { type: 'selection' },
		  		{ type: 'text', label: '接口人姓名', prop: 'name',  width: '200' },
		  		{ type: 'text', label: '关联客户', prop: 'customer', width: '200'},
		  		{ type: 'text', label: '邮箱', prop: 'identity', width: '200' },
		  		{ type: 'text', label: '手机号码', prop: 'citizenship', width: '200' },
		  		{ type: 'text', label: 'QQ', prop: 'mobile', width: '200' },
		  		{ type: 'text', label: '微信号', prop: 'email', min_width: '200' },
		  		{ 
		  			type: 'action',
            width: '150',
		  			btns: [
		  				{ type: 'edit', click: this.editPop },
		  			]
		  		}
		  	]
		  },
		  tableData: '',
		}
  },
  methods: {
  	addPop () {
  		this.$refs.pop.show();
  	},
  	editPop (col) {
  		this.$refs.pop.show('edit', col);
  	},
  	refreshTableData (option) {
      const url = URL;
      const data = Object.assign({}, option);
      const success = _=>{ this.tableData = _.data };

      this.$axiosGet({url, data, success});
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
  components: { TableComponent, PopPanel }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>