    <template>
      <el-upload
      :on-success="handleUploadSuccess"
      :on-remove="handleUploadRemove"
      action="/api/files"
      :on-preview="onPreview"
      :file-list="fileList"
      :multiple="multiple"
      ref="upload"
    >           <!-- <i class="el-icon-upload"></i> -->
        <el-button size="small" type="primary">点击上传</el-button>
        <div class="el-upload__tip" slot="tip"><slot></slot></div>
    </el-upload>
    </template>

    <script>
    export default {
      name: 'upload',
      props: {
        'value': null,
        'fileList': {
            type: Array,
            default () {
              return [];
            }
        },
        'uploadText': String,
        'multiple': {
          type: Boolean,
          default: true,  
        }
      },
      data () {
        return {};
      },
      methods: {
        getFileList () {
          return this.$refs.upload.uploadFiles;
        },
        clearFiles () {
          this.$refs.upload.clearFiles();
        },
        handleUploadSuccess (p, f) {
          if(p.status) {
            const id = p.data.file.id;
            let copy;
            if(this.multiple) {
              copy = [...this.value];
              copy.push(id);
            }else {
              copy = id;
            }
            
            
            f.id = id;
            f.downloadUrl = p.data.file.downloadUrl;
            this.$emit('input', copy);

          }else {
            this.$alert(p.info);
            this.clearFiles();
          }
        },
        onPreview (file) {
            window.location.href = file.downloadUrl;
        },
        handleUploadRemove (f) {
          const id = f.id;
          const v = this.value;

          let copy;

          if(this.multiple) {
            let i = v.length;
            while(i--) {
              if(v[i] == id) break;
            }
            copy = [...v];
            copy.splice(i, 1); 
          }else {
            copy = "";
          }

          this.$emit('input', copy);

        },
      }
    }
    </script>

    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style>

    </style>
    <style scoped lang="scss">
    </style>