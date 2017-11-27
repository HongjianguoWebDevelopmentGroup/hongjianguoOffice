<template>
  <div class="main">
	<table-component :tableOption="option" :data="tableData"></table-component>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent' 

export default {
  name: 'commonDetailFee',
  data () {
		return {			
		  option: {
		  	'is_search': false,
				'columns': [
					{ type: 'text', label: '费用金额', prop: 'amount',width: '120',},
					{ type: 'text', label: '费用名称', prop: 'fee_name',width: '240',},
					{ type: 'text', label: '人民币', prop: 'rmb',width: '120',},
					{ type: 'text', label: '汇率', prop: 'roe',width: '120',},
					{ type: 'text', label: '货币', prop: 'currency',width: '120',},
					{ type: 'text', label: '创建时间', prop: 'create_time' ,width: '240',},
					{ type: 'text', label: '付款时间', prop: 'pay_time',width: '240',},
					{ type: 'text', label: '费用期限', prop: 'due_time',width: '240',},
					{ type: 'text', label: '法定期限', prop: 'deadline',width: '240',},
					{ type: 'text', label: '发文日', prop: 'mail_date',width: '240',},
					{ type: 'text', label: '收入类型', prop: 'debit_name',width: '120',},
					{ type: 'text', label: '费用备注', prop: 'remark',width: '120',},
					{ type: 'text', label: '费用状态', prop: 'status_name',width: '120',},
					// { 
					// 	type: 'action',
					// 	btns: [
					// 		{ type: 'edit', click: ()=>{alert('编辑')} },
					// 		{ type: 'delete', click: ()=>{alert('删除')} },
					// 	],
					// }
				],	  
		  }
		}
  },
  computed: {
  	tableData () {
  		return this.$store.getters.detailFees;
  	}
  },
  components: { TableComponent }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>