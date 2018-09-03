import menu from '@/const/menuConst'
import {customPathMap} from '@/const/filterConfig'

const sources = menu.source;
const sourceMap = menu.map;
const types = sources.map(_ => _.key);
const customModelMap = new Map([
	['task', true],
	['proposal', true],
	['patent', true],
	['trademark', true],
	['copyright', true],
	['fee', true],
])

const state = {
	type: '',
	source: [],
	custom: [],
	customCache: {},
}

const getters = {
	noMenu: state => !state.source || state.source.length == 0,
	menuType: state => state.type ? state.type  : '',
	menuSource: state => state.source,
	customFilterData: state => {
		// console.log('----------customFilterData-------');
		const data = state.customCache[state.type];
		return data ? data : [];
	},
	menuData: (state, getters) => {
		let source = [...state.source];
		const path = customPathMap.get(state.type);
		// console.log('----------menuData--------------');
		//'我的搜索项'菜单数据
		if(path) {
			let obj = source.filter(v => v.path === path)[0];
			if(obj) {
				obj = Object.assign({}, obj);
				const children = getters.customFilterData.map(v => ({type: 'item', path: `${path}/${v.id}`, text: v.name, icon: ''}));
				obj.children = children;
				source.pop();
				source.push(obj);
			}
		}

		return source;
	},
	menuDataMap: (state, getters) => {
		let map = sourceMap;
		const path = customPathMap.get(state.type);
		// console.log('----------menuDataMap--------------');
		//'我的搜索项'面包屑索引
		if(path) {
			let obj = state.source.filter(v => v.path === path)[0];
			if(obj) {
				const customObj = {};
				getters.customFilterData.forEach(v => {
					customObj[`${path}/${v.id}`] = {type: 'item', path: `${path}/${v.id}`, text: v.name, icon: ''}; 
				});
				map = Object.assign({}, map, customObj);
			}
		}
		
		return map;		
	}
}

const mutations = {
	setMenuType (state, type) {
		// console.log('----------setMenuType-------------');
		const arr = sources.filter(v => type === v.key );
		const source = !arr[0] ? [] : arr[0]['menu'] ? arr[0]['menu'] : [];
		state.source = source;
		state.type = type;
	},
	setCustomCache (state, {type, data}) {
		// console.log('-----------setCustomCache----------');
		const cache = state.customCache;
		if(cache[type]) {
			cache[type] = data;
		}else {
			state.customCache = { ...cache, [type]: data };
		}
	},

}	

const actions = {
	getCustomFilter ({state, rootState}, {id}) {
		console.log('-----------getCustomFilter----------')
		const url = `/defineget?id=${id}`;

		const promise = rootState.axios.post(url);
		return promise;
	},
	getCustomData ({state, commit, rootState}, {type, flag}={}) {
		console.log('-----------getCustomData------------')
		if(!customModelMap.get(type)) return;
		if(state.customCache[type] && !flag) return;
		const url = `/defineget?model=${type}`;
	
		const promise = rootState.axios.post(url);
		promise
			.then(response => {
				const data = response.data;
				if(data.status) {
					commit('setCustomCache', {type, data: data.data});
				}
			})
			.catch(() => {

			})
	},
	changeMenuType ({commit, dispatch}, type = '') {
		if(types.indexOf(type) < 0) return;
		commit('setMenuType', type);
		dispatch('getCustomData', {type});
	},
	refreshCustomData ({dispatch, state}) {
		dispatch('getCustomData', {type: state.type, flag: true});
	}
}

export default {
	state,
	getters,
	mutations,
	actions,
}