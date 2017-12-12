<template>
	<el-tabs v-model="activeName">
    <el-tab-pane label="基本信息" name="info">
    	<info :row="row" ref="info" @refresh="handleRefresh"></info>
    </el-tab-pane>
    <el-tab-pane label="相关案件" name="project">
    	<project :row="row" ref="project" @rowClick="_=>{$emit('rowClick', _)}"></project>
    </el-tab-pane>
  </el-tabs>
</template>
<script>

import Info from '@/components/page_extension/BusinessList_info'
import Project from '@/components/page_extension/BusinessList_project'

export default {
	name: 'clientListDetail',
	props: {
		row: '',
	},
	data () {
		return {
			activeName: 'info',
			map: {},
		}
	},
	methods: {
		refreshData() {
			if(this.activeName == 'info') {
				this.$refs.info.refresh();
				this.map['info'] = true;
			}else if(this.activeName == 'project') {
				this.$refs.project.refresh();
				this.map['project'] = true;
			}
		},
		handleRefresh () {
			this.$emit('refresh');
		}
	},
	watch: {
		row () {
			this.map = {};
			this.$nextTick(_=>{
				this.refreshData();
			})
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
		Info,
		Project,
	}

}
</script>