const keys = new Map([
	['patent', 'patent'],
	['copyright', 'Copyright'],
	['trademark', 'trademark'],
	// ['applicant', 'applicant'],
]);

const state = {
	id:'',
	type: '',
	true_type: '',
	data: null,
	loading: false,
}

const getters = {
  detail_type: state=>state.type,
  detailBase: state=>state.data ? state.data : {},
  detailBasePatent: state=>{
  	if(state.true_type == 'patent') {
  		return state.data; 
  	}else {
  		return null;
  	}
  },
  detailBaseCopyright: state=>{
  	if(state.true_type == 'copyright') {
  		return state.data; 
  	}else {
  		return null;
  	}
  },
  detailBaseTrademark: state=>{
  	if(state.true_type == 'trademark') {
  		return state.data;
  	}else {
  		return null;
  	}
  },
//   detailBaseApplicant: state=>{
// 	if(state.true_type == 'applicant') {
// 		return state.data;
// 	}else {
// 		return null;
// 	}
// },
  detailTasks: state=>state.data ? state.data.tasks : [],
  detailNotices: state=>state.data ? state.data.notices : [],
  detailFees: state=>state.data ? state.data.fees : [],
  detailMails: state=>state.data ? state.data.mails : [],
  detailDocuments: state=>state.data ? state.data.documents : [],
  applicantData: state=>state.data ? state.data.applicants : [],
  detailLoading: state=>state.loading,
}

const mutations = {
	setDetailType: (state, path)=>{
		const arr = ['patent', 'trademark', 'copyright','applicant'];
		for(let a of arr) {
			const reg = new RegExp(a);
			if(reg.test(path)) {
				state.type = a;
				break;
			}
		}
	},
	setDetailData: (state, data)=>{ state.data = data },
	setLoading(state, boolean) { state.loading = boolean },
	setId(state, id) { state.id = id },
	refreshTrueType(state) { state.true_type = state.type },
}

const actions = {
	refreshDetailData({ commit, state, rootState }, {id, func, type}={}) {
			if(type) {
				commit('setDetailType', type);
			}else {
				type = state.type;
			}
			if(id) {
				commit('setId', id);
			}else {
				id = state.id;
			}
			let url = `/api/${state.type}s`;
			url = rootState.status ? url.replace(/\/api/, '') : url;
      commit('setLoading', true);
      rootState.axios.get(`${url}/${id}`)
	      .then(response=>{
          if(func) func();    
          
          const d = response.data;
          if( d.status ) {
              commit('setDetailData', JSON.parse(JSON.stringify(d[state.type])));
          }else {
              // alert(d.info);
          }
          commit('setLoading', false);
          commit('refreshTrueType');
	      })
	      .catch(err=>{
	          if(func) func();
	          commit('setLoading', false);
	          console.log(err);
	          // alert('网络错误');
	      })
		
	}
}

export default {
	state,
	getters,
	mutations,
	actions,
}