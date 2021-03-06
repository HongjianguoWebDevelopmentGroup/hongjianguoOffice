const menu = {};
const map = {};
const taskMenu = [
	{ type: 'item', text: '未完成', path: '/task/pending', icon: 'iconfont icon-task' },
	{ type: 'item', text: '暂停处理', path: '/task/paused', icon: 'iconfont el-icon-my-task' },
	{ type: 'item', text: '已完成', path: '/task/finished', icon: 'iconfont el-icon-my-task' },
	{ type: 'item', text: '期限管控', path: '/task/expiring', icon: 'iconfont el-icon-my-task'},
];
const newsMenu = [
	{ type: 'item', text: '邮件', path: '/news/mailList', icon: 'iconfont icon-email'},
	{ type: 'item', text: '系统消息', path: '/news/systemMessage', icon: 'iconfont-newlabel'}
];
const patentMenu = [
	{ type: 'item', text: '新建专利', path: '/patent/add' ,icon: 'iconfont icon-proposal-add'},
	{ type: 'item', text: '专利管理', path: '/patent/list' ,icon: 'iconfont icon-patent'},
	{ type: 'item', text: '通知书管理', path: '/patent/notice' ,icon: 'iconfont icon-notice'},
];
const copyrightMenu = [
	{ type: 'item', text: '新建版权', path: '/copyright/add', icon: 'iconfont icon-proposal-add'},
	{ type: 'item', text: '版权管理', path: '/copyright/list', icon: 'iconfont icon-copyright'},
];
const trademarkMenu = [
	{ type: 'item', text: '新建商标', path: '/trademark/add', icon: 'iconfont icon-proposal-add'},
	{ type: 'item', text: '商标管理', path: '/trademark/list', icon: 'iconfont icon-trademark'},
];
const businessMenu = [
	{ type: 'item', text: '新建项目', path: '/business/add', icon: 'iconfont icon-proposal-add'},
	{ type: 'item', text: '项目管理', path: '/business/list', icon: 'iconfont icon-projectmanage'},
];
const clientMenu = [
	{ type: 'item', text: '客户管理', path: '/client/list', icon: 'iconfont icon-personel'},
	{ type: 'item', text: '合同管理', path: '/client/contract', icon: 'iconfont icon-contract'},
	{ type: 'item', text: '报价管理', path: '/client/offer', icon: 'iconfont icon-contract'},
	{ type: 'item', text: '申请人管理', path: '/client/applicant', icon: 'iconfont icon-proposer'},
	{ type: 'item', text: '发明人管理', path: '/client/inventor', icon: 'iconfont icon-proposer'},
	{ type: 'item', text: '接口人管理', path: '/client/contact', icon: 'iconfont icon-proposer'},
];
const feeMenu = [
	{ type: 'item', text: '应收费用', path: '/fee/income', icon: 'iconfont icon-deal'},
	{ type: 'item', text: '应付明细', path: '/fee/pay', icon: 'iconfont icon-receipt'},
	{ type: 'item', text: '请款单', path: '/fee/bill', icon: 'iconfont icon-deal'},
	{ type: 'item', text: '付款单', path: '/fee/payment', icon: 'iconfont icon-pay'},
];
const dispatchMenu = [
	{ type: 'item', text: '发文管理', path: '/dispatch/administration', icon: 'iconfont icon-dispatch'},
];
const settingMenu = [
	{ type: 'item', text: '我的个人设置', path: '/setting/individual', icon: 'iconfont icon-set-copy'},
	{ type: 'item', text: '人员管理', path: '/setting/employee', icon: 'iconfont icon-users'},
	{ type: 'item', text: '账号管理', path: '/setting/account', icon: 'iconfont icon-users'},
	{ type: 'item', text: '技术分类管理', path: '/classification', icon: 'iconfont icon-techonology'},
	{ type: 'item', text: '产品分类管理', path: '/product', icon: 'iconfont icon-products'},
	{ type: 'item', text: '部门管理', path: '/branch', icon: 'iconfont icon-department'},
	{ type: 'item', text: '代理机构管理', path: '/setting/agency', icon: 'iconfont icon-organization'},
	{ type: 'item', text: '系统设置', path: '/setting/system', icon: 'iconfont icon-system'},
];
menu.source = [
	// {
	// 	text: '个人中心',
	// 	key: 'statistics',
	// 	path: '/home',
	// },
	{
		text: '任务',
		key: 'task',
		path: '/task',
		icon: 'iconfont el-icon-my-task',
		menu: taskMenu,
	},
	// {
	// 	text: '提案',
	// 	key: 'proposal',
	// 	path: '/proposal',
	// 	icon: 'iconfont el-icon-my-proposal',
	// 	menu: proposalMenu,
	// },
	{
		text: '专利',
		key: 'patent',
		path: '/patent',
		icon: 'iconfont el-icon-my-patent',
		menu: patentMenu,
	},	
	{
		text: '商标',
		key: 'trademark',
		path: '/trademark',
		icon: 'iconfont el-icon-my-trademark',
		menu: trademarkMenu,
	},

	{
		text: '版权',
		key: 'copyright',
		path: '/copyright',
		icon: 'iconfont el-icon-my-copyright',
		menu: copyrightMenu,
	},	
	{
		text: '项目',
		key: 'business',
		path: '/business',
		icon: 'iconfont icon-projectmanage',
		menu: businessMenu,
	},	
	{
		text: '客户',
		key: 'client',
		path: '/client',
		icon: 'iconfont icon-client',
		menu: clientMenu,
	},

	{
		text: '费用',
		key: 'fee',
		path: '/fee',
		icon: 'iconfont el-icon-my-fee',
		menu: feeMenu,
	},
	// {
	// 	text: '年费',
	// 	key: 'renewal',
	// 	path: '/renewal',
	// 	icon: 'iconfont el-icon-my-renewal',
	// 	menu: renewalMenu,
	// },
	// {
	// 	text: '报表',
	// 	key: 'report',
	// 	path: '/report',
	// 	icon: 'el-icon-my-report',
	// 	menu: reportMenu,
	// },
	{
		text: '邮件',
		key: 'news',
		path: '/news',
		icon: 'iconfont el-icon-my-email',
		menu: newsMenu,
	},	
	{
		text: '发文管理',
		key: 'dispatch',
		path: '/dispatch',
		icon: 'iconfont icon-dispatch',
		menu: dispatchMenu,
	},
	{
		text: '设置',
		key: 'setting',
		path: '/setting',
		icon: 'iconfont el-icon-my-setting',
		menu: settingMenu,
	},
	// {
	// 	text: '测试',
	// 	key: 'test',
	// 	path: '/test',
	// 	icon: '',
	// 	menu: testMenu,
	// }
]
/*menu.data = [
	{
		text: '个人中心',
		path: '/statistics',
		icon: 'iconfont icon-statistics',
		type: 'item'
	},
	{
		text: '消息',
		path: '/news',
		icon: 'iconfont icon-email',
		type: 'submenu',
		children: [
			{
				text: '邮件',
				path: '/news/mailList',
				icon: 'iconfont icon-email',
				type: 'item',
			},
			{
				text: '系统消息',
				path: '/news/systemMessage',
				icon: 'iconfont icon-newlabel',
				type: 'item',
			}
		]
	},
	// {
	// 	text: '邮件',
	// 	path: '/mailList',
	// 	icon: 'iconfont icon-email',
	// 	type: 'item',
	// },
	{
		text: '任务',
		path: '/task',
		icon: 'iconfont icon-task',
		type: 'submenu',
		children: [
			{
				text: '未完成',
				path: '/task/pending',
				icon: 'iconfont icon-task-pending',
				type: 'item',
			},
			{
				text: '暂停处理',
				path: '/task/pause',
				icon: 'iconfont icon-pause',
				type: 'item',
			},
			{
				text: '已完成',
				path: '/task/finish',
				icon: 'iconfont icon-task-finish',
				type: 'item',
			},
			{
				text: '期限管控',
				path: '/task/expiring',
				icon: 'iconfont icon-task-pending',
				type: 'item',
			}
		]
	},
	// {
	// 	text: '提案',
	// 	path: '/proposal',
	// 	icon: 'iconfont icon-proposal',
	// 	type: 'submenu',
	// 	children: [
	// 		{
	// 			text: '新建提案',
	// 			path: '/proposal/add',
	// 			icon: 'iconfont icon-proposal-add',
	// 			type: 'item'
	// 		},
	// 		{
	// 			text: '提案列表',
	// 			path: '/proposal/list',
	// 			icon: 'iconfont icon-proposal',
	// 			type: 'item'
	// 		},
	// 	]
	// },
	{
		text: '专利',
		path: '/patent',
		icon: 'iconfont icon-patent',
		type: 'submenu',
		children: [
			{
				text: '新建专利',
				path: '/patent/add',
				icon: 'iconfont icon-proposal-add',
				type: 'item'
			},
			{
				text: '专利管理',
				path: '/patent/list',
				icon: 'iconfont icon-patent',
				type: 'item',
			},
			// {
			// 	text: '专利统计',
			// 	path: '/patent/statistics',
			// 	icon: '',
			// 	type: 'item',
			// },
			{
				text: '通知书管理',
				path: '/patent/notice',
				icon: 'iconfont icon-notice',
				type: 'item',
			}
		]
	},
	{
		text: '版权',
		path: '/copyright',
		icon: 'iconfont	 icon-copyright',
		type: 'submenu',
		children: [
			{
				text: '新建版权',
				path: '/copyright/add',
				icon: 'iconfont icon-proposal-add',
				type: 'item'
			},
			{
				text: '版权管理',
				path: '/copyright/list',
				icon: 'iconfont	 icon-copyright',
				type: 'item'
			},
			// {
			// 	text: '通知书管理',
			// 	path: '/copyright/notice',
			// 	icon: 'iconfont icon-notice',
			// 	type: 'item',
			// },
		]
	},
	{
		text: '商标',
		path: '/trademark',
		icon: 'iconfont	 icon-trademark',
		type: 'submenu',
		children: [
			{
				text: '新建商标',
				path: '/trademark/add',
				icon: 'iconfont icon-proposal-add',
				type: 'item'
			},{
				text: '商标管理',
				icon: 'iconfont icon-trademark',
				path: '/trademark/list',
				type: 'item',
			}]
	},
	{
		text: '项目',
		path: '/business',
		icon: 'iconfont icon-project',

		type: 'submenu',
		children: [
			{
				text: '新建项目',
				path: '/business/add',
				icon: 'iconfont icon-proposal-add',
				type: 'item',
			},{
				text: '项目管理',
				path: '/business/list',
				icon: 'iconfont icon-projectmanage',
				type: 'item',
			}
		]
	},
	{
		text: '客户',
		path: '/client',
		icon: 'iconfont	 icon-customer',
		type: 'submenu',
		children: [
			{
				text: '客户管理',
				icon: 'iconfont icon-personel',
				path: '/client/list',
				type: 'item',
			},
			{
				text: '合同管理',
				icon: 'iconfont icon-contract',
				path: '/client/contract',
				type: 'item',
			},
			{
				text: '报价管理',
				icon: 'iconfont icon-contract',
				path: '/client/offer',
				type: 'item',
			},
			{
				text: '申请人管理',
				path: '/client/applicant',
				icon: 'iconfont icon-proposer',
				type: 'item',
			},
			{ 
				text: '发明人管理',
				path: '/client/inventor',
				icon: 'iconfont icon-proposer',
				type: 'item',
			},
			{
				text: '接口人管理',
				path: '/client/contact',
				icon: 'iconfont icon-proposer',
				type: 'item',
			}
		]
	},
	{
		text: '费用',
		path: '/fee',
		icon: 'iconfont icon-fee',
		type: 'submenu',
		children: [{
			text: '应收明细',
			path: '/fee/income',
			icon: 'iconfont icon-deal',
			type: 'item',
		},{
			text: '应付明细',
			path: '/fee/pay',
			icon: 'iconfont icon-receipt',
			type: 'item',
		},{
			text: '请款单',
			path: '/fee/bill',
			icon: 'iconfont icon-deal',
			type: 'item',
		},{
			text: '付款单', 
			path: '/fee/payment',
			icon: 'iconfont icon-pay',
			type: 'item',
		}]
	},
	{
		text: '发文',
		path: '/dispatch',
		icon: 'iconfont icon-email',
		type: 'submenu',
		children: [{
			text: '发文管理',
			path: '/dispatch/administration',
			icon: 'iconfont icon-dispatch',
			type: 'item'
		}]
	},
	{
		text: '设置',
		path: '/setting',
		icon: 'iconfont icon-setting',
		type: 'submenu',
		children: [{
			text: '我的个人设置',
			path: '/setting/individual',
			icon: 'iconfont icon-set-copy',
			type: 'item'
		},
		{
			text: '人员管理',
			path: '/setting/employee',
			icon: 'iconfont icon-users',
			type: 'item',
		},
		{
			text: '账号管理',
			path: '/setting/account',
			icon: 'iconfont icon-users',
			type: 'item',
		},
		{
			text: '技术分类管理',
			path: '/classification',
			icon: 'iconfont icon-techonology',
			type: 'item',
		},
		{
			text: '产品分类管理',
			path: '/product',
			icon: 'iconfont icon-products',
			type: 'item',
		},
		{
			text: '部门管理',
			path: '/branch',
			icon: 'iconfont icon-department',
			type: 'item',
		},{
			text: '代理机构管理',
			path: '/setting/agency',
			icon: 'iconfont icon-organization',
			type: 'item'
		},
		// {
		// 	text: '案件类型管理',
		// 	path: '/setting/case',
		// 	icon: '',
		// 	type: 'item'
		// },
		{
			text: '系统设置',
			path: '/setting/system',
			icon: 'iconfont icon-system',
			type: 'item'
		},
		// {
		// 	text: '模板管理',
		// 	path: '/setting/template',
		// 	icon: '',
		// 	type: 'item'
		// },
		// {
		// 	text: '发文规则',
		// 	path: '/setting/rule',
		// 	icon: '',
		// 	type: 'item'
		// }
		]
	},
];*/

menu.map = {
	'/': {text: '主页', icon: 'iconfont icon-home', path: '/'},
	'/task/pending/check': {text: '提案审核', icon: 'iconfont icon-task-check', 'path': '/task/pending/check'},
	'/patent/applied/detail': {text: '专利详情', icon: '', path: '/patent/applied/detail'},
	'/patent/list/detail': {text: '专利详情', icon: '', path: '/patent/list/detail'},
	'/copyright/list/detail': {text: '版权详情', icon: '', path: '/copyright/list/detail'},
	'/proposal/edit': {text: '提案编辑', icon: '', path: '/proposal/edit'},
	'/proposal/detail': {text: '提案详情', icon: '', path: '/proposal/detail'},
	'/trademark/list/detail': {text: '商标详情', icon: '', path: '/trademark/list/detail/babel'},
	'/news/mailList/mailAdd': {text: '写邮件', icon: 'el-icon-edit', path: '/news/mailList/mailAdd'},
	'/news/mailList/mailEdit': {text: '编辑邮件', icon: 'el-icon-edit', path: '/news/mailList/mailEdit'},
	'/setting/agency/detail': {text: '代理机构详情', icon: '', path: '/setting/agency/detail'},
	'/setting/template/edit': {text: '编辑模板', icon: 'el-icon-edit', path: '/setting/template/edit'},
	'/news/systemMessage/detail': {text: '消息详情', icon: '', path: '/news/systemMessage/detail'},
};

export default menu;

const tailRecursion = (data) => {
	for( let x of data ) {
		if(!x["path"]) continue;
		const path = x['type'] && x['type'] == 'submenu' ? '' : x["path"];
		menu["map"][x["path"]] = { text: x["text"], icon: x["icon"], path };
		if( x.children && x.children.length != 0) {
			tailRecursion(x["children"]);
		}
	}
}

for(let k in menu.source) {
	const item = menu.source[k];
	const text = item["text"] ? item["text"] : '';
	const icon = item["icon"] ? item["icon"] : '';
	const path = item["path"]; 
	const parent = '/';
	menu["map"][item["path"]] = { text, icon, path, parent };
	if(item['menu'] && item['menu']['length'] != 0) {
		tailRecursion(item['menu']);		
	}
}