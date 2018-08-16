<template>
  <div>
    
    <div class="tree-header">
      <el-button class="tree-header-btn" icon="el-icon-plus" size="mini" title="添加部门" @click="addPop" type="primary"></el-button>
      <el-button class="tree-header-btn" icon="el-icon-edit" size="mini" title="编辑部门"  @click="editPop" type="primary"></el-button>
      <el-button class="tree-header-btn" icon="el-icon-delete" size="mini" title="删除部门" @click="branchDelete" type="primary"></el-button>
      <el-input
        placeholder="搜索..."
        v-model="filterText"
        class="tree-header-search"
        size="mini">
      </el-input>
    </div>
    
    
		<el-tree
			:data="branchData"
			:props="props"
			highlight-current
			:expand-on-click-node="false"
      node-key="id"
			@node-click="nodeClick"
      :style="`height: ${innerHeight - 137}px; overflow: auto;border-top: 0;`"
      :default-expanded-keys="defaultExpand"
      :filter-node-method="filterNode"
      ref="tree"
		>
		</el-tree>
    <el-dialog :visible.sync="dialogVisible" :title="popType == 'add' ? '添加部门' : '编辑部门'" class="dialog-small" @close="clear">
      <el-form :model="form" ref="form" label-width="80px">
        <el-form-item label="部门名称" prop="name" :rules="{required: true, type: 'string', message: '部门名称不能为空', trigger: 'blur'}">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item v-if="form.parent != 0" label="上级部门" prop="parent" :rules="{required: true, type: 'number', message: '上级部门不能为空', trigger: 'change'}">
          <branch v-model="form.parent" :props="popProps" :disabled="popType == 'add'"></branch>
        </el-form-item>
        <el-form-item v-if="form.parent != 0" label="设置主管" prop="leader">
          <!-- <remote-select type="employee" v-model="form.leader"></remote-select> -->
        </el-form-item>
        <el-form-item style="margin-bottom: 0px;">
          <el-button type="primary" size="small" @click="save" :loading="loading">{{ loading ? '保存中...' : '保存' }}</el-button>
          <el-button type="danger"  size="small" @click="dialogVisible = false" :disabled="loading">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script> 
import RemoteSelect from '@/components/form/RemoteSelect'
import Branch from '@/components/form/Branch'

import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'

const URL = '/api/branches';
export default {
  name: 'employeeBranch',
  props: ['value'],
  data () {
		return {
      dialogVisible: false,
      loading: false,
		  props: {
		  	label: 'name',
		  	children: 'children',
		  },
      popProps: {
        label: 'name',
        children: 'children',
        disabled: (data, node)=>{
          return  this.currentBranch.indexOf(node.key) > -1;
        }
      },
      form: {
        name: '',
        parent: '',
        leader: '',
      },
      popType: '',
      currentId: '',
      transfer: '',
      filterText: '',
      currentId: '',
      defaultExpand: [],
		}
  },
  computed: {
    ...mapGetters([
      'innerHeight',
      'branchData',
      'branchUpdate',
      'branchFirst',
      'branchMap',
      'branchNext',
    ]),
    currentNode () {
      return this.branchMap.get(this.currentId);
    },
    currentPath () {
      return this.getPath(this.currentId);
    },
    currentBranch () {
      return this.getCurrentBranch(this.currentNode);
    }
  },
  methods: {
    ...mapActions([
      'refreshBranch',
    ]),
    getCurrentBranch(node) {
      const arr = [node.id];
      if(node && node.children) {
        node.children.forEach(_=>{
          arr.push(...this.getCurrentBranch(_));
        })
      }
      return arr;
    },
    getPath (id) {
      const node = this.branchMap.get(id);
      if(node && node.parent) {
        return this.getPath(node.parent) + '-' + id;
      }else {
        return id + '';
      }     
    },
    clear () {
      this.popType = '';
      this.$refs.form.resetFields();
    },
  	nodeClick (node) {
      this.currentId = node ? node.id : '';
      this.$emit('input', this.currentId);
  	},
    setCurrent (id) {
      this.$refs.tree.setCurrentKey(id);
      this.nodeClick(this.branchMap.get(id));
      this.defaultExpand = this.getPath(id).split('-');
    },
    reSet (id) {
      this.refreshBranch();
      this.$nextTick(_=>{
        this.branchNext.then(_=>{
          this.$nextTick(_=>{
            this.setCurrent(id);
          })
        })
      });
    },
    addPop () {
      this.popType = 'add';
      this.dialogVisible = true;
      this.$nextTick(_=>{
        this.form.parent = this.currentId ? this.currentId : 0;
      })      
    },
    editPop () {
      if(!this.currentId) return this.$message({type: 'warning', message: '请选择需要编辑的部门'});
      this.$axiosGet({
        url: `${URL}/${this.currentId}`,
        success: d=>{
          this.popType = 'edit';
          this.dialogVisible = true;
          this.$nextTick(_=>{
            this.$tool.coverObj(this.form, d.result); 
          })
        }
      })
    },
    save () {
      this.$refs.form.validate(_=>{
        if(_) {
          let url;
          const t = this.popType;
          const data = this.form;
          const success = _=>{
            this.reSet(this.currentId);
            this.$message({type: 'success', message: '新建部门成功'});
            this.dialogVisible = false;
          }
          const complete = _=>{
            this.loading = false;
          }
          this.loading = true;
          if( t == 'add' ) {
            url = URL;
            this.$axiosPost({url, data, success, complete})
          }
          if( t == 'edit' ) {
            url = `${URL}/${this.currentId}`;
            this.$axiosPut({url, data, success, complete})
          }
        }else {
          this.$message({type: 'warning', message: '请按要求填写表单'});
        } 
      })
      

    },
    branchDelete () {
      const c = this.currentId;

      if(!c) {
        this.$message({message: '请选择需要删除的部门', type: 'warning'});
        return;
      }

      if(c == this.branchFirst) {
        this.$message({message: '根节点不可删除', type: 'warning'});
        return;
      }

      this.$confirm(`删除后不可恢复，确认删除‘${this.currentNode.name}’？`, '提示', {type: 'warning'})
        .then(_=>{
          const url = `${URL}/${c}`;
          const success = _=>{
            this.$message({message: '删除部门成功', type: 'success'});
            this.reSet(this.branchFirst);
          }
          this.$axiosDelete({
            url, 
            success,
          })
        })
        .catch(_=>{});      
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted () {
    this.branchNext.then(_=>{
      this.$nextTick(_=>{
        this.setCurrent(this.branchFirst);
      })
    })
  },
  components: { 
    RemoteSelect,
    Branch,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>