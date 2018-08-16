<template>
  <el-dialog  :title="title" :visible.sync="dialogVisible" @close="close">
    <el-form :key="popType" :model="form" label-width="100px" ref="form" :rules="rules">

      <el-form-item label="合同编号" prop="number">
        <el-input v-model="form.number"  placeholder="请填写合同编号"></el-input>
      </el-form-item>
      <el-form-item label="相关客户" prop="client" >
        <remote-select type="client" v-model="form.client"></remote-select>
      </el-form-item>
      <el-form-item label="签订日期" prop="date">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>      
      <el-form-item label="部门" prop="branch">
        <branch type="branch"  v-model="form.branch"></branch>
      </el-form-item>
      <el-form-item label="扫描件" prop="file">
        <upload :multiple="false" v-model="form.file" :file-list="fileList"></upload>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="form.remark" placeholder="请填写备注信息"></el-input>
      </el-form-item>
      <el-form-item style="margin-bottom: 0;">
        <el-button type="primary" @click="save" size="small" :loading="btn_disabled">{{ btn_disabled ? '保存中...' : '保存' }}</el-button>
        <el-button type="danger" @click="dialogVisible = false" size="small" :disabled="btn_disabled">取消</el-button>
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
import Upload from '@/components/form/Upload'
import Branch from '@/components/form/Branch'

export default {
  name: 'contractListPop',
  mixins: [ PopMixins ],
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
        client: '',
        date: '',
        branch: '',
        remark: '',
        file: '',
      },
      'rules': {
        'number': { required: true, message: '合同不能为空', trigger: 'blur'},
        'client': { required: true, message: '相关客户不能为空', trigger: 'change'},
        'date': { type: 'date', required: true, message: '签订日期不能为空', trigger: 'change'},
        'branch': { required: true, message: '部门不能为空', trigger: 'change'},
        'file': { required: true, message: '扫描件不能为空', trigger: 'change'},
        'remark': { max: 50, message: '长度不超过50个字符', trigger: 'blur'},
      },
      dialogVisible: false,
      editPsd: false,
      fileList: [],
    }
  },
  computed: {},
  methods: {
    setForm (data) {
      data['date'] = new Date(data['date']);
      this.$tool.coverObj(this.form, data, {skip: ['file'], obj: ['branch']});
      if(data.file) {
        this.form.file = data.file.id;
        this.fileList = [data.file];
      } 
    },
    submitForm () {
      return this.$tool.shallowCopy(this.form, {date: true});
    },
    close () {
      this.clear();
      this.fileList = [];
    },
    save () {
      if(this.type == 'add') {
        this.add();
      }
      if(this.type == 'edit') {
        this.edit();
      }
    }
  },
  components: { 
    RemoteSelect,
    StaticSelect,
    City,
    Upload,
    Branch,
  },
  URL: '/api/contracts',
  REMINDER_TEXT: '合同',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
