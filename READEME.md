# 这是一个学习webpack的项目

### 核心模块
webpack-cli webpack webpack-devServer

### 构建流程
- 找入口(entry)&解析工作
  - 单入口 字符串形式 './index.js'
  - 多入口 数组形式 ['./index.js','./masp.js'] 
  - 指定多入口 对象形式 {home: './home.js',about: './about.js'}
- 解析依赖，形成依赖图 depsGraph
**举例**
`比如以index.js为入口，那么会解析index.js，递归遍历其所有的依赖形成一张依赖图`

### 模块解析(modules)
目标：识别对应文件，然后通过匹配对应loader解析成webpack能够认识的文件类型
- js babel-loader (swc esbuild rsbuild)
- ts (ts-loader)
- css (css-loader)
- 自定义loader

### 优化
- chunk
- 模块去重与合并
- 代码压缩(esbuild terser)
- tree sharking 把未使用到的内容移除掉

### 资源输出
- 根据配置的output进行出处
- 如果存在chunk，针对对应的chunk机制进行输出
- 写入文件系统 node fs模块能力

### 触发webpack钩子 tapable 定义
触发钩子函数

### HOT (热更新)
- 文件变化监听
- 局部模块更行
- 本地起一个ws服务，将更新内容抽象为一个json，并将这个json推送到客户端
- 更新状态&重新渲染