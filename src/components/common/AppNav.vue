<template>
<el-menu theme="dark" :default-active="menuType"  text-color="#bfcbd9" active-text-color="#20a0ff" class="app-nav" mode="horizontal" @select="handleSelect">
	<el-menu-item v-for="(item, index) in source" :index="item.key" :key="item.key" v-show="itemShow(index)">{{ item.text }}</el-menu-item>
  <el-submenu index="show_more" v-show="moreShow">
    <template slot="title">更多</template>
    <el-menu-item v-for="(item, index) in source" :index="item.key" :key="item.key" v-show="!itemShow(index)">{{ item.text }}</el-menu-item>
  </el-submenu>
</el-menu>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
import menu from '@/const/menuConst'

const RESERVED_WIDTH = 460; //预留宽度

export default{
	name: 'appNav',
	data () {
		return {
			hideMap: new Map(),
			source: [],

		}
	},
	computed: {
		...mapGetters([
			'windowWidth',
			'menusMap',
		]),
		path () {
			return this.$route.path;
		},
		menuType: {
			get () {
				const parentPath = `/${this.path.split('/')[1]}`;
				const arr = this.source.filter(v => parentPath === v.path);
				return arr[0] && arr[0]['key'] ? arr[0]['key'] : '';	
			},
			set (val) {
				const arr = this.source.filter(v =>val === v.key);
				const showChildrenMenu= arr[0].menu
				// .filter(d=>!this.menusMap.get(d.path));
				if(showChildrenMenu[0] && showChildrenMenu[0]['path']) {
					if(showChildrenMenu[0]['children'] && showChildrenMenu[0]['children'][0]['path']){
						return	this.$router.push(showChildrenMenu[0]['children'][0]['path']);
					}
						this.$router.push(showChildrenMenu[0]['path']);
				}
			}
		},
		maxWidth () {
			const w = this.windowWidth - RESERVED_WIDTH; 
			return w ? w : 0;
		},
		moreShow () {
			return this.hideMap.size == 0 ? false : true;
		},
		// hideSource () {
		// 	return [...this.hideMap.keys()].map(_ => this.source[_]);
		// }
	},
	methods: {
		...mapActions([
			'changeMenuType',
		]),
		itemShow (index) {
			return !this.hideMap.get(index);
		},
		handleSelect (key) {
			this.menuType = key;
		},
		refreshNav () {
			const arr = [];
			const map = new Map();
			$(this.$el).children('li').each((i, e) => { 
				arr.push(Math.ceil($(e).innerWidth())); 
			});
			const showWidth = arr.pop();
			let width = 0;
			const maxWidth = this.maxWidth - showWidth;
			arr.forEach((v, i) => {
				width += v;
				if(width > maxWidth) {
					map.set(i, true);
				} 
			})
			this.hideMap = map;
		},
	},
	created () {
		this.source = menu.source;
		// .filter((v) => {
		// 	const  menuVisible = v.menu.every((i)=>{
		// 		return this.menusMap.get(i.path);	
		// 	})
		// 	if(menuVisible && menuVisible !== undefined){
		// 		console.log('aaa');
		// 		return !v.path;
		// 	}else {
		// 		console.log('bbb');
		// 		return !this.menusMap.get(v.path);
		// 	}
		// });
	},
	mounted () {
		this.refreshNav();
	},
	watch: {
		windowWidth () {
			this.refreshNav();
		},
		menuType (val, val2) {
			this.changeMenuType(this.menuType);
		}
	}
}
</script>

<style lang="scss">
#app .app-nav {
	background-color: transparent;
	>.el-menu-item,.el-submenu__title {
		height: 50px;
		line-height: 50px;
	}
	>.el-menu-item:hover,.el-submenu__title:hover{
		background-color: transparent;
	}
	>.el-menu-item.is-active{
		background-color: transparent;
	}
}
</style>