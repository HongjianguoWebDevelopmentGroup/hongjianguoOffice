<template>
  <div class="city-select">
    <select v-model="selectedProvince" name="province" class="select">
      <option disabled value="">请选择省</option>
      <option v-for="(item, index) in provinces"
        v-if="item.level === 1"
        :value="item"
        :key="index">
        {{ item.name }}
      </option>
    </select>

    <select v-model="selectedCity" name="city" class="select">
      <option disabled value="">请选择市</option>
      <option
        v-for="(item, index) in cities"
        :value="item"
        :key="index">
        {{ item.name }}
      </option>
    </select>
    <select v-model="selectedBlock" name="block" class="select">
      <option disabled value="">请选择区</option>
      <option
        v-for="(item, index) in blocks"
        :value="item"
        :key="index">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>
<script>
/**
 *  省 市 区/县城  三联动选择器
*/
import provinces from '@/const/provinces.js'
export default {
  name: 'app',
  created () {
  },
  watch: {
    selectedProvince (newVal, oldVal) {
      // 港澳台数据只有一级,特殊处理
      if (newVal.sheng === '71' || newVal.sheng === '81' || newVal.sheng === '82') {
        this.cities = [newVal]
        this.blocks = [newVal]
      } else {
        this.cities = this.provinces.filter(item => {
          if (item.level === 2 && item.sheng && newVal.sheng === item.sheng) {
            return true
          }
        })
      }
      var _this = this
      // 此时在渲染DOM,渲染结束之后再选中第一个
      this.$nextTick(() => {
        _this.selectedCity = _this.cities[0]
        _this.$emit('input', _this.info)
      })
    },
    selectedBlock () {
      var _this = this
      this.$nextTick(() => {
        _this.$emit('input', _this.info)
      })
    },
    selectedCity (newVal) {
      // 选择了一个市,要选择区了 di是城市的代表,sheng
      if (newVal.sheng === '71' || newVal.sheng === '81' || newVal.sheng === '82') {
        this.blocks = [newVal]
        this.cities = [newVal]
      } else {
        this.blocks = this.provinces.filter(item => {
          if (item.level === 3 && item.sheng && item.sheng === newVal.sheng && item.di === newVal.di && item.name !== '市辖区') {
            return true
          }
        })
      }
      var _this = this
      this.$nextTick(() => {
        _this.selectedBlock = _this.blocks[0]
        // 触发与 v-model相关的 input事件
        _this.$emit('input', _this.info)
      })
    }
  },
  computed: {
    info () {
      return {
        province: this.selectedProvince,
        city: this.selectedCity,
        block: this.selectedBlock
      }
    }
  },
  data () {
    return {
      selectedProvince: '',
      selectedCity: '',
      selectedBlock: '',
      cities: 0,
      provinces,
      blocks: 0
    }
  }
}
</script>

<style scoped>
  .city-select{
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
    width: 300px;
  }
  .select{
    height: 40px;
    color:#606266;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding-left: 16px;
    padding-right: 46px;
    position: relative;
  }
  .select-icon{
    display: inline-block;
    width: 40px;
    height: 48px;
    background: #f2f2f2;
    position: absolute;
    top: 0;
    right: 0;
    border: 1px solid #d7d7d7;
  }
</style>