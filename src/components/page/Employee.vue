<template>
	<div class="main" >
		<el-tabs class="employee-tree" type="border-card" v-model="activeName">
			<el-tab-pane label="组织架构" name="branch">
				<div :style="tabMain"><tree-branch v-model="branchValue"></tree-branch></div>
			</el-tab-pane>
			<el-tab-pane label="角色管理" name="group">
				<div :style="tabMain"><tree-group v-model="groupValue"></tree-group></div>
			</el-tab-pane>
		</el-tabs>
		<div style="margin-left: 280px;">
			<keep-alive>
				<table-component v-if="activeName == 'branch'" key="branch" :tableOption="option" :data="tableDataBranch" @refreshTableData="refreshTableData" ref="table"></table-component>
				<table-component v-if="activeName == 'group'" key="group" :tableOption="option2" :data="tableDataGroup" @refreshTableData="refreshTableData2" ref="table2"></table-component>
			</keep-alive>
		</div>
		<pop ref="pop" @refresh="refresh"></pop>
		<el-dialog title="添加成员" :visible.sync="dialogEmployee" class="dialog-mini" @close="employees = []">
      <remote-select type="employee" v-model="employees" multiple></remote-select>
      <el-button type="primary" size="small" @click="addEmployee" :loading="employeeLoading" style="margin-top: 10px;">{{ employeeLoading ? '添加中...' : '确认添加' }}</el-button>
    </el-dialog>
	</div>
</template>


<script>
import TreeBranch from '@/components/page_extension/Employee_branch'
import TreeGroup from '@/components/page_extension/Employee_group'
import TableComponent from '@/components/common/TableComponent'
import Pop from '@/components/page_extension/Employee_pop'
import RemoteSelect from '@/components/form/RemoteSelect'
import {mapGetters} from 'vuex'

const URL = '/api/employees';

export default { 
	name: 'Employee',
	data () {		
		return {
			activeName: 'branch',
			groupValue: '',
			branchValue: '',
			option: {
				'name': 'EmployeeBranchList',
				'url': URL,
				'is_border': false,
				'is_pagination': false,
				'is_search': false,
				'rowClick': _=>{
					const id = _.id;
					if(!id) return this.$message({type: 'warning', message: '获取详情信息异常，请尝试刷新页面'});
					console.log(id);
					this.$refs.pop.show('edit', id);
				},
				'header_btn': [
					{ 
						type: 'add', 
						click: _=>{
						const branch = this.branchValue ? [this.branchValue] : []; 
							this.$refs.pop.show('add', { branch } ); 
						} 
					},
					{ type: 'delete' },
				],
				columns: [
					{ type: 'selection' },
					{ type: 'text', prop: 'name', label: '姓名' },
					{ type: 'text', prop: 'number', label: '工号' },
					{ type: 'text', prop: 'phone_number', label: '手机号' },
					{ type: 'text', prop: 'email', label: '邮箱' },
					{ type: 'array', prop: 'groups', label: '角色' },
				],
			},
			option2: {
				'name': 'EmployeeGroupList',
				'is_border': false,
				'is_pagination': false,
				'is_search': false,
				'header_btn': [
					{ 
						type: 'custom', 
						label: '添加成员', 
						click: _=>{
							if(!this.groupValue) return this.$message({type: 'warning', message: '请选择角色'});
							this.dialogEmployee = true;
						} 
					},
					{ type: 'custom', label: '批量移除', click: this.removeEmployee },
				],
				columns: [
					{ type: 'selection' },
					{ type: 'text', prop: 'name', label: '姓名' },
					{ type: 'text', prop: 'number', label: '工号' },
					{ type: 'array', prop: 'branches', label: '部门' },
				]
			},
			tableDataBranch: '',
			tableDataGroup: '',
			employees: [],
      employeeLoading: false,
      dialogEmployee: false,
		};
	},
	computed: {
		...mapGetters ([
			'innerHeight',
			'innerWidth',
		]),
		tabMain () {
			return `height: ${this.innerHeight - 130}px;`
		}
	},
	methods: {
		refreshTableData () {
			this.$axiosGet({
				url: URL,
				data: {
					branch: this.branchValue, 
				},
				success: _=>{
					this.tableDataBranch = _.result;
				}
			});
		},
		refreshTableData2 () {
			this.$axiosGet({
				url: URL,
				data: {
					group: this.groupValue,
				},
				success: _=>{
					this.tableDataGroup = _.result;
				}
			})
		},
		refresh () {
			if(this.activeName == 'branch') {
				this.$refs.table.refresh();
			}

			if(this.activeName == 'group') {
				this.$refs.table2.refresh();
			}
		},
		addEmployee () {
      if(this.employees.length == 0) return this.$message({type: 'warning', message: '请选择需要添加的成员'});
			this.employeeLoading = true;
      this.$axiosPut({
        url: `/api/groups/${this.groupValue}/members`,
        data: {
          ids: this.employees,
        },
        success: _=>{
          this.$message({type: 'success', message: '添加成员成功'});
          this.dialogEmployee = false;
          this.refresh();
        },
        complete: _=>{ this.employeeLoading = false; }
      })
    },
    removeEmployee () {
    	if(!this.groupValue) return this.$message({type: 'warning', message: '请选择角色'});
      const selected = this.$refs.table2.getSelected();
      if(!selected) return; //若不存在选项 则不移除
      this.$axiosDelete({
      	url: `/api/groups/${this.groupValue}/members`,
      	data: {
      		ids: selected.map(_=>_.id),
      	},
      	success: _=>{
      		this.$message({type: 'success', message: '移除成员成功'});
      		this.refresh();
      	}
      })
    }
	},
	watch: {
		groupValue () {
			if(this.activeName == 'group') {
				this.refresh();
			}
		},
		branchValue () {
			if(this.activeName == 'branch') {
				this.refresh();
			}
		}
	},
	components: {
		TreeGroup,
		TreeBranch,
		TableComponent,
		Pop,
		RemoteSelect,
	},

}
</script>

<style lang="scss">
#app {
  
  .employee-tree {
    float: left;
    width: 260px;
    .el-tabs__item {
      padding: 0 37px;
    }   
  }
}
</style>