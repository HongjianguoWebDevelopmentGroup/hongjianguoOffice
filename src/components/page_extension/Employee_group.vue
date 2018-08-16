<template>
  <div>
    
    <div class="tree-header">
      <el-button class="tree-header-btn" icon="el-icon-plus" size="mini" title="添加角色" @click="addPop" type="primary"></el-button>
      <el-button class="tree-header-btn" icon="el-icon-edit" size="mini" title="编辑角色"  @click="editPop" type="primary" :disabled="btnDisabled"></el-button>
      <el-button class="tree-header-btn" icon="el-icon-delete" size="mini" title="删除角色" @click="groupDelete" type="primary" :disabled="btnDisabled"></el-button>
      <el-input
        placeholder="搜索..."
        v-model="filterText"
        class="tree-header-search"
        size="mini">
      </el-input>
    </div>
    
    
    <el-tree
      :data="groupInner"
      :props="props"
      highlight-current
      :expand-on-click-node="false"
      node-key="id"
      @node-click="nodeClick"
      :style="`height: ${innerHeight - 137}px; overflow: auto;border-top: 0;`"
      :filter-node-method="filterNode"
      ref="tree"
    >
    </el-tree>
    <el-dialog :visible.sync="dialogVisible" :title="popType == 'add' ? '添加角色' : '编辑角色'" class="dialog-mini" @close="name = ''">
      <div>角色名称</div>
      <el-input placeholder="请填写角色名称" style="margin-top: 10px;" v-model="name"></el-input>
      <el-button type="primary" size="small" @click="saveGroup" style="margin-top: 10px;">{{ loading ? '保存中...' : '保存' }}</el-button>
    </el-dialog>
  </div>
</template>

<script> 
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'

const URL = 'api/groups';
export default {
  name: 'employeeBranch',
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      loading: false,
      name: '',
      props: {
        label: 'name',
        children: 'children',
      },
      popProps: {
        label: 'name',
        children: 'children',
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
      btnDisabled: false,
    }
  },
  computed: {
    ...mapGetters([
      'innerHeight',
      'groupInner',
      'groupMap',
      'groupNext',
    ]),
    currentNode () {
      return this.groupMap.get(this.currentId);
    }
  },
  methods: {
    ...mapActions([
      'refreshGroup',
    ]),
    nodeClick (node) {
      this.currentId = node ? node.id : '';
      this.$emit('input', this.currentId);
    },
    setCurrent (id) {
      this.$refs.tree.setCurrentKey(id);
      this.nodeClick(this.groupMap.get(id));
      this.$emit('input', id);
    },
    reSet (id) {
      this.refreshGroup();
      this.$nextTick(_=>{
        this.groupNext.then(_=>{
          this.$nextTick(_=>{
            this.setCurrent(id);
          })
        })
      });
    },
    addPop () {
      this.popType = 'add';
      this.dialogVisible = true;
    },
    editPop () {
      if(!this.currentId) return this.$message({type: 'warning', message: '请选择需要编辑的角色'});
      this.popType = 'edit';
      this.name = this.currentNode.name;       
      this.dialogVisible = true;
    },
    saveGroup () {
      if(!this.name) return this.$message({type: 'warning', message: '角色名称不能为空'});
      let url;
      const t = this.popType;
      const data = {name: this.name};
      const success = _=>{
        this.reSet(this.currentId);
        this.$message({type: 'success', message: '保存角色成功'});
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
    },
    groupDelete () {
      if(!this.currentId) return this.$message({type: 'warning', message: '请选择需要删除的角色'});
      this.$confirm(`删除后不可恢复，确认删除“${this.currentNode.name}”？`, '提示', {type: 'warning'})
        .then(_=>{
          this.$axiosDelete({
            url: `${URL}/${this.currentId}`,
            success: _=>{
              this.reSet('');
              this.$message({type: 'success', message: '删除角色成功'});
            }
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
    currentNode(val) {
      if(val && val.default == 1) {
        this.btnDisabled = true;
      }else {
        this.btnDisabled = false;
      }
    }
  },
  mounted () {
    this.setCurrent(this.branchFirst);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>