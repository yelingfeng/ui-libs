<script lang="ts">
import {
  onMounted,
  onBeforeUnmount,
  ref,
  inject,
  h,
  Vue2,
  computed,
  watch,
  watchEffect,
  toRefs,
  shallowRef,
  nextTick,
  defineComponent,
  getCurrentInstance,
  type InjectionKey,
} from 'vue-demi'
import * as core from 'echarts/core'
const { init } = core

import type {
  EChartsType,
  ThemeInjection,
  ChartsOption,
  InitOptionsInjection,
  UpdateOptions,
  UpdateOptionsInjection,
  Emits,
} from './types'
import { omitOn, unwrapInjected } from './utils'
import { build } from './utils/core'
import {
  register,
  TAG_NAME,
  type EChartsElement,
} from './utils/wc'

import {
  usePublicAPI,
  useAutoresize,
  useLoading,
  useEventListener,
} from './hooks'

import { defaultProps } from './props'

const wcRegistered = register()

if (Vue2) {
  Vue2.config.ignoredElements.push(TAG_NAME)
}
export const THEME_KEY =
  'ecTheme' as unknown as InjectionKey<ThemeInjection>
export const INIT_OPTIONS_KEY =
  'ecInitOptions' as unknown as InjectionKey<InitOptionsInjection>
export const UPDATE_OPTIONS_KEY =
  'ecUpdateOptions' as unknown as InjectionKey<UpdateOptionsInjection>

export default defineComponent({
  name: 'TCharts',
  inheritAttrs: false,
  props: defaultProps,
  emits: {} as unknown as Emits,
  setup(props, { attrs }) {
    const root = shallowRef<EChartsElement>()
    const chart = shallowRef<EChartsType>()
    const manualOption = shallowRef<ChartsOption>()

    // 取父类传过来的值
    const defaultTheme = inject(THEME_KEY, null)
    const defaultInitOptions = inject(
      INIT_OPTIONS_KEY,
      null
    )
    const defaultUpdateOptions = inject(
      UPDATE_OPTIONS_KEY,
      null
    )
    const {
      autoresize,
      manualUpdate,
      loading,
      loadingOptions,
      data,
      chartType,
      subChartType,
      isSelect
    } = toRefs(props)

    const realTheme = computed(
      () => props.theme || unwrapInjected(defaultTheme, {})
    )
    const realSelected = computed(
      () => props.isSelect
    )

    const realOption = computed(
      () => manualOption.value || props.options || null
    )
    const realInitOptions = computed(
      () =>
        props.initOptions ||
        unwrapInjected(defaultInitOptions, {})
    )
    const realUpdateOptions = computed(
      () =>
        props.updateOptions ||
        unwrapInjected(defaultUpdateOptions, {})
    )

    const nonEventAttrs = computed(() => omitOn(attrs))

    const listeners = getCurrentInstance()?.proxy?.$listeners || {}


    function initCore(option?: ChartsOption) {
      if (!root.value) {
        return
      }
      const instance = (chart.value = init(
        root.value,
        realTheme.value,
        realInitOptions.value
      ))
      if (props.group) {
        instance.group = props.group
      }

      useEventListener(instance, attrs, listeners)

      function resize() {
        if (instance && !instance.isDisposed()) {
          instance.resize()
        }
      }

      function commit() {
        const opt = option || realOption.value
        if (opt) {
          const newopt = build(
            data.value,
            chartType.value,
            subChartType.value
          )
          instance.setOption(
            newopt,
            realUpdateOptions.value
          )
          if(isSelect.value){
              pieDefaultSelect(0)
          }
        }
      }
      if (autoresize.value) {
        // Try to make chart fit to container in case container size
        // is changed synchronously or in already queued microtasks
        nextTick(() => {
          resize()
          commit()
        })
      } else {
        commit()
      }
    }

    function setOption(
      option: ChartsOption,
      updateOptions?: UpdateOptions
    ) {
      if (props.manualUpdate) {
        manualOption.value = option
      }

      if (!chart.value) {
        initCore(option)
      } else {
        chart.value.setOption(option, updateOptions || {})
      }
    }

    function cleanup() {
      if (chart.value) {
        chart.value.dispose()
        chart.value = undefined
      }
    }

    let unwatchOption: (() => void) | null = null
    watch(
      manualUpdate,
      (manualUpdate) => {
        if (typeof unwatchOption === 'function') {
          unwatchOption()
          unwatchOption = null
        }

        if (!manualUpdate) {
          unwatchOption = watch(
            () => props.options,
            (option, oldOption) => {
              if (!option) {
                return
              }
              if (!chart.value) {
                initCore()
              } else {
                chart.value.setOption(option, {
                  // mutating `option` will lead to `notMerge: false` and
                  // replacing it with new reference will lead to `notMerge: true`
                  notMerge: option !== oldOption,
                  ...realUpdateOptions.value,
                })
              }
            },
            { deep: true }
          )
        }
      },
      {
        immediate: true,
      }
    )

    watch(
      [realTheme, realInitOptions,realSelected],
      () => {
        cleanup()
        initCore()
      },
      {
        deep: true,
      }
    )
    watchEffect(() => {
      if (props.group && chart.value) {
        chart.value.group = props.group
      }
    })


    watch(data, function (newval, oldval) {
      if (newval && newval.length) {
        setOption(
          build(newval, chartType.value, subChartType.value)
        )
      }
    })

    useLoading(chart, loading, loadingOptions)

    useAutoresize(chart, autoresize, root)

    const publicApi = usePublicAPI(chart)

    onMounted(() => {
      initCore()
    })

    onBeforeUnmount(() => {
      if (wcRegistered && root.value) {
        // For registered web component, we can leverage the
        // `disconnectedCallback` to dispose the chart instance
        // so that we can delay the cleanup after exsiting leaving
        // transition.
        root.value.__dispose = cleanup
      } else {
        cleanup()
      }
    })
    /**
     * 饼图动态选中方法
     * @param index
     */
    function pieDefaultSelect(index:number){
      const chartVM:any= chart.value

      // 渲染完成
      chartVM.on('finished', ()=> {
        //默认选中
        chartVM.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: index
            })
      });

      //hover选中
      chartVM.on('mouseover', function(e) {
        if (e.dataIndex != index) {
          chartVM.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: index
          })
        }
      })
      chartVM.on('mouseout', function(e) {
        index = e.dataIndex
        chartVM.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: e.dataIndex
        })
      })

      //点击选中
      chartVM.on('click', function(e) {
        if (e.dataIndex != index) {
          chartVM.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: index
          })
        }
        index = e.dataIndex
        chartVM.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: e.dataIndex
        })
      })
    }

    return {
      chart,
      root,
      nonEventAttrs,
      register,
      pieDefaultSelect,
      ...publicApi,
    }
  },
  render() {
    // Vue 3 and Vue 2 have different vnode props format:
    // See https://v3-migration.vuejs.org/breaking-changes/render-function-api.html#vnode-props-format
    const attrs = (
      Vue2
        ? { attrs: this.nonEventAttrs }
        : { ...this.nonEventAttrs }
    ) as any
    attrs.ref = 'root'
    attrs.class = attrs.class
      ? ['echarts'].concat(attrs.class)
      : 'echarts'
    return h(TAG_NAME, attrs)
  },
})
</script>
<style>
pandora-charts {
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 100px;
}
</style>
