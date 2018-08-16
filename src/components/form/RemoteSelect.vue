<template>
  <div id="select_list">
  	<el-select
  	  :value="value2"
  	  @input="handleInput"
  	  filterable
  	  remote
  	  :placeholder="PLACEHOLDER"
  	  :disabled="disabled"
  	  :remote-method="remoteMethod"
  	  :loading="loading"
      :allow-create="allowCreate"
      :default-first-option="choose.defaultFirstOption !== undefined ? choose.defaultFirstOption : false"
  	  :multiple="!single"
  	  ref="select"
  	  @visible-change="initialization"
  	>
  		<el-option
  			v-for="item in option_in"
  			:key="item.id"
  			:label="item.name"
  			:value="item.id"
  		>
  		</el-option>
  	</el-select>
  </div>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'

const map = new Map([
	['member', {
		URL: '/api/members',
		DATA_KEY: 'result',
		PLACEHOLDER: '请输入用户关键词',
	}],
	['applicant', {
		URL: '/api/applicants',
		DATA_KEY: 'result',
		PLACEHOLDER: '请输入申请人关键词',
	}],
	['inventor', {
		URL: '/api/inventors',
		DATA_KEY: 'data',
		PLACEHOLDER: '请输入发明人关键词',
	}],
	['agent', {
		URL: '/api/agents',
		DATA_KEY: 'members',
		PLACEHOLDER: '请输入代理人关键词',
	}],
	['agency', {
		URL: '/api/agencies',
		DATA_KEY: 'agencies',
		PLACEHOLDER: '请输入代理机构关键词',
	}],
	['project', {
		URL: '/api/projects',
		DATA_KEY: 'projects',
		PLACEHOLDER: '请输入案件关键词',
	}],
	['proposal', {
		URL: '/api/proposals',
		DATA_KEY: 'proposals',
		PLACEHOLDER: '请输入提案关键词',
	}],
	['patent', {
		URL: '/api/projects',
		DATA_KEY: 'projects',
		PLACEHOLDER: '请输入专利关键词',
		PARAMS: { category: 1 },
	}],
  ['trademark', {
    URL: '/api/projects',
    DATA_KEY: 'projects',
    PLACEHOLDER: '请输入商标关键词',
    PARAMS: { category: 2 },
  }],
	['copyright', {
		URL: '/api/projects',
		DATA_KEY: 'projects',
		PLACEHOLDER: '请输入版权关键词',
		PARAMS: { category: 3 },
	}],
  ['bill', {
    URL: '/api/invoices',
    DATA_KEY: 'invoices',
    PLACEHOLDER: '请输入请款单关键词',
    PARAMS: { debit: 1 },
  }],
  ['pay', {
    URL: '/api/invoices',
    DATA_KEY: 'invoices',
    PLACEHOLDER: '请输入付款单关键词',
    PARAMS: { debit: 0 },
  }],
  ['mail', {
    URL: '/api/mailAddress',
    DATA_KEY: 'list',
    PLACEHOLDER: '请输入邮箱',
    dynamicCreate: true,
    defaultFirstOption: true,
  }],
  ['client', {
    URL: '/api/clients',
    DATA_KEY: 'result',
    PLACEHOLDER: '请输入客户名称',
  }],
  ['contact', {
    URL: '/api/contacts',
    DATA_KEY: 'result',
    PLACEHOLDER: '请输入接口人名称'
  }],
  ['employee', {
    URL: '/api/employees',
    DATA_KEY: 'result',
    PLACEHOLDER: '请输入内部人员名称',
  }]
]);

export default {
  name: 'remoteSelect',
  mixins: [ AxiosMixins ],
  props: {
    'value': [Number, String, Array, Object],
    'disabled': {
      type: Boolean,
      default: false,
    },
    'multiple': {
      type: Boolean,
      default: false,
    },
  	'type': [String, Object],
    'para': {
      type: Object,
      default () {return {}},
    },
    'single': {
      type: Boolean,
      default: false,
    },
    'staticMap': {
      type: Array,
      default () { return [] },
    }
  },
  data () {
  	return {
      options: [],
      loading: false, 
  		selected: [],
  		static_map: [],
      initializationFlag: false,
  	};
  },
  methods: {
    handleInput (val) {
      if(!this.multiple && !this.single) {
        let v = '';
        if(val[0] && val[1]) {
          v = val[1];
        }
        if(val[0] && !val[1]) {
          v = val[0];
        }
        this.$emit('input', v);  
      }else {
        this.$emit('input', val);
      }
    },
  	initialization () {
      if(!this.initializationFlag) {
        this.initializationFlag = true;
        this.remoteMethod('');
      }
  	},	
  	getSelected () {
  		return this.selected;
  	},
    refreshSelected (val) {
      val = this.single ? [val] : val;

      if(this.staticMap.length > 0) {
        this.static_map = this.staticMap;
      }

      if( val[0] && val[0] instanceof Object ) {
        
        this.static_map = val;
        const arr = val.map(_=>_.id);
        if(this.multiple) {
          this.$emit('input', arr);
        }else {
          this.$emit('input', arr[0])
        }

      }else {
        //selected通过map映射
        const arr = [];
        val.forEach(_=>{
          //在map中搜索, 若不存在，则自定义
          const v = this.map.get(_);
          
          if(v) {
            arr.push(v);
          }else {
            arr.push({id: _, name: _}); 
          }
        });

        this.selected = arr;
      }
    },
    remoteMethod (keyword) {
     
      const s = { keyword, listOnly: '1' };
      const os = this.PARAMS;
      const key = this.DATA_KEY;
      const url = this.URL;
      const data = Object.assign({}, s, os);
      const success = _=>{
        this.loading = false;
        _[key] = _[key].map(_=>{
          if(!_.name) _.name = _.label;
          if(!_.id) _.id = _.value;
          return _;
        });
        this.options = _[key];
      }

      this.loading = true;
      this.axiosGet({url, data, success});
    },
    clear (flag = true) {
      this.selected = [];
      this.static_map = [];
      this.multiple ? this.$emit('input', []) : this.$emit('input', '');
      if(flag) {
        this.remoteMethod(''); 
        
      }
    }
  },
  computed: {
  	choose () {
  		if(typeof this.type == 'string') {
  			return map.get(this.type);	
  		}else {
  			return this.type;
  		}		
  	},
    allowCreate () {


      if(this.choose.allowCreate) {
        return true;
      }


      if(this.choose.dynamicCreate && this.options.length == 0) {
        return true;
      }

      return false;
    },  
  	URL () {
  		return this.choose.URL;
  	},
  	DATA_KEY () {
  		return this.choose.DATA_KEY;
  	},
  	PLACEHOLDER () {
  		return this.choose.PLACEHOLDER;
  	},
  	PARAMS () {
      let obj = {};

      if(this.para) {
        Object.assign(obj, this.para);
      }
      if(this.choose.PARAMS) {
        Object.assign(obj, this.choose.PARAMS);
      }

  		return obj;
  	},
  	option_in () {
  		//由于一部分的val可能是通过object传入,单纯的options只含有动态部分
  		//所以取select_map和options的并集,取得selected的静态部分选项
  		const arr = [ ...this.static_map, ...this.options ];
      // console.log(this.selected, this.options, arr);
  		// console.log(arr);
  		return this.$tool.singleObject(arr,'id');
  	},
  	map () {
  		//map分为静态和动态俩部分，静态部分由value类型为Object时提供，之后将value转换为数值类型
  		const map = new Map();
  		this.static_map.forEach(_=>map.set(_.id, _));
  		this.options.forEach(_=>map.set(_.id, _));
  		return map;
  	},
    value2 () {
      // console.log(this.value);
      if(!this.multiple && !this.single) {
        // console.log(this.value == "" || (this.value instanceof Object && this.$tool.getObjLength(this.value) == 0 ) ? [] : [ this.value ]);
        return this.value == "" || (this.value instanceof Object && this.$tool.getObjLength(this.value) == 0 ) ? [] : [ this.value ];
      }else {
        return this.value;
      }
    }
  },
  watch: {
  	value2 (val) {
      // console.log('-------------val');
      // console.log(val);
      // console.log('-------------val');
      //value类型为对象时，添加静态映射，并将其值转为id
      if( !this.single ) {
      // if( !this.multiple && !this.single && this.$refs.select) {
        this.$refs.select.visible = false;
      }
      
      this.refreshSelected(val);   
  	},
    para () {
      this.initializationFlag = false; //重置初始化标记
    }
  },
  created () {
    this.refreshSelected(this.value2);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
<style>
  /*#select_list .el-select__tags{
    min-width: 260px !important;
  }
  #select_list .el-select .el-input__inner {
    height: 37px !important;
  }
  #select_list .el-select .el-tag {
    margin: 0 0 0 3px; 
  }*/
</style>