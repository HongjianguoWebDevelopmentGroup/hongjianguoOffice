<template>
	<div class="app-transfer-panel">
      <p class="app-transfer-panel__header">{{ title }}</p>
      <div class="app-transfer-panel__body">
        <el-input
          :placeholder="placeholder"
          v-model="search"
          icon="search"
          size="small"
          class="app-transfer-panel__filter"
        >
        </el-input>
        <el-checkbox-group :value="value" @input="handleInput" class="el-transfer-panel__list">
        	<div class="app-transfer-panel__drag2" :data-index="0" @drop="drop" @dragover="allowDrop"></div>
        	<template v-for="(item, index) in dataShow">
	        	<div class="app-transfer-panel__drag1" :data-index="index" :key="item.key" draggable="true" @dragstart="drag" @dragend="indexCache = ''">
		          <el-checkbox 
		          	class="app-transfer-panel__item" 
		          	:label="item.value"
		          >{{ item.label }}</el-checkbox>
		        </div>
		        <div class="app-transfer-panel__drag2" :data-index="index + 1" @drop="drop" @dragover="allowDrop"></div>
	      	</template>
        </el-checkbox-group>
      </div>
      <p class="app-transfer-panel__footer">
      	<el-checkbox v-model="checkAll" :indeterminate="indeterminate" style="padding-left: 20px; color: #8391a5;">{{ `共 ${data.length} 项` }}</el-checkbox>
      </p>
    </div>
</template>

<script>
export default {
	name: 'appTransferPanel',
	props: ['title', 'placeholder', 'value', 'data'],
	data () {
		return {
			search: '',
			indexCache: '',
		}
	},
	computed: {
		dataShow () {
			const s = this.search;
			if(s) {
				return this.data.filter(_=>{
					return _.label.indexOf(s) > -1;
				})
			}else {
				return this.data;
			}
		},
		checkAll: {
			set (val) {
				if(val) {
					this.handleInput(this.data.map(_=>_.value));
				}else {
					this.handleInput([]);
				}
			},
			get () {
				
				if(this.data.length == 0) {
					return false;
				}

				if(this.value.length < this.data.length) {
					return false;
				}else {
					return true;
				}
			}
		},
		indeterminate () {
			if(this.value.length != 0 && this.value.length != this.data.length) {
				return true;
			}else {
				return false;
			}
		}
	},
	methods: {
		drag (e) {
      var img = new Image();
      e.dataTransfer.setDragImage(img,0,0);
			this.indexCache = e.target.dataset.index;
		},
		drop (e) {
			if(this.search) return;

			const start = this.indexCache - 0;
			const end = e.target.dataset.index - 0;
			const d = this.$tool.deepCopy(this.data);

			const item = d.splice(start, 1)[0];
			if(end > start) {
				d.splice(end - 1, 0, item)
			}else {
				d.splice(end, 0, item);
			}

			this.$emit('update:data', d);
		},
		allowDrop (e) {
			if(this.search) return;

			const i = e.target.dataset.index; 
			const i2 = this.indexCache;

			if(i2 && i != i2 && i - 1 != i2 ) {
				e.preventDefault();
			}
		},
		handleInput (val) {
			this.$emit("input", val);
		}
	},
} 
</script>

<style lang="scss">
$width: 200px;

.app-transfer-panel {
	text-align: left;
	border: 1px solid #d1dbe5;
  box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
  display: inline-block;
  width: $width;
  position: relative;
  background: #fff;
  vertical-align: middle;
  box-sizing: border-box;
  .app-transfer-panel__header {
    height: 36px;
    line-height: 36px;
    background: #fbfdff;
    margin: 0;
    padding-left: 20px;
    border-bottom: 1px solid #d1dbe5;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: 14px;
  }
  .app-transfer-panel__body {
    padding-bottom: 36px;
    height: 246px;
  }
  .app-transfer-panel__footer {
    height: 36px;
    line-height: 36px;
    background: #fff;
    margin: 0;
    padding: 0;
    border-top: 1px solid #d1dbe5;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }
  .app-transfer-panel__filter{
    margin-top: 10px;
    text-align: center;
    padding: 0 10px;
    width: 100%;
    box-sizing: border-box;
  }
  .app-transfer-panel__filter .el-input__icon {
    right: 10px;
  }
  .app-transfer-panel__filter .el-input__inner {
    height: 22px;
    width: 100%;
    display: inline-block;
    box-sizing: border-box;
  }
  .el-transfer-panel__list {
    margin: 0;
    padding: 6px 0;
    list-style: none;
    height: 214px;
    overflow: auto;
    box-sizing: border-box;
  }
  .app-transfer-panel__item {
    height: 32px;
    line-height: 32px;
    padding-left: 20px;
    display: block;
    margin-left: 0;
  }
  .app-transfer-panel__item:hover {
    background: #e4e8f1;
	}
  .app-transfer-panel__item .el-checkbox__input {
    position: absolute;
    top: 9px;
  }
  .el-checkbox__inner {
    width: 14px;
    height: 14px;
    border-radius: 3px;
  }
  .el-checkbox__inner::after {
    height: 6px;
    width: 3px;
    left: 4px;
  }
  .app-transfer-panel__item .el-checkbox__label {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    box-sizing: border-box;
    padding-left: 28px;
  }
  .app-transfer-panel__drag2 {
  	height: 15px;
  }
}
</style>