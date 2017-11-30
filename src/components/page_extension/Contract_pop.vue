<template>
  <el-dialog :key="popType" :title="dialogTitle" :visible.sync="dialogVisible" @close="close">
    <el-form :model="form" label-width="100px" ref="form" :rules="rules">

      <el-form-item label="合同编号" prop="number">
        <el-input v-model="form.number" ></el-input>
      </el-form-item>
      <el-form-item label="相关客户" prop="customer" >
        <el-input v-model="form.customer" ></el-input>
      </el-form-item>
      <el-form-item label="签订日期" prop="date">
      <el-date-picker
        v-model="form.date"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
      </el-form-item>      
      <el-form-item label="分所" prop="agency">
        <el-input  v-model="form.agency"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item label="扫描件" prop="file">
        <el-input  v-model="form.file"></el-input>
      </el-form-item>
      <el-form-item style="margin-bottom: 0;">
        <el-button type="primary" @click="add" v-if="popType == 'add'">确定</el-button>
        <el-button type="primary" @click="edit" v-if="popType == 'edit'">编辑</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import PopMixins from '@/mixins/pop-mixins'
import RemoteSelect from '@/components/form/RemoteSelect'
import StaticSelect from '@/components/form/StaticSelect'
import City from '@/components/form/City'


export default {
  name: 'userListPop',
  mixins: [ AxiosMixins,PopMixins ],
  props: {
    'popType': {
      type: String, 
      default: 'add',
    },
  },
  data () {
    return {
      form: {
        number: '',
        customer: '',
        date: '',
        agency: '',
        remark: '',
        file: '',
      },
      'rules': {
        'number': { required: true, message: '合同不能为空', trigger: 'blur'},
        'customer': { required: true, message: '相关客户不能为空', trigger: 'blur'},
        'date': { required: true, message: '签订日期不能为空', trigger: 'blur'},
        'agency': { required: true, message: '分所不能为空', trigger: 'blur'},
        'file': { required: true, message: '扫描件不能为空', trigger: 'blur'},
        'remark': { min: 1, max: 50, message: '长度不超过50个字符', trigger: 'blur'},
      },
      dialogVisible: false,
      editPsd: false,
    }
  },
  computed: {
    dialogTitle () {
      return this.popType == 'add' ? '添加合同' : '编辑合同';
    },
  },
  methods: {
    close () {
      if(this.$refs.psd) {
        this.$refs.psd.clearEditPsd();
      }
    }
  },
  components: { 
    RemoteSelect,
    StaticSelect,
    City,
  },
  URL: '/api/contracts'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
