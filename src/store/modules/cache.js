
const state = {
	applicant_type: [
		{ name: '大专院校', id: 1 },
		{ name: '科研单位', id: 2 },
		{ name: '工矿企业', id: 3 },
		{ name: '事业单位', id: 4 },
		{ name: '个人',     id: 5 },
	],
	case_type: [
    { id: 0, name: '提案' },
    { id: 1, name: '专利' },
    { id: 2, name: '商标' },
    { id: 3, name: '版权' },
  ],
}

const getters = {
	applicantType (state) {
		return state.applicant_type;
	},
	applicantTypeMap () {
		const map = new Map();
		state.applicant_type.forEach(_=>{
			map.set(_.id, _.name);
		});
		return map;
	},
	caseType: state=>state.case_type,
  caseMap: state=>{
    const map = new Map();
    state.case_type.forEach(_=>{
    	map.set(_.id, _.name);
    });
    return map;
  }
}

const mutations = {

}

const actions = {

}

export default {
	state,
	getters,
	mutations,
	actions,
}