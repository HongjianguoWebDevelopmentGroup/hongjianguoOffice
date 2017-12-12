<template>
	<el-input placeholder="仅能输入整数..." @input="handleInput" :value="value" @change="handleChange"></el-input>
</template>
<script>
export default {
	name: 'number',
	props: ['value'],
	methods: {
		handleInput(val) {
			val = Number.parseInt(val);
			if(val) {
				this.$emit('input', val);	
			}else {
				this.$emit('input', '');
			}
		},
		handleChange() {

		}
	},
}
</script>