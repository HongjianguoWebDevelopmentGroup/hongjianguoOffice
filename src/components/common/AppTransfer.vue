<template>
	<div class="app-transfer" style="">
		<app-transfer-panel :title="title1" :placeholder="placeholder" :data.sync="valueInner1" v-model="check1">
		</app-transfer-panel>
		<div class="app-transfer__buttons">
			<el-button icon="arrow-left" type="primary" size="small" @click="transfer('left')" :disabled="check2.length == 0"></el-button>
			<el-button icon="arrow-right" type="primary" size="small" @click="transfer('right')" :disabled="check1.length == 0"></el-button>
		</div>
		<app-transfer-panel :title="title2" :placeholder="placeholder" :data.sync="valueInner2" v-model="check2">
		</app-transfer-panel>
	</div>
</template>
<script>
import AppTransferPanel from '@/components/common/AppTransferPanel'

function renderValIn(index) {
	return {
		set (val) {
			const v = this.$tool.deepCopy(this.value);
			v[index] = val;
			this.$emit('input', v);
		},
		get () {
			const v = this.value;
			if(v[index] && v[index] instanceof Array) {
				return v[index];
			}else {
				return [];
			}
		}
	}
}

export default {
	name: 'appTransfer',
	props: {
		title1: {
			type: String,
			default: '列表1',
		},
		title2: {
			type: String,
			default: '列表2',
		},
		placeholder: {
			type: String,
			default: '请输入查询字段',
		},
		value: {
			type: Array,
			default () {
				return [[],[]];
			}
		}
	},
	data () {
		return {
			check1: [],
			check2: [],			
		};
	},
	computed: {
		valueInner1: renderValIn(0),
		valueInner2: renderValIn(1),
	},
	methods: {
		transfer (d) {
			let c = d == 'right' ? this.check1 : this.check2;
			let r = d == 'right' ? this.valueInner1 : this.valueInner2;

			const o = {};
			c.forEach(_=>{o[_] = _});

			const cache = [];
			r = this.$tool.deepCopy(r);
			let l = r.length;
			for(let i = 0; i < l; i++) {
				const v = r[i];
				if(o[v.value]) {
					cache.push(r.splice(i, 1)[0]);
					i--;
					l--;
				}
			}

			if( d == 'right' ) {
				this.check1 = [];
				this.$emit('input', [r, [...this.valueInner2, ...cache]]);
			}

			if( d == 'left' ) {
				this.check2 = [];
				this.$emit('input', [[...this.valueInner1, ...cache], r]);
			}
		},
		clear () {
			this.check1 = [];
			this.check2 = [];
		}
	},
	components: {
		AppTransferPanel,
	}
}
</script>

<style lang="scss">
.app-transfer {
  .app-transfer__buttons {
		display: inline-block;
	  vertical-align: middle;
	  padding: 0 10px;
	  
	  .el-button:first-child {
	    margin-bottom: 6px !important;
		}
		.el-button {
	    display: block;
	    margin: 0 !important;
	    padding: 8px 12px;
		}
	}
}


</style>