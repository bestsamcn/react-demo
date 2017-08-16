# React-demo

## 结构
```
│  .babelrc
│  .editorconfig
│  .gitignore
│  index.html                           模板
│  package.json
│  postcss.config.js
│  README.md
│  theme.less                           antd自定义主题
│  
├─conf                                  webpack配置
│      node.server.js                   生成环境预览
│      webpack.build.conf.js            生产环境
│      webpack.dev.conf.js              开发环境
│      
├─dist                                  生产目录
│  │  index.html
│  │  
│  └─assets                             静态文件
│      ├─css
│      │      
│      └─js
│              
├─node_modules                          开发依赖
│              
└─src
    │  App.js                           项目根组件
    │  main.js                          项目入口
    │  routes.js                        路由集合
    │  
    ├─api
    │      http.js                      ajax
    │      index.js                     接口集合
    │      service.js
    │      
    ├─assets                            静态文件目录
    │  ├─css
    │  │  └─user
    │  │          index.css
    │  │          
    │  ├─img
    │  └─less
    ├─components                        组件集合
    │  └─user                           视图组件集合
    │          Button.js
    │          index.js
    │          
    ├─config                            全局配置
    │      index.js
    │      
    ├─redux
    │  │  index.js
    │  │  
    │  ├─actions                        actions集合
    │  │      auth.js
    │  │      index.js
    │  │      
    │  ├─reducers                       reducers集合
    │  │      auth.js
    │  │      index.js
    │  │      
    │  └─types                          types集合
    │          auth.js
    │          index.js
    │          
    └─views                             视图集合
        └─user
                Add.js
                index.js
```


## 开发
1. 静态文件夹全部放在`assets`中对应的文件夹
2. 组件文件放在`/src/components`中
3. 项目全局配置在`/src/config/index.js`
4. 路由入口文件放在在`/src/views`
5. 接口统一在`/src/api/index.js`中配置

```
git clone https://github.com/bestsamcn/react-demo.git

cd react-demo

npm install

npm run start

```

## 打包与本地服务器预览
```
npm run build

npm run server
```
