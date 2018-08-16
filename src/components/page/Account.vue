<!--账号管理-->
<template>
	<div>
		<el-card style="width: 260px; float: left;">
		<el-tree 
			:data="groupData"
			:render-content="renderContent"		 
		></el-tree>
		</el-card>
		<table-component :tableOption="option" :data="tableData" style="margin-left: 280px;"></table-component>
		<el-dialog :title="powerTitle" class="dialog-small" :visible.sync="dialogPowerVisible" :loading="powerLoading">
	    <div style="height: 500px; overflow-y: auto; border-radius: 5px; border: 1px solid #ccc; margin-bottom: 20px;" v-loading="powerLoading" element-loading-text="加载设置中...">
	    <el-form label-width="300px">
	      <el-form-item v-for="item in groupRules" :label="item.name" :key="item.id">
	        <app-switch type="status" v-model="item.checked" style="margin-left: 50px"></app-switch>
	      </el-form-item>
	    </el-form>
	    </div>
	    <el-button type="primary" @click="saveRules">保存设置</el-button>
	  </el-dialog>
	  <el-dialog title="新增账号" :visible.sync="dialogAdd" @close="$refs.addForm.resetFields()">
	  	<el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="80px">
	  		<el-form-item label="用户名" prop="username">
	  			<el-input v-model="addForm.username"></el-input>
	  		</el-form-item>
	  		<el-form-item label="密码" prop="password">
	  			<el-input type="password" v-model="addForm.password"></el-input>
	  		</el-form-item>
	  		<el-form-item label="确认密码" prop="password_again">
	  			<el-input type="password" v-model="addForm.password_again"></el-input>
	  		</el-form-item>
	  		<el-form-item label="启用情况" prop="status">
	  			<app-switch type="status" v-model="addForm.status"></app-switch>
	  		</el-form-item>
	  		<el-form-item label="关联人" prop="member">
	  			<remote-select type="member" v-model="addForm.member"></remote-select>
	  		</el-form-item>
	  		<el-form-item style="margin-bottom: 0px;">
	  			<el-button type="primary" size="small" @click="add" :loading="loading">{{ loading ? '保存中...' : '保存' }}</el-button>
	  			<el-button type="danger" size="small" @click="dialogAdd = false">取消</el-button>
	  		</el-form-item>
	  	</el-form>
	  </el-dialog>
	  <el-dialog title="修改密码" :visible.sync="dialogEdit" @close="$refs.editForm.resetFields()">
	  	<el-form ref="editForm" :model="editForm" :rules="editFormRules">
	  		<el-form-item label="新密码" prop="password">
	  			<el-input type="password" v-model="editForm.password"></el-input>
	  		</el-form-item>
	  		<el-form-item label="确认密码" prop="password_again">
	  			<el-input type="password" v-model="editForm.password_again"></el-input>
	  		</el-form-item>
	  		<el-form-item>
	  			<el-button type="primary" size="small" @click="edit" :loading="loading">{{ loading ? '修改中...' : '确认修改' }}</el-button>
	  			<el-button type="danger" size="small" @click="dialogEdit = false">取消</el-button>
	  		</el-form-item>
	  	</el-form>
	  </el-dialog>
	  </el-dialog>
	</div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import AppSwitch from '@/components/form/AppSwitch'
import RemoteSelect from '@/components/form/RemoteSelect'
import {mapGetters} from 'vuex'

const URL = '/api/accounts';

export default {
	name: 'account',
	data () {
		return {
			option: {
				name: 'accountList',
				url: URL,
				is_border: false,
				is_pagination: false,
				rowClick: this.editPop,
				search_placeholder: '用户名、名称',
				header_btn: [
					{ type: 'add', click: _=>{ this.dialogAdd = true; } },
					{ type: 'delete' },
					{ type: 'custom', label: '批量启用', click: _=>{} },
					{ type: 'custom', label: '批量禁用', click: _=>{} },
				],
				columns: [
					{ type: 'text', label: '用户名', prop: 'username' },
					{ type: 'text', label: '名称', prop: 'name' },
					{ type: 'text', label: '启用情况', prop: 'status' },
				]
			},
			powerTitle: '',
			dialogPowerVisible: false,
			powerLoading: false,
			groupRules: [],
			tableData: [],
			dialogAdd: false,
			dialogEdit: false,
			loading: false,
			editId: '',
			addForm: {
				'username': '',
				'password': '',
				'password_again': '',
				'status': 1,
				'member': '',
			},
			editForm: {
				'password': '',
				'password_again': '',
			},
			addFormRules: {
				'username': {required: true, trigger: 'blur', message: '用户名不能为空'},
				'password': {required: true, trigger: 'blur', message: '密码不能为空'},
				'password_again': {required: true, trigger: 'blur', message: '确认密码不能为空'},
				'member': {required: true, trigger: 'change', message: '关联人不能为空'},
			},
			editFormRules: {
				'password': {required: true, trigger: 'blur', message: '密码不能为空'},
				'password_again': {required: true, trigger: 'blur', message: '确认密码不能为空'},
			},
		}
	},
	computed: {
		...mapGetters([
			'groupData'
		])
	},
	methods: {
		renderContent(h,{node, store, data}) {
      return (
        <span style="white-space: normal;width: 100%;">
          <span>
            <span style="font-size: 12px">{ data.name }</span>
          </span>
          <span style="float: right; margin-right: 20px;">
            {data.id !== 0 && data.id !== 1 ? <el-button size="mini" type="primary" class="tree-render-btn" on-click={ () => this.powerPop(store, data) }>权限</el-button> : <i></i>}
          </span>
        </span>
      );
    },
    powerPop(store, data) {
      this.dialogPowerVisible = true;
      this.powerLoading = true;
      this.powerTitle = `设置${data.name}权限`;

      const url = `${URL}/${data.id}`;
      const success = _=>{
        this.groupRules = _.group.rules;
        this.powerLoading = false;
      };
      this.axiosGet({url, success});
    },
    saveRules() {
      const url =  `${URL}/${this.value.id}`;
      const data = {rules: this.groupRules};
      const success = _=>{
        this.$message({message: '保存权限设置成功', type: 'success'});
        this.dialogPowerVisible = false;
      }

      this.axiosPut({url, data, success});
    },
    editPop({id}) {
    	this.editId = id;
    	this.dialogEdit = true; 
    },
    add() {
    	this.$refs.addForm.validate(valid=>{
    		if(valid) {
    			if(this.addForm.password != this.addForm.password_again) {
    				return this.$message({type: 'warning', message: '密码与确认密码不一致'});
    			}

    			this.loading = true;
    			this.$axiosPost({
    				url: URL,
    				data: this.addForm,
    				success: _=>{
    					this.dialogAdd = false;
    					this.$message({type: 'success', message: '创建账号成功'});
    					//添加一条语句,选择到新建账号的分组
    					this.refresh();
    				},
    				complete: _=>{
    					this.loading = false;
    				}
    			})
    		}
    	})
    	const url = URL;
    	const data = this.addForm;
    },
    edit() {
    	this.$refs.editForm.validate(valid=>{
    		if(valid) {
    			if(this.addForm.password != this.addForm.password_again) {
    				return this.$message({type: 'warning', message: '密码与确认密码不一致'});
    			}

    			this.loading = true;
    			this.$axiosPut({
    				url: `${URL}/${this.editId}`,
    				data: this.editForm,
    				success: _=>{
    					this.dialogEdit = false;
    					this.$message({type: 'success', message: '修改密码成功'});
    				},
    				complete: _=>{
    					this.loading = false;
    				}
    			})
    		}
    	})
    }
	},
	components: {
		TableComponent,
		AppSwitch,
		RemoteSelect,
	}
}
</script>