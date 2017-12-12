<template>
  <div>
  	<el-row v-for="(item,index) in value" :key="index" style="margin-bottom: 5px">
  		<el-col :span="10" style="padding-right: 5px">
  			<el-input :value="item.title" @input="val=>{ handleInput(val, 'title', index) }" placeholder="专利名称"></el-input>
  		</el-col>
  		<el-col :span="6" style="padding: 0 5px">
  			<static-select type="area" :value="item.area" @input="val=>{ handleInput(val, 'area', index) }"></static-select>
  		</el-col>
  		<el-col :span="6" style="padding: 0 5px">
  			<static-select type="patent_type" :value="item.type" @input="val=>{ handleInput(val, 'type', index) }"></static-select>
  		</el-col>
  		<el-col :span="2" style="padding-left: 5px">
  			<el-button type="text" size="mini" @click="dataDelete(index)">删除</el-button>
  		</el-col>
		</el-row>
		<el-button type="text" @click="add({'title': '', 'type': 1, 'area': 'CN'})">添加专利</el-button>
  </div>
</template>
<script>
import Multiline from '@/mixins/multiline'
import StaticSelect from '@/components/form/StaticSelect'
export default {
	name: 'AddPatent',
	mixins: [ Multiline ],
	components: {
		StaticSelect,
	}
}
</script>