红坚果事务所版详细设计
=====================

项目管理
---------------------
#### 新建项目
- url: '/projects'
- type: 'POST'
- params: 
``` javascript
{
  name: '',//项目名称 string(1-50;不包含特殊字符)*
  description: '',//项目描述 string(1-200;不包含特殊字符)
  customer: '',//客户ID string|number*
  patent: [],//关联专利名称数组 array(input框输入;不能重复;1-50;不含特殊字符)
  copyright: [],//关联版权名称数组 array
  trademark: [],//关联商标名称数组 array
}
```
#### 编辑项目
- url: '/projects'
- type: 'PUT'
- params: 编辑名称和描述
#### 删除项目
- url: '/project'
- type: 'DELETE'
- params: 
``` javascript
{
  id: [],//待删除的项目ID数组 array
}
```
#### 获取项目列表
- url: '/projects'
- type: 'GET'
- params: 
``` javascript
{
  page: '',
  listRows: '',
}
```
- response:
``` javascript
{
  name: '',
  description: '',
  customer: '',
  patent: [],
  copyright: [],
  trademark: [],
}
```

客户信息管理
-----------------------
#### 新建客户
- url: '/customers'
- type: 'POST'
- params: 
```javascript
{
  area: '',//客户国籍 string (地区列表的KEY)*
  name: '',//客户名称 string (1-50;不包含特殊字符)*
  en_name: '',//英文名称 string (1-50;不包含特殊字符)
  province: '', //省份 int (states.json中的数据)
  city: '', //城市 int (states.json中的数据)
  address: '',//详细地址 string (1-200;不包含特殊字符)
  en_address: '',//英文地址 string (1-200;不包含特殊字符)
  contact: '',//联系人 string (1-10;不包含特殊字符)
  cell_phone: '',//手机号码 string (手机号码验证规则)
  email: '',//电子邮箱 string (邮箱验证规则)
  qq: '',//QQ string (qq验证规则)
  wechat: '',//微信 string
}
```
#### 删除客户
- url: '/customers'
- type: 'DELETE'
- params:
```javascript
{
  id: [], 待删除的客户ID数组
}
```
#### 编辑客户
- url: '/customers/:id'
- type: 'PUT'
- params: (同添加)
#### 获取客户列表
- url: '/customers'
- type: 'GET'
- params:
```javascript
{
  page: '',
  listRows: '',
  keyword: '', //placeholder: 客户名称/英文名称/联系人
}
```
- response:
```javascript
{
  area: '', //地区
  name: '', //客户名称
  en_name: '', //英文名称
  province: '', //省份
  city: '', //城市
  contact: '', //联系人
  email: '', //电子邮箱
  project_count: '', //案件数
}
``` 
#### 获取报价列表
#### 修改报价
#### 添加客户要求
- url: '/requirements'
- type: 'POST'
- params:
```javascript
{
  type: '',//案件类型 string (案件类型列表的KEY)*
  content: '',//客户要求 string (1-500;不包含特殊字符)*
  customer_id: '' //客户ID int*
}
```
#### 删除客户要求
- url: '/requirements'
- type: 'DELETE'
- params:
```javascript
{
  id: [], //待删除的客户要求ID数组
}
```
#### 编辑客户要求
#### 获取客户要求列表
- url: '/requirements'
- type: 'POST'
- params: 
```javascript
{
  customer: '',//客户ID
}
```
- response: 
```javascript
{
  id: '',
  index: '', //编号(前台计算)
  type: '', //案件类型
  date: '', //备注日期
  member: '', //备注用户
  content: '', //要求内容
}
```

申请人管理（同企业版）
--------------------------

发明人管理（同企业版）
--------------------------

合同管理
--------------------------
#### 新增合同
- url: '/contracts'
- type: 'POST'
- params:
```javascript
{
  number: '', //string* 合同编号
  customer: '', //number* 相关客户
  date: '', //string* 签订日期
  agency: '', //number* 分所
  remark: '', //string (1-50;不包含特殊字符) 备注
  file: '', //number* 扫描件
}
```
#### 编辑合同
#### 删除合同
#### 获取合同列表
- url: '/contracts'
- type: 'GET'
- params:
```javascript
{
  page: '',
  listRows: '',
}
```
- response:
```javascript
{
  number: '', //合同编号
  customer: '', //相关客户
  agency: {id: '', name: ''}, //分所
  date: '', //签订日期
  up_member: '', //上传用户
  up_date: '', //上传日期
  status: '', //状态
  file: {}, //扫描文件(点击下载)
  remark: '', //备注
}
```
