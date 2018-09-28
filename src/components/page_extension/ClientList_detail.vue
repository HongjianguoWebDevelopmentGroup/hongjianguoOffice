<template>
	<el-tabs v-model="activeName" @tab-click="renderer">
		<el-tab-pane label="基本信息" name="first">
			<first  popType="edit" :customer="row" @refresh="handleRefresh"></first>
		</el-tab-pane>
		<el-tab-pane label="申请人" name="applicants">
			<detail-proposer :customer="row" :itemData="appData"></detail-proposer>
		</el-tab-pane>
		<el-tab-pane label="发明人" name="inventors">
			<detail-inventor :customer="row"  :itemData="inventorsData"></detail-inventor>
		</el-tab-pane>
		<el-tab-pane label="联系人" name="contacts">
			<detail-linkman  :customer="row" :itemData="contactsData"></detail-linkman>
		</el-tab-pane>
		<el-tab-pane label="合同" name="contracts">
			<detail-contract  :customer="row" :itemData="contractsData"></detail-contract>
		</el-tab-pane>
		<el-tab-pane label="报价单" name="quotation">
			<detail-quotation  :customer="row"></detail-quotation>
		</el-tab-pane>
		<el-tab-pane label="客户备注" name="remarks">
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
			appData:[],
			inventorsData:[],
			contactsData:[],
			contractsData:[]
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
		},
		
		renderer(tab, event){
			if(tab.name != 'first'){
				const url = `/api/customers/${this.row.id}/${tab.name}`;
				
				const success = _=>{
					if(this.appData.length == 0) {
						if(tab.name == 'applicants') {
							let initialData = _.data.data;
							for(let i = 0; i < initialData.length; i++) {
								this.appData.push(initialData[i]);
							}
						}
					}
					if(this.inventorsData.length == 0) {
						if(tab.name == 'inventors') {
							let initialData = _.inventors.data;
							for(let i = 0; i < initialData.length; i++) {
								this.inventorsData.push(initialData[i]);
							}
						}
					}
					if(this.contactsData.length == 0) {
						if(tab.name == 'contacts') {
							let initialData = _.Contacts.data;
							for(let i = 0; i < initialData.length; i++) {
								this.contactsData.push(initialData[i]);
							}
						}
					}
					if(this.contactsData.length == 0) {
						if(tab.name == 'orders') {
							let initialData = _.Contacts.data;
							for(let i = 0; i < initialData.length; i++) {
								this.contractsData.push(initialData[i]);
							}
						}
					}								
				}
				this.$axiosGet({
					url: url,
					data: Object.assign({}),
					success,
				})	
			}
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