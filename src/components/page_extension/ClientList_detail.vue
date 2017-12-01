<template>
	<el-tabs v-model="activeName">
    <el-tab-pane label="基本信息" name="first">
    	<first ref="first" popType="edit"></First>
    </el-tab-pane>
    <el-tab-pane label="客户要求" name="second">
    	<second ref="second" :customer-id="row.id"></second>
    </el-tab-pane>
    <el-tab-pane label="报价" name="third">
    	
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import First from '@/components/page_extension/ClientList_form'
import Second from '@/components/page/RequirementList'
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
				this.$refs.second.refresh();
				this.map['second'] = true;
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
		}
	},
	mounted () {
		this.refreshData();
	},
	components: {
		First,
		Second,
	}

}
</script>