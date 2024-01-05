import DefaultTheme from 'vitepress/theme'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import locale from "element-plus/es/locale/lang/zh-cn"
// 图标并进行全局注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { VPDemo } from '../vitepress'
// 基于element-plus二次封装基础组件
import Pandoralibs from '../../../packages'
import '../../public/css/index.css'

import * as core from 'echarts/core'
import * as renderers from 'echarts/renderers'
import * as charts from 'echarts/charts'
import * as components from 'echarts/components'

const { use } = core
const { CanvasRenderer } = renderers
const {
  BarChart,
  LineChart,
  LinesChart,
  PieChart,
  MapChart,
  PictorialBarChart,
  ScatterChart,
  GraphChart,
  GaugeChart,
  EffectScatterChart,
  RadarChart,
} = charts
const {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  VisualMapComponent,
  DataZoomComponent,
  GraphicComponent,
} = components

use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  VisualMapComponent,
  DataZoomComponent,
  GraphicComponent,
  LegendComponent,
  BarChart,
  LineChart,
  LinesChart,
  PieChart,
  GraphChart,
  MapChart,
  ScatterChart,
  PictorialBarChart,
  GaugeChart,
  EffectScatterChart,
  RadarChart,
  CanvasRenderer,
])



export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    // 注册ElementPlus
    ctx.app.use(ElementPlus, {
      locale, // 语言设置
    })
    // 注册所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      ctx.app.component(key, component)
    }
    // 全局注册基础组件
    ctx.app.use(Pandoralibs)

    ctx.app.component('Demo', VPDemo)
  },
}
