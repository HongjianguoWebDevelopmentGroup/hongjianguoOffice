<template>
  <div class="main">
  	<table-component :tableOption="option" :data="tableData" @refreshTableData="refreshTableData" ref="table"></table-component>
  	<pop-panel ref="pop" @refresh="handlePopRefresh"></pop-panel>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import PopPanel from '@/components/page_extension/Contact_pop'

const URL = '/api/contacts'

export default {
  name: 'contactList',
  data () {
		return {
		  option: {
        'name': 'contactList',
        'url': URL,
        'height': 'default2',
        'search_placeholder': '接口人姓名、关联客户',
		  	'header_btn': [
		  		{ type: 'add', click: this.addPop },
          { type: 'delete' },
		  	],
		  	'handleRowClick': this.editPop,
		  	'columns': [
          { type: 'selection' },
		  		{ type: 'text', label: '接口人姓名', prop: 'name' },
		  		{ type: 'text', label: '关联客户', prop: 'client',  render_simple: 'name'},
		  		{ type: 'text', label: '手机号码', prop: 'phone_number' },
		  		{ type: 'text', label: '邮箱地址', prop: 'email'},
		  	]
		  },
		  tableData: '',
		}
  },
  methods: {
  	addPop () {
  		this.$refs.pop.show();
  	},
  	editPop ({id}) {
  		this.$refs.pop.show('edit', id);
  	},
  	refreshTableData (option) {
      const url = URL;
      const data = Object.assign({}, option);
      const success = _=>{ this.tableData = _.result };

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
  components: { 
    TableComponent, 
    PopPanel 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>