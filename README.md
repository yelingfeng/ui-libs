# ui-libs

## npm 方式安装使用

```shell
npm i @pandora/ui-libs
```

## 全局注册使用

> ### 前提条件：使用项目必须全局注册 Element-plus组件库

```js
// 在main.js中按下引入
import PandoraUiLibs from '@pandora/ui-libs'
import '@pandora/ui-libs/lib/style.css'
Vue.use(PandoraUiLibs)
```

## 按需引入

```js
// 在main.js中按下引入
import '@pandora/ui-libs/lib/style.css'
// 单个.vue文件引入
<script setup lang="ts">
  import {TDetail, TForm} from "@pandora/ui-libs"
</script>
```

## t-ui-plus Volar 组件类型提示

```js
// 需要在使用的项目的tsconfig.json文件中添加以下
compilerOptions：{
  "types": [
      "@pandora/ui-libs/components.d.ts",
    ],
}

```
## Vue3 + Vite项目中安装引入报如下错误的解决方法
> #### 把项目的vite版本升级到4+


