<template>
  <el-switch
    :value="value"
    @input="handleInput"

    :active-color="config.onColor"
    :inactive-color="config.offColor"
    :active-text="config.onText"
    :inactive-text="config.offText"
    :active-value="config.onValue"
    :inactive-value="config.offValue"
  >
  </el-switch>
</template>

<script>
const config = [
	['status', {
		onColor: '#13ce66',
		offColor: '#ff4949',
		onText: '启用',
		offText: '禁用',
		onValue: 1,
		offValue: 0,
	}],
	['is', {
		onColor: '#13ce66',
		offColor: '#ff4949',
		onText: '是',
		offText: '否',
		onValue: 1,
		offValue: 0,
	}]
];
const map = new Map(config);

export default {
  name: 'appSwitch',
  props: [ 'value', 'type' ],
 	computed: {
 		config () {
 			const config = map.get(this.type);
 			return config ? config : this.type;
 		}
 	},
 	methods: {
 		handleInput(val) {
 			this.$emit('input', val);
 		}
 	} 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>