# CEBRAIN
工程脑后台cms开发


## 结构
│  .babelrc
│  .editorconfig
│  .gitignore
│  index.html
│  package.json 		依赖
│  postcss.config.js
│  README.md
│  theme.less 			antd主题配置
│  
├─conf 					打包配置
│      
├─dist 					生产环境文件夹
│
├─node_modules
└─src
    │  App.js      		根视图
    │  main.js     		入口
    │  routes.js   		路由
    │  
    ├─api          		接口统一管理
    │      
    ├─assets			静态文件夹
    │  ├─css			样式
    │  │          
    │  ├─fonts			字体
    │  ├─img 			图片
    │  ├─less			样式
    │  │      
    │  └─libs			类库
    ├─components		组件
    │          
    ├─config			全局配置
    │      
    └─views				路由视图


## 开发
1. 静态文件夹全部放在`assets`中对应的文件夹
2. 组件文件放在`/src/components`中
3. 项目全局配置在`/src/config/index.js`
4. 路由入口文件放在在`/src/views`
5. 接口统一在`/src/api/index.js`中配置

```
git clone https://git.oschina.net/szewec_yf1_fed/cebrain.git

cd cebrain

npm install

npm run start
```

## 打包与本地服务器预览
```
npm run build

npm run server
```
