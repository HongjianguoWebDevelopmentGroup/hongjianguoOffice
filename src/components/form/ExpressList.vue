<template>
  <div>
  	<el-row v-for="(item, index) in value" :key="index" style="margin-bottom: 5px;">
			<el-col :span="13" style="padding-right: 5px;">
				<remote-select type="project" :value="item.id"  :disabled="handleData" @input="val=>{ handleInput(val, 'id', index) }"></remote-select>
			</el-col>
			
			<el-col :span="9" style="padding: 0 5px;">
				<el-input :value="item.type.join(',')" :disabled="handleData" placeholder="使用逗号分隔" @input="val=>{ handleInput(val, 'type', index, handleType) }" ></el-input>
			</el-col>

			<el-col :span="2" style="padding-left: 5px; ">
				<el-button type="text" size="mini" @click="dataDelete(index)" v-if="typeMessage==='add'">删除</el-button>
			</el-col>
  	</el-row>
  	<el-row >
  		<el-button v-if="typeMessage==='add'"  type="text" @click="add({ 'id': '', 'type': [] })">添加文件信息</el-button>
  	</el-row>
  </div>
</template>

<script>
import Multiline from '@/mixins/multiline'
import RemoteSelect from '@/components/form/RemoteSelect'
// import PopMixins from '@/mixins/pop-mixins'
export default {
  name: 'expresssList',
  mixins: [ Multiline,],
  props: {
    'typeMessage':String,

  },
  computed:{
    handleData () {
      if(this.typeMessage==='confirm') {
        return this.btnDisabled = true;
      }
    }
  },
  data () {
    return {
      btnDisabled:false,
    }
  },
  methods: {
  	handleType (val) {
  		if(!val) {
  			return [];	
  		}

  		return val.split(',');  		
  	}
  },
  watch: {
		value (val) {
			if(val[0] && val[0]['name']) {
				let arr;
				arr = val.map(_=>{ return {id: { id: _.id, name: _.name }, type: _.type} });
				this.$nextTick(_=>{ this.$emit('input', arr); });				
			}
		}
	},
  components: { RemoteSelect },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
