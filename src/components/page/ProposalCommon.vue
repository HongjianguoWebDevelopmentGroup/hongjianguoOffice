 <template>
  	<div class="main">
  		<el-row>
	  		<el-col :span="18">
		  		<el-form label-width="92px" :rules="formRules" :model="formData" ref="form">
            
            <el-form-item label="提案人">{{ proposer_name }}</el-form-item>
            
            <el-form-item label="案件名称" prop="title">
              <el-input v-model="formData.title" placeholder="请输入案件名称"></el-input>
            </el-form-item>

            <el-form-item label="提案简介" prop="abstract" class="is-required">
              
              <el-input type="textarea" v-model="formData.abstract" placeholder="请输入案件摘要"></el-input>
            </el-form-item>
            
            <el-form-item label="发明人" prop="inventors" class="is-required">
              <inventors v-model="formData.inventors"></inventors>
            </el-form-item>

            <el-form-item label="证件号码(第一发明人)" prop="identity" class="is-required">
              <el-input v-model="formData.identity" placeholder="请填写第一发明人证件号码"></el-input>
            </el-form-item>

            <el-form-item label="技术分类" prop="classification">
              <classification v-model="formData.classification"></classification>
            </el-form-item>
            <el-form-item label="产品名称" prop="products">
              <product v-model="formData.products" multiple></product>
            </el-form-item>
						<el-form-item label="标签" prop="tags">
							<static-select type='tag' v-model="formData.tags" multiple></static-select>
						</el-form-item>
						<el-form-item label="附件" prop="attachments" class="is-required">
               <upload v-model="formData.attachments" :file-list="attachments" ref="upload"></upload>
						</el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="formData.remark"></el-input>
            </el-form-item>

						<el-form-item>
						   <el-button @click="submit" type="primary" :disabled="btn_disabled">提交</el-button>
               <el-button @click="save()" :disabled="btn_disabled">暂存</el-button>
						   <el-button @click="cancel" :disabled="btn_disabled">取消</el-button>
						</el-form-item>

			  	</el-form>
		  	</el-col>
		  	<el-col :span="6" style="padding-left: 40px;">

            <h3 style="margin-top: 40px;">提案模板</h3>
            <ul class="proposal-model">
              <li><i class="iconfont icon-docx"></i><a href="/files/1">交底书模板-结构.doc</a></li>
              <li><i class="iconfont icon-docx"></i><a href="/files/2">交底书模板-硬件.doc</a></li>
              <li><i class="iconfont icon-docx"></i><a href="/files/3">交底书-软件类.doc</a></li>
              <!-- <li><i class="iconfont icon-docx"></i><a href="javascript:void(0)">技术交底书范例(软件类).doc</a></li>
              <li><i class="iconfont icon-ppt"></i><a href="javascript:void(0)">15分钟如何写一个专利底稿.pptx</a></li> -->
            </ul>

		  	</el-col>
	  	</el-row>
      <el-dialog title="提交任务" :visible.sync="dialogVisible">
        <task-finish 
           
          :id="update_id"          
          @submitSuccess="handleSubmitSuccess"
          @cancel="dialogVisible=false"
          ref="task"
        >
        </task-finish>
      </el-dialog>
  	</div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import PopTree from '@/components/common/PopTree'
import PcSubmit from '@/components/page_extension/ProposalCommon_submit'
import Classification from '@/components/form/Classification'
import Product from '@/components/form/Product'
import Inventors from '@/components/form/Inventors'
import Proposer from '@/components/form/Proposer'
import Member from '@/components/form/Member'
import Upload from '@/components/form/Upload'
import TaskFinish from '@/components/common/TaskFinish'
import StaticSelect from '@/components/form/StaticSelect'
import { checkInventors } from '@/const/validator.js'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'


const typeMap = new Map([['/proposal/add', 'add'], ['/proposal/edit', 'edit'], ['/proposal/detail', 'detail']]);
const URL = '/api/proposals';


//https://jsonplaceholder.typicode.com/posts/
export default {
  name: 'proposalCommon',
  methods: {
    ...mapActions([
      'refreshUser',
    ]),
    handleSubmitSuccess () {
      this.$router.push('/proposal/list');
    },
    handleAddSuccess (data) {
      this.pageType = 'edit';
      this.id = data.proposal_id;
      this.refreshUser();
    },
    save ( callback=_=>{this.$message({message: '保存成功', type: 'success'});}, required=false, showWarning=true ) {
      
      if(!this.$refs.form) return;

      if(this.pageType == 'add' && !this.formData.proposer) {
        this.formData.proposer = this.userid;
      }

      this.$refs.form.validate(valid=>{
        
        if(valid) {

          //是否关闭后台完整性验证
          let temp = {temp: 1};

          //在调用提交接口前,进行字段完整性检测
          if(required) {
            if(this.formData.abstract == '') {
              this.$message({message: '请填写提案简介', type: 'warning'});
              return;
            }
            if(this.formData.inventors.length == 0) {
              this.$message({message: '请填写发明人', type: 'warning'});
              return;
            }
            if(this.formData.identity == 0) {
              this.$message({message: '请填写第一发明人的证件号码', type: 'warning'});
              return;
            }
            if(this.formData.attachments.length == 0) {
              this.$message({message: '请添加附件', type: 'warning'});
              return;
            }
            temp = {};
          }

          this.btn_disabled = true;
          const flag = this.pageType == 'add';
          const url = flag ? URL : `${URL}/${this.id}`;
          const success = _=>{
            
            //新建提案后更改当前的页面状态
            if(this.pageType == 'add') {
              this.handleAddSuccess(_);
            }

            callback(_);
          };

          const data = Object.assign({}, this.formData, temp);
          const complete = _=>{ this.btn_disabled = false };
          flag ? this.$axiosPost({url, data, success, complete}) : this.$axiosPut({url, data, success, complete});
        }else {
          if(showWarning) {
            this.$message({message: '请正确填写提案字段', type: 'warning'});  
          }
        }
      });         
    },
    submit () {      
      this.save(d=>{
          
          this.update_id = d.task_id;
          this.dialogVisible = true;//触发组件内部的created和mounted函数,因为id不会变化,理论上只会触发一次任务完成面板请求

          // //这里调用为提案编写的任务完成接口，主要目的是填充当前备注与附件
          const remark = this.formData.remark;
          const attachments = this.$refs.upload.getFileList();
          // console.log(remark, attachments);
          this.$nextTick(_=>{
            this.$refs.task.proposalFinish({remark, attachments});  
          });

      },true);        
    },
    cancel () {
      this.$router.push('/proposal/list');
    },
    refreshCommon () {
      const t = this.pageType;
      
      if( t== 'edit' ) {
        const id = this.$route.query.id;
        this.id = id;
        
        this.$store.commit('onLoading');
        this.$axios.get(`${URL}/${id}`).then(response=>{
          this.$store.commit('cancelLoading');
          const data = response.data.proposal;
          const { inventors, proposer, classification, products, attachments } = data;
           
          data.inventors = inventors.map((d)=>{return {id: d.id, share: d.share, name: d.name}});
          data.proposer = proposer.id;
          this.proposer_name = proposer.name;
          
          if(classification) {
            data.classification = classification.id;
            this.classificationText = classification.name;
          }

          if(products.length != 0) {
            const {name, id} = this.$tool.splitObj(products, ['name', 'id']);
            data.products = id;
            this.productText = name.join('；');
          }

          if( attachments.length != 0) {
            this.attachments = attachments;
            data.attachments = attachments.map(d=>d.id);
          }
          
          this.$tool.coverObj(this.formData, data);
        });
      }else {
        this.proposer_name = this.username;
        if(this.userid && this.username) {
          this.formData.inventors = [{ id: this.userid, name: this.username, share: '100', identity: this.useridentity }];  
        }        
      }
    }
  },
  data () {
    return {
      id: '',
      status: 0,
      pageType: '',
      tasks: [],
      patent: [],
      formData:  { 
        title: '',
        abstract: '',
        proposer: '',
        remark: '',
        inventors: [],
        tags: [],
        attachments: [],
        classification: '',
        products: [],
        identity: '',
      },
      timeInterval: '',
      attachments: [],
      create_time: '',
      update_time: '',
      proposer_name: '',
      formRules: {
      	'title': [
          {required: true, message: '案件名称不能为空'},
          {pattern: /^[^~!@#$%^&*]+$/, message: '案件名不能包含非法字符', trigger: 'blur'},
          {max: 150, message: '长度不能超过150个字符', trigger: 'blur' }
      	],
        'abstract': [
          {max: 1000, message: '长度不能超过1000个字符', trigger: 'blur' }  
        ],
        'inventors': { 
          type: 'array',
          trigger: 'change', 
          validator: (a,b,c)=>{

            //这里没有使用插件的传入值,是因为在监测输入框输入事件时,值未正常更新
            //WTF 不知道什么鬼,手动传入咯
            this.$nextTick(_=>{
              checkInventors(a, this.formData.inventors, c);
            })

          },
        },
        'identity': {pattern:  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '证件号码格式错误'},   	
      },
      tableOption: {
        'is_search': false,
        'is_pagination': false,
        'is_border': false,
        'columns': [
          { type: 'text', label: '附件名称', prop: 'name' },
          { type: 'text', label: '附件格式', prop: 'ext' },
          { type: 'text', label: '附件大小 ', prop: 'size' },
          { 
            type: 'action', 
            label: '详情',
            btns: [
              {type: 'view', click: ({viewUrl})=>{window.open(viewUrl)}},
              {type: 'download', click: ({downloadUrl})=>{window.location.href = downloadUrl}},
            ],
          }
        ]
      },
      classificationText: '',
      productText: '',
      props: {
        label: 'name',
        children: 'children',
      },
      btn_disabled: false,
      dialogVisible: false,
      update_id: '',
    }
  },
  created () {
    this.pageType = typeMap.get(this.$route.path);    
  },
  mounted () {
    this.refreshCommon();

    //这里开一个30秒的线程用于自动保存已有提案
    const s = _=>{
      
      if( this.btn_disabled && this.formData.title == '') return;
      this.save(_=>{}, false, false);
      //验证未通过,不发送
      // this.$refs.form.validate(valid=>{
      //   if(valid) {
      //     const data = Object.assign({}, this.formData, {temp: 1});
      //     if(this.pageType == 'edit') {
      //       this.$axiosPut({ url: `${URL}/${this.id}`, data });
      //     }else if(this.pageType == 'add') {
      //       this.$axiosPost({ url: URL, data, success: this.handleAddSuccess });
      //     }
      //   }
      // })
    }
    this.timeInterval = window.setInterval(s, 30000);

  },
  destroyed () {
    window.clearInterval(this.timeInterval);
  },
  computed: {
    ...mapGetters([
      'username',
      'userid',
      'useridentity',
    ]),
    tagOptions () {
      return this.$store.getters.tagOptions;
    },
    attachmentsData () {
      const d = this.attachments;
      return { total: d.length, data: d };
    },
    classificationData () {
      return this.$store.getters.classificationData;
    },
    productData () {
      return this.$store.getters.productData;
    }
  },
  watch: {
    userid () {
      this.refreshCommon();
    },
    'formData.inventors': {
      handler(val) {
        if(val[0] && val[0]['identity']) {
          this.formData.identity = val[0]['identity'];
        }
      }
    }
  },
  components: { 
    PopTree, 
    TableComponent, 
    Inventors, 
    PcSubmit, 
    Upload, 
    Member, 
    Classification, 
    Product, 
    TaskFinish, 
    StaticSelect 
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@mixin fileicon {
  position: relative;
  top: 3px;
  margin-right: 7px;
}
.proposal-model {
  list-style-type: decimal
}
.proposal-model li {
  font-size: 13px;
    color: #8391a5;

    margin-top: 7px;
}
.proposal-model li a {
      text-decoration: none;
    color: #8391a5;
}
.proposal-model li a:hover {
  color: #58B7FF;
}
.icon-docx {
  color: #386caf;
  @include fileicon;
}
.icon-ppt {
  color: #e9573f;
  @include fileicon;
}

</style>
