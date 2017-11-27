<template>
  <div class="main">
		<table-component :tableOption="option" :data="tableData" ref="table" @refreshTableData="refreshTableData"></table-component>
  	<pop @refresh="handlePopRefresh" ref="pop" :confirm="isConfirm"></pop>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import Pop from '@/components/page_extension/DispatchAdministration_pop'
import AxiosMixins from '@/mixins/axios-mixins'

const URL = '/api/expresses'

export default {
  name: 'dispatchAdministration',
  mixins: [ AxiosMixins ],
  data () {
		return {
      isConfirm: '',
      isReceive: false,
		  option: {
		  	'header_btn': [
		  		{ type: 'add', click: this.addPop },
		  		{ type: 'control' },		  		
		  	],
        'height': 'default2',
		  	'columns': [
		  		{ type: 'text', label: '快递公司', prop: 'company', width:'160' },
          { type: 'text', label: '快递单号', prop: 'number' , width:'240'},
          { type: 'text', label: '发件日期', prop: 'mail_date', width:'178'},
          { type: 'text', label: '收件日期', default: '暂未收件', prop: 'receipt_date', width:'178'},
          { type: 'text', label: '收件人', render_simple: 'name', prop: 'to', width:'145' },
          { type: 'text', label: '发件人', render_simple: 'name', prop: 'from', width:'145'},
          { type: 'array', label: '文件信息', prop: 'projects', width:'263',
            render (array) {
              return array.map(_=>`${_.name}: ${_.type.join(";")}`);
            }
          },
          { type: 'text', label: '发文描述', prop: 'description', min_width:'210' },
          { 
		  			type: 'action',
            width: '200', 
		  			btns: [
		  				{ type: 'confirm', click: this.editPop ,btn_if: this.btnDisabled},
		  				{ type: 'delete', click: this.deleteSingle },
		  			] 
		  		},
		  	] 
		  },
		  tableData: [],
		}
  },
  methods: {
  	refreshTableData (option) {
  		const url = URL;
  		const data = option;
  		const success = _=>{ 
        console.log(_);
        this.tableData = _.list;
        console.log(this.tableData);
      };

  		this.axiosGet({url, data, success});
  	},
  	edit ({id}) {
  		this.$router.push({path: '/setting/template/edit', query: {id} });
  	},
  	refresh () {
  		this.$refs.table.refresh();
  	},
  	update () {
  		this.$refs.table.update();
  	},
  	addPop () {
      this.isConfirm = "";
  		this.$refs.pop.show('add');
  	},
  	editPop (row) {
      this.isConfirm = this.option.columns[8].btns[0].type;
  		this.$refs.pop.show('confirm', row);
  	},
    btnDisabled (row) {
      if(row.receipt_date == "") {
        return this.isReceive = true;
      }
    },
  	deleteSingle ({id}) {
  		this.$confirm('删除后不可恢复，确认删除当前收发文记录？', '提示', {type: 'warning'})
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
  	handlePopRefresh (t) {
      console.log(t);
  		t === 'add' ? this.refresh() : this.update();
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