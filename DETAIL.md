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

