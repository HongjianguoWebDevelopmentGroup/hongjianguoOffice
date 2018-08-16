let url = '/api/groups';
const state = {
	data: [],
	next: '',
}

const getters = {
	groupData: state=>state.data,
	groupMap: state=>{
		const map = new Map();

		if(state.data) {			
			for(let d of state.data) {
				map.set(d.id, d);
			}
		}

		return map;
	},
	groupInner: state=>{
		return state.data.filter(_=>_.inner == 1 ? true : false);
	},
	//一些与角色相关的页面初始化操作,通过Proxy去调用,避免异步报错
	groupNext: state=>{
		if(state.next) {
			return state.next;
		}else {
			//若next不存在,则所有操作都不执行
			return new Promise(function () {});
		}
	},
}

const mutations = {
	setGroup (state, d) {
		state.data = d;
	},
	setGroupNext (state, d) {
		state.next = d;
	}
}

const actions = {
	refreshGroup ({commit, rootState}, next) {
		url = rootState.status ? url.replace(/\/api/, '') : url;
		const n = rootState.axios.get(url);
		commit('setGroupNext', n);
		n.then(response=>{
				const d = response.data;
				if(d.status){
					commit('setGroup', d.groups);
				}else {
					console.log(d);
				}
			})
			.catch(error=>{console.log(error)});

		if(next) {
			next(n);
		}
	}
}

export default {
	state,
	getters,
	mutations,
	actions,
}