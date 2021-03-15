## 概述
concet-pro主要是为了用户整合concent和react相关生态库，并给出最佳实践指导，包括但不局限于以下功能：
- 测试用例书写示范
- 常用concent api示范
- model目录组织示范
= ts整合示范

## 如何运行
- step 1  
进入项目根目录，安装项目依赖
```bash
npm i
```  

- step 2  
启动项目，开始开发与调试
```bash
npm start （包含启动前端 和 mock服务）
```

如需分开启动
```bash
npm run api （启动mock服务）
npm run app （启动前端）
```

## 快速开始
- step 1  
`src/configs/menus`里添加路由对应的菜单信息
- step 2
`src/pages`目录下添加页面组件
> 可参考 `src/pages/_DemoTempalte`查看示例代码，启动项目后 访问 localhost:3000/template可以访问该组件页面


## 编码建议
1 pages里拆分的组件如不涉及到跨页面复用，推荐就近放置，如后期复用在移到`components/**`下
2 page模块状态推荐就近放置

## 技术栈
### 运行时依赖
* [react 16.13.1](https://github.com/facebook/create-react-app)   
  组件化编程ui基础库
* [react-router v5](https://github.com/ReactTraining/react-router)  
  react路由方案
* [concent v2](https://github.com/concentjs/concent)  
  内置依赖收集，高性能、渐进式的react开发框架
* [react-router-concent v2](https://github.com/concentjs/react-router-concent)  
  桥接react-router和concent的中间库
* [ant-design v4](https://github.com/ant-design/ant-design)   
  react 基础ui组件库

### 开发依赖
* [create-react-app v3](https://github.com/facebook/create-react-app)   
  react工程手脚架
* [mocker-api v1.13](https://github.com/jaywcjlove/mocker-api)    
  api模拟服务


## 根目录结构
```
|____config             # CRA webpack相关配置[由npm run eject弹出]   
|____mock               # mock api配置
|____public             # webpack-dev-server 静态资源目录
|____scripts            # npm 脚本
|____src                # 项目源码
```

## src目录结构
```
|____runConcent.js      # run concent script
|____App.css            # App css file
|____App.js             # app root component
|____configs
| |____constant           # 各种常量定义处目录
| |____runConcent.ts      # 启动concent
| |____menus.ts           # 站点菜单配置(包含了路由)
| 
|____index.tsx            # app入口文件
|____utils                # 通用的非业务相关工具函数集合（可以进一步按用途分类）
|____models               # [[business models(全局模块配置)]]
| |____index.js           # 如需全局各个组件共享的model，可提升到此处导出（model可就近放置也可放到models目录下）
| |____global             # [[ 一个标准的模块文件(可以copy到各处，只需修改meta里的模块名即可 ]]
| | |____index.ts         # 模型导出文件
| | |____reducer.ts       # 修改模块数据方法(可选)
| | |____computed.ts      # 模块数据的计算函数(可选)
| | |____watch.ts         # 模块数据的观察函数(可选)
| | |____lifecycle.ts     # 模块生命周期配置(可选)
| | |____state.ts         # 模块状态(必需)
| | |____meta.ts          # 模块元数据文件- 导出整个模块的描述对象、相关类型、钩子等
| |____...
| |
|____components           # [[多个页面复用的基础组件集合]]
| |____biz-dumb           # 业务相关展示型组件
| |____biz-smart          # 业务相关容器型组件
| |____dumb               # 非业务相关展示型组件（通常会基于UI库定制一些可复用组合）
| |____smart              # 非业务相关容器型组件（剥离了业务的容器组件可以沉淀到此，后期可单独发npm包共享）
|
|____pages                # [[router component]]
| |____PageFoo
|   |____ model           # 当前页面的model定义，方便就近打开就近查看（定义可见models/global）
|   |____ dumb            # 当前页面的一些业务笨组件（如果出现多个页面重用则可以进一步调整到components/dumb下）
|   |____ HeaderArea.tsx  
|   |____ BodyArea.tsx
|   |____ SearchArea.tsx
|   |____ index..tsx      # 页面组件导出文件，注意第一行需要 import ./model 触发model配置
|
|____types                # 类型定义目录
| |____store              # store相关的各种类型推导文件(这是一个固定的文件，无需用户改动)
| |____mods               # 模型推导辅助文件，无需用户修改
| |____ev-map             # 事件相关的类型定义
| |____domain             # 业务领域相关的对象类型定义，通常是后端返回的对象
| |____biz                # 其他一些全局通用的前端定义的对象类型
|
|
|____services             # [[services，涉及业务io相关、业务通用逻辑相关下沉到此处]]
| |____domain             # 领域模型相关服务
| | |____user
| | |____ticket
| |____common-func        # 和领域无关的基础业务函数集合
| |____http               # 其他业务基础服务
| |____...
```