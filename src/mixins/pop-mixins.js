export default {
	data () {
		return {
			id: '',
      type: '',
      btn_disabled: false,
		  dialogVisible: false,
		}
	},
	computed: {
		title () {
			const t = this.type;
			const tex = this.$options.REMINDER_TEXT;

			return t == 'add' ? `新增${tex}` : t == 'confirm'? `确认收文` : `编辑${tex}`;
		}
	},
	methods: {
		show ( type='add', data ) {

  		const url = this.$options.URL;
      
        
      const setForm = _=>{
        
        this.type = type;
        this.dialogVisible = true;
        const copy = this.$tool.deepCopy(_);
        this.$nextTick(_=>{
          this.setForm ? this.setForm(copy) : this.$tool.coverObj(this.form, copy);
        });

        if(type == 'edit') {
          this.id = copy.id;
        }
      }

      if(data) {
        //发送请求获取行数据
        if(data instanceof String || typeof data == 'number') {
          this.$axiosGet({
            url: `${url}/${data}`,
            success: _=>{
              setForm(_.result);
            }
          })
        }

        //从缓存中获取行数据
        if(data instanceof Object) {
          setForm(data);
        }

      }else if(type == 'add') {
        //当data不存在时,仅能弹出添加框
        this.type = 'add';
        this.dialogVisible = true;
      }
  	},
    confirmCallback () {
      this.$message({message:'已确认收文',type:'success'});
      
      this.dialogVisible = false;  
      
    },
  	add () {
      const url = this.$options.URL;
      const tex = this.$options.REMINDER_TEXT;
      
      const data = this.addForm 
                    ? this.addForm() : this.submitForm 
                      ? this.submitForm() : this.form;
      
      const success = _=>{
        this.$message({message: `添加${tex}成功`, type: 'success'});
        
        this.dialogVisible = false;  
        
        
        this.$emit('refresh', 'add');
      }
      const complete = _=>{
        this.btn_disabled = false;
      }
      this.$refs.form.validate(_=>{
        if(_) {
          this.btn_disabled = true;
          this.$axiosPost({url, data, success, complete});
        }
      })      
    },
    edit () {
      const url = `${this.$options.URL}/${this.id}`;
      const tex = this.$options.REMINDER_TEXT;
      
      const data = this.editForm 
                    ? this.editForm() : this.submitForm 
                      ? this.submitForm() : this.form;
      
      const success = _=>{
        this.$message({message: `编辑${tex}成功`, type: 'success'});
        
        this.dialogVisible = false;
        
        this.$emit('refresh', 'edit');
      }
      const complete = _=>{
        this.btn_disabled = false;
      }

      this.$refs.form.validate(_=>{
        if(_) {
          this.btn_disabled = true;
          this.$axiosPut({url, data, success, complete});        
        }
      })
    },
    save () {
      if(this.type == 'add') {
        this.add();
      }

      if(this.type == 'edit') {
        this.edit();
      }
    },
    clear () {
      this.$refs.form.resetFields();
    }
	}
}