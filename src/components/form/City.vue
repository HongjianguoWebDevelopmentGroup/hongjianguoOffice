<template>
  <div class="form-city">
  	  <el-cascader
  	  	placeholder="请选择省市"
  	    expand-trigger="hover"
  	    :options="options"
  	    :value=value
  	    :props="props"
        style="width: 100%;"
  	    @input="handleInput"
  	    clearable
  	   >
  	  </el-cascader>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'

export default {
  name: 'city',
  props: {
  	'value': {
  		type: Array,
  		default () {
  			return [];
  		},
  	}
  },
  data () {
  	return {
  		props: {
  			value: 'zipcode',
  			label: 'name',
  			children: 'child',
  		}
  	}
  },	
  computed: {
    ...mapGetters([
      'cityData',
    ]),
  	options () {
      let op = this.cityData;
  		
      return op.map(_=>{
        
        if(_.child && _.child.length == 0) {
          return {'name': _.name, 'zipcode': _.zipcode};  
        }
        return _;
      });
  	}
  },
  methods: {
    ...mapActions([
      'refreshCity',
    ]),
  	handleInput(val) {
  		this.$emit('input', val);
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
