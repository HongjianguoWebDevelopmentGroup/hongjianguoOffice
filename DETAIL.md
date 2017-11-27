红坚果事务所版详细设计
=====================
### 项目管理
- #### 新建项目
  - url: '/project'
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
- #### 编辑项目
  - url: '/project'
  - type: 'PUT'
  - params: 编辑名称和描述
- #### 删除项目
  - url: '/project'
  - type: 'DELETE'
  - params: 
  ``` javascript
  {
    id: [],//待删除的项目ID数组 array
  }
  ```
- #### 获取项目列表
  - url: '/project'
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
### 客户信息管理
- #### 新建客户
  - url: '/customer'
  - type: 'POST'
  - params: 
  ```javascript
  {
    area: '',//客户国籍 string (地区列表的KEY)*
    name: '',//客户名称 string (1-10;不包含特殊字符)*
    en_name: '',//英文名称 string (1-10;不包含特殊字符)
    pro_city: [],//省份及城市 array (states.json中的数据)
    address: '',//详细地址 string (1-200;不包含特殊字符)
    en_address: '',//英文地址 string (1-200;不包含特殊字符)
    contact: '',//联系人 string (1-10;不包含特殊字符)
    cell_phone: '',//手机号码 string (手机号码验证规则)
    email: '',//电子邮箱 string (邮箱验证规则)
    qq: '',//QQ string (qq验证规则)
    wechat: '',//微信 string
  }
  ```
- #### 删除客户
- #### 编辑客户
- #### 获取客户列表
  - url: '/customer'
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
  name: '', //客户名称
  province: '', //省份
  city: '', //城市
  contact: '', //联系人
  email: '', //电子邮箱
  number: '', //案件数
}
```
- #### 获取报价列表
- #### 修改报价
- #### 添加客户要求
  - url: '/requirement'
  - type: 'POST'
  - params:
  ```javascript
  {
    type: '',//案件类型 string (案件类型列表的KEY)*
    content: '',//客户要求 string (1-500;不包含特殊字符)*
  }
  ```
- #### 删除客户要求
- #### 编辑客户要求
- #### 获取客户要求列表
### 申请人管理（同企业版）
### 发明人管理（同企业版）
### 合同管理
- #### 新增合同
  - url: '/contract'
  - type: 'POST'
  - params:
```javascript
{
  number: '', //string* 合同编号
  customer: '', //number* 相关客户
  date: '', //string* 签订日期
  agency: '', //number* 代理所
  remark: '', //string (1-50;不包含特殊字符) 备注
  file: '', //number* 扫描件
}
```
- #### 编辑合同
- #### 删除合同
- #### 获取合同列表
