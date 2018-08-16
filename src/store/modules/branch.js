let url = '/api/branches';
const state = {
	data: [],
	lastUpdate: '',
	next: '',
}

const getters = {
	branchData: state=>state.data,
	branchFirst: state=>{
		const d = state.data;
		return d[0] ? d[0]['id'] : '';
	},
	branchMap: state=>{
		const map = new Map();
		a(state.data);
		return map;

		function a(arr) {
			for(let d of arr) {
				map.set(d.id, d);
				if(d.children && d.children.length) {
					a(d.children);
				}
 			}
		}
	},
	branchOptions: (state, getters)=>{
		const map = getters.branchMap;
		const arr = [...map.values()];

		return arr;
	},
	branchUpdate: (state)=>{
		const d = state.lastUpdate; 
		return d ? d : ''; 
	},
	branchNext: state=>{
		if(state.next) {
			return state.next;
		}else {
			//若next不存在,则所有操作都不执行
			return new Promise(function () {});
		}
	},
}

const mutations = {
	setBranch (state, d) {
		state.data = d.branches;
		state.lastUpdate = d.last_update;
	},
	setBranchNext (state, d) {
		state.next = d;
	}
}

const actions = {
	refreshBranch ({commit, rootState, state}, next) {
		url = rootState.status ? url.replace(/\/api/, '') : url;
		const n = rootState.axios.get(url);
		commit('setBranchNext', n);	
		n.then(response=>{
			const d = response.data;
			if(d.status){
				commit('setBranch', d);
			}else {
				// alert('请求部门数据失败');
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