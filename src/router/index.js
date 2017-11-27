import Vue from 'vue'
import Router from 'vue-router'
const Home                     = () => import('@/components/page/Home')
const Proposal                 = () => import('@/components/page/Proposal')
const InventorList             = () => import('@/components/page/InventorList')
const ApplicantList            = () => import('@/components/page/ApplicantList')
const ProposalCommon           = () => import('@/components/page/ProposalCommon')
const CheckProposal            = () => import('@/components/page/CheckProposal')
const TaskCommon               = () => import('@/components/page/TaskCommon')
const TaskExpiring             = () => import('@/components/page/TaskExpiring')
const PatentList               = () => import('@/components/page/PatentList')
const ApplyingPatent           = () => import('@/components/page/ApplyingPatent')
const PatentAdd                = () => import('@/components/page/PatentAdd')
const NoticeCommon             = () => import('@/components/page/NoticeCommon')
const TrademarkList            = () => import('@/components/page/TrademarkList')
const TrademarkAdd             = () => import('@/components/page/TrademarkAdd')
const TrademarkNotice          = () => import('@/components/page/TrademarkNotice')
const TrademarkStatistics      = () => import('@/components/page/TrademarkStatistics')
const CopyrightList            = () => import('@/components/page/CopyrightList')
const CopyrightAdd             = () => import('@/components/page/CopyrightAdd')
const UserList                 = () => import('@/components/page/UserList')
const Technology               = () => import('@/components/page/Technology')
const Branch                   = () => import('@/components/page/Branch')
const FeeCommon                = () => import('@/components/page/FeeCommon')
const DispatchAdministration   = () => import('@/components/page/DispatchAdministration')
const InvoiceCommon            = () => import('@/components/page/InvoiceCommon')
const ClassificationCommon     = () => import('@/components/page/ClassificationCommon')
const MailList                 = () => import('@/components/page/MailList')
const SystemMessage            = () => import('@/components/page/SystemMessage')
const SystemMessageDetail      = () => import('@/components/page/SystemMessageDetail')
const MailAdd                  = () => import('@/components/page/MailAdd')
//###################
const CommonDetail             = () => import('@/components/page/CommonDetail')
const Babel                    = () => import('@/components/page_extension/CommonDetail_base')
const Control                  = () => import('@/components/page_extension/CommonDetail_control')
const Notice                   = () => import('@/components/page_extension/CommonDetail_notice')
const Fee                      = () => import('@/components/page_extension/CommonDetail_fee')
const Email                    = () => import('@/components/page_extension/CommonDetail_email')
const Documents                = () => import('@/components/page_extension/CommonDetail_documents')
//#################

//-------------------设置 begin-----------------
const SettingAgency            = () => import('@/components/page/SettingAgency')
const SettingAgencyDetail      = () => import('@/components/page/SettingAgencyDetail')
const SettingCase              = () => import('@/components/page/SettingCase')
const SettingJurisdiction      = () => import('@/components/page/SettingJurisdiction')
const SettingRule              = () => import('@/components/page/SettingRule')
const SettingTemplate          = () => import('@/components/page/SettingTemplate')
const SettingTemplateEdit      = () => import('@/components/page/SettingTemplateEdit')
const SettingUser              = () => import('@/components/page/SettingUser')

//#################
const SettingIndividual        = () => import('@/components/page/SettingIndividual')
const SI_Base                  = () => import('@/components/page_extension/SettingIndividual_base')
const SI_Notice                = () => import('@/components/page_extension/SettingIndividual_notice')
const SI_Email                 = () => import('@/components/page_extension/SettingIndividual_email')
//#################
const SettingSystem            = () => import('@/components/page/SettingSystem')
const SS_Base                  = () => import('@/components/page_extension/SettingSystem_base')
const SS_Email                 = () => import('@/components/page_extension/SettingSystem_email')
const SS_Number                = () => import('@/components/page_extension/SettingSystem_number')
const SS_Case                  = () => import('@/components/page_extension/SettingSystem_case')
const SS_Fee                   = () => import('@/components/page_extension/SettingSystem_fee')
//-------------------设置 end---------------------

Vue.use(Router);
const router = new Router({
  routes: [
    //###重定向###
    { path: '/', redirect: '/statistics' },
    { path: '/proposal', redirect: '/proposal/list' },
    { path: '/task', redirect: '/task/pending' },
    { path: '/patent', redirect: '/patent/list' },
    { path: '/trademark', redirect: '/trademark/list' },
    { path: '/copyright', redirect: '/copyright/list' },
    { path: '/news', redirect: '/news/mailList' },
    { path: '/dispatch', redirect: '/dispatch/administration' },
    { path: '/fee', redirect: '/fee/income'},
    { path: '/setting', redirect: '/setting/individual'},
    //###重定向###
    {
      path: '/statistics',
      name: 'Home',
      component: Home
    },
    {
      path: '/inventorList',
      name: 'InventorList',
      component: InventorList
    },
    {
      path: '/applicantList',
      name: 'ApplicantList',
      component: ApplicantList
    },
    {
    	path: '/proposal/list',
    	name: 'Proposal',
    	component: Proposal
    },{
      path: '/proposal/add',
      name: 'ProposalCommon',
      component: ProposalCommon,
      alias: ['/proposal/detail', '/task/pending/proposal_check', '/proposal/edit'],
    },{
      path: '/task/pending/check',
      name: 'CheckProposal',
      component: CheckProposal
    },{
      path: '/task/pending',
      name: 'TaskPending',
      component: TaskCommon,
      meta: { 'status': 0 },
    },
    {
      path: '/task/pause',
      name: 'TaskPause',
      component: TaskCommon,
      meta: { 'status': -1 },
    },
    {
      path: '/task/finish',
      name: 'TaskFinish',
      component: TaskCommon,
      meta: { 'status': 1 },
    },
    {
      path: '/task/expiring',
      name: 'TaskExpiring',
      component: TaskExpiring,
    },
    {
      path: '/patent/list',
      name: 'PattentList',
      component: PatentList
    },
    {
      path: '/patent/applying',
      name: 'ApplyingPatent',
      component: ApplyingPatent
    },
    {
      path: '/patent/add',
      name: 'PatentAdd',
      component: PatentAdd,
      meta: { type: 'add' },
    },
    {
      path: '/patent/notice',
      name: 'PatentNotice',
      meta: { type: 'patent' },
      component: NoticeCommon,
    },
    {
      path: '/trademark/list',
      name: 'TrademarkList',
      component: TrademarkList
    },
    {
      path: '/trademark/add',
      name: 'TrademarkAdd',
      component: TrademarkAdd
    }, 
    {
      path: '/trademark/notice',
      name: 'TrademarkNotice',
      component: TrademarkNotice
    },
    {
      path:'/trademark/statistics',
      name: 'TrademarkStatistics',
      component: TrademarkStatistics
    },
    {
      path: '/copyright/add',
      name: 'CopyrightAdd',
      meta: { pageType: 'add' },
      component: CopyrightAdd
    },
    {
      path: '/copyright/list',
      name: 'CopyrightList',
      component: CopyrightList
    },
    {
      path: '/copyright/list/detail/:id',
      redirect: '/copyright/list/detail__/:id',
    },
    {
      path: '/copyright/list/detail__/:id',
      component: CommonDetail,
      children: [
        { path: '', redirect: 'base',  },
        { path: 'base', component: CopyrightAdd, meta: { pageType: 'edit' } },
        { path: 'control', component: Control },
        { path: 'notice', component: Notice },
        { path: 'fee', component: Fee },
        { path: 'email', component: Email },
        { path: 'documents', component: Documents },
      ]
    },
    {
      path: '/copyright/notice',
      name: 'CopyrightNotice',
      meta: { type: 'copyright' },
      component: NoticeCommon,
    },
    {
      path: '/userList',
      name: 'UserList',
      component: UserList,
    },
    {
      path: '/news/mailList',
      name: 'MailList',
      component: MailList,
    },
    {
      path: '/news/systemMessage',
      name: 'SystemMessage',
      component: SystemMessage,
    },
    {
      path: '/news/systemMessage/detail',
      name: 'SystemMessageDetail',
      component: SystemMessageDetail,
    },
    {
      path: '/news/mailList/mailAdd',
      name: 'MailAdd',
      meta: { type: 'add' },
      component: MailAdd,
    },
    {
      path: '/news/mailList/mailEdit',
      name: 'mailEdit',
      meta: { type: 'edit' },
      component: MailAdd,
    },
    {
      path: '/classification',
      name: 'Clssification',
      component: ClassificationCommon,
    },
    {
      path: '/product',
      name: 'Product',
      component: ClassificationCommon,
    },
    {
      path: '/branch',
      name: 'Branch',
      component: Branch,
    },
    {
      path: '/fee/income',
      name: 'FeeIncome',
      component: FeeCommon,
    },
    {
      path: '/dispatch/administration',
      name: 'DispatchAdministration',
      component: DispatchAdministration,
    },
    {
      path: '/fee/pay',
      name: 'FeePay',
      component: FeeCommon,
    },
    {
      path: '/fee/bill',
      name: 'FeeBill',
      component: InvoiceCommon,
    },
    {
      path: '/fee/payment',
      name: 'FeePayment',
      component: InvoiceCommon
    },
    {
      path: '/patent/list/detail/:id',
      redirect: '/patent/list/detail__/:id',
    },
    {
      path: '/patent/list/detail__/:id',
      component: CommonDetail,
      children: [
        { path: '', redirect: 'base',  },
        { path: 'base', component: PatentAdd, meta: {type: 'edit'} },
        { path: 'control', component: Control },
        { path: 'notice', component: Notice },
        { path: 'fee', component: Fee },
        { path: 'email', component: Email },
        { path: 'documents', component: Documents },
      ]
    },
    {
      path: '/commonDetail/:id',
      component: CommonDetail,
      children: [
        { path: '', redirect: 'babel' },
        { path: 'babel', component: Babel },
        { path: 'control', component: Control },
        { path: 'notice', component: Notice },
        { path: 'fee', component: Fee },
        { path: 'email', component: Email },
        { path: 'documents', component: Documents },
      ],
    },
    { path: '/setting/agency', name: 'SettingAgency', component: SettingAgency },
    { path: '/setting/agency/detail', name: 'SettingAgencyDetail', component: SettingAgencyDetail },
    { path: '/setting/case', name: 'SettingCase', component: SettingAgency },
    { path: '/setting/individual', name: 'SettingIndividual', component: SettingIndividual },
    { path: '/setting/jurisdiction', name: 'SettingJurisdiction', component: SettingJurisdiction },
    { path: '/setting/rule', name: 'SettingRule', component: SettingRule },
    { 
      path: '/setting/system',
      name: 'SettingSystem',
      component: SettingSystem,
    },
    { path: '/setting/template', name: 'SettingTemplate', component: SettingTemplate },
    { path: '/setting/template/edit', name: 'SettingTemplateEdit', component: SettingTemplateEdit },
    { path: '/setting/user', name: 'SettingUser', component: SettingUser },
  ]
});
router.beforeEach((to, from, next)=>{
  // console.log(to, from);
  const store = this.a.app.$store;
  if(store) {
    store.commit('clearScreen');
  }
  next();
});
export default router
