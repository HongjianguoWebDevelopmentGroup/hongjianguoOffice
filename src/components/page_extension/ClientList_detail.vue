<template>
	<el-tabs v-model="activeName">
    <el-tab-pane label="基本信息" name="first">
    	<first  popType="edit" :customer="row" @refresh="handleRefresh"></first>
    </el-tab-pane>
    <el-tab-pane label="申请人" name="proposer">
    	<detail-proposer  :customer="row"></detail-proposer>
    </el-tab-pane>
    <el-tab-pane label="发明人" name="inventor">
    	<detail-inventor  :customer="row"></detail-inventor>
    </el-tab-pane>
	<el-tab-pane label="联系人" name="linkman">
    	<detail-linkman  :customer="row"></detail-linkman>
    </el-tab-pane>
	<el-tab-pane label="合同" name="contract">
    	<detail-contract  :customer="row"></detail-contract>
    </el-tab-pane>
	<el-tab-pane label="报价单" name="quotation">
    	<detail-quotation  :customer="row"></detail-quotation>
    </el-tab-pane>
	<el-tab-pane label="客户备注" name="remark">
    	<detail-remark  :customer="row"></detail-remark>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import First from '@/components/page_extension/ClientList_form'
import DetailProposer from '@/components/page/RequirementList'
import DetailInventor from '@/components/page_extension/ClientList_inventor'
import DetailLinkman from '@/components/page_extension/ClientList_linkman'
import DetailContract from '@/components/page_extension/ClientList_contract'
import DetailQuotation from '@/components/page_extension/ClientList_quotation'
import DetailRemark from '@/components/page_extension/ClientList_remark'
export default {
	name: 'clientListDetail',
	props: {
		row: '',
	},
	data () {
		return {
			activeName: 'first',
			map: {},
		}
	},
	methods: {
		refreshData() {
			// if(this.activeName == 'first') {
			// 	this.$refs.first.show('edit', this.row);
			// 	this.map['first'] = true;
			// }else if(this.activeName == 'second') {
			// 	this.$nextTick(_=>{
			// 		this.$refs.second.refresh();
			// 	})
			// 	this.map['second'] = true;
			// }else if(this.activeName == 'third') {
			// 	this.$nextTick(_=>{
			// 		this.$refs.third.refresh();
			// 	})
			// 	this.map['third'] = true;
			// }
		},
		handleRefresh () {
			this.$emit('refresh');
		}
	},
	watch: {
		row () {
			this.map = {};
			this.refreshData();
		},
		activeName (val) {
			if(this.map[val]) return;
			this.refreshData();
		},
		
	},
	mounted () {
		this.refreshData();
	},
	components: {
		First,
		DetailProposer,
		DetailInventor,
		DetailLinkman,
		DetailContract,
		DetailQuotation,
		DetailRemark,
	}

}
</script>