<template>
  <div class="main">
  	<el-form :model="form" ref="form" label-width="80px">
  		<el-form-item label="收件人" prop="to">
				<remote-select type="mail" v-model="form.to" ref="to" multiple></remote-select>
  		</el-form-item>
  		<el-form-item label="抄送" prop="cc">
  			<remote-select type="mail" v-model="form.cc" ref="cc" multiple></remote-select>
  		</el-form-item>
  		<el-form-item label="密送" prop="bcc">
				<remote-select type="mail" v-model="form.bcc" ref="bcc" multiple></remote-select>
  		</el-form-item>
  		<el-form-item label="主题" prop="subject">
  			<el-input v-model="form.subject" placeholder="请输入邮件主题"></el-input>
  		</el-form-item>
  		<el-form-item label="附件" prop="attachments">
  			<upload v-model="form.attachments" :file-list="attachments"></upload>
  		</el-form-item>
  		<el-form-item label="正文" prop="to">
  			<quill-editor 
					v-model="form.body"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"	
        >
  			</quill-editor>
  		</el-form-item>
  		<el-form-item>
  			<el-button type="primary" icon="message" @click="send" :disabled="btn_disabled">发送</el-button>
  			<el-button type="primary" icon="document" @click="save" :disabled="btn_disabled">保存</el-button>
  			<el-button type="danger" @click="back" :disabled="btn_disabled">返回</el-button>
  		</el-form-item>
  	</el-form>
  </div>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import Upload from '@/components/form/Upload'
import RemoteSelect from '@/components/form/RemoteSelect'

const URL = '/api/mails';

export default {
  name: 'mailAdd',
  mixins: [ AxiosMixins ],
  data () {
		return {
			'id': '',
			'form':{

				subject: '',
				to: [],
				cc: [],
				bcc: [],
				body: '',
				attachments: [], 
			},
			attachments: [],
			'editorOption': {
				modules: {
         //  toolbar: [
         //   	[{ 'header': [] }],          	
         //    [{ 'size': [] }],
         //    ['bold', 'italic'],
         //    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
         //    ['image']
         //  ],
	        // history: {
	        //   delay: 1000,
	        //   maxStack: 50,
	        //   userOnly: false
	        // },
	        // imageImport: true,
	        // imageResize: {
	        //   displaySize: true
	        // }         
        }
			},
			btn_disabled: false,
		}	  
	},
	methods: {
		send () {
			const url = URL;
			
			

			const data = Object.assign({}, this.form, {mailbox: 2}, this.getMailForm());
			
			const success = _=>{
				this.$message({message: '发送成功', type: 'success'});
				this.back();
			}
			const complete = _=>{ this.btn_disabled = false };

			this.axiosPost({url, data, success, complete});
		},
		save () {
			const data = Object.assign({}, this.form, {mailbox: 0}, this.getMailForm());

			const success = _=>{
				this.$message({message: '保存成功', type: 'success'});
				this.$router.push('/news/mailList');
			}
			const complete = _=>{ this.btn_disabled = false };

			this.btn_disabled = true;
			if(this.type == 'add') {
				const url = URL;
				this.axiosPost({url, data, success, complete});	
			}else {
				const url = `${URL}/ ${this.id}`;
				this.axiosPut({url, data, success, complete});
			}
		},
		back () {
			this.$router.push('/news/mailList');
		},
		onEditorBlur () {

		},
		onEditorFocus () {

		},
		onEditorReady () {

		},
		getMailForm () {
			const mail_arr = ['to', 'cc', 'bcc'];
			const mail_form = {};
			
			mail_arr.forEach(_=>{

				let selected = this.$refs[_].getSelected();
				
				selected = selected.map(d=>{
					if( !d['value'] ) {
						return {value: d['id'], label: d['name']};
					}else {
						return d;
					}
				})

				mail_form[_] = selected;
			});

			return mail_form;
		}
	},
	computed: {
		type () {
			return this.$route.meta.type;
		},
		from () {
			const email = this.$store.getters.getUser.email;

			return { 'from': { label: email, value: email } };
		},
	},
	created () {

		if(this.type == 'edit') {
			const id = this.$route.query.id;
			const url = `${URL}/${id}`;
			const mail_arr = {'to': true, 'cc': true, 'bcc': true};
			const success = _=>{
				const data = _.mail;
				for(let k in this.form) {
					let d = data[k];
					if(k == 'attachments') {
						this.attachments = d;
						this.form[k] = d.map(_=>_.id);
					}else if(mail_arr[k]) {
						if(d && d[0] && !d[0].id) {
							d = d.map(_=>{
								return {id: _.value, name: _.label};
							});
						}
						this.form[k] = d ? d : this.form[k];
					}else {
						this.form[k] = d ? d : this.form[k];
					}
				}
				this.id = id;
			}
			const complete = _=>{ this.$store.commit('cancelLoading') };

			this.$store.commit('onLoading');
			this.axiosGet({url, success, complete});
		}
	},
	components: { 
		Upload, 
		RemoteSelect, 
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>