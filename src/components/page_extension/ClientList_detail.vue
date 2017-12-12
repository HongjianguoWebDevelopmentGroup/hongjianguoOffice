<template>
	<el-tabs v-model="activeName">
    <el-tab-pane label="基本信息" name="first">
    	<first ref="first" popType="edit" @refresh="handleRefresh"></First>
    </el-tab-pane>
    <el-tab-pane label="客户要求" name="second">
    	<second ref="second" :customer-id="row.id"></second>
    </el-tab-pane>
    <el-tab-pane label="报价" name="third">
    	<third ref="third" :customer-id="row.id"></third>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import First from '@/components/page_extension/ClientList_form'
import Second from '@/components/page/RequirementList'
import Third from '@/components/page_extension/ClientList_offer'
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
			if(this.activeName == 'first') {
				this.$refs.first.show('edit', this.row);
				this.map['first'] = true;
			}else if(this.activeName == 'second') {
				this.$nextTick(_=>{
					this.$refs.second.refresh();
				})
				this.map['second'] = true;
			}else if(this.activeName == 'third') {
				this.$nextTick(_=>{
					this.$refs.third.refresh();
				})
				this.map['third'] = true;
			}
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
		Second,
		Third,
	}

}
</script>