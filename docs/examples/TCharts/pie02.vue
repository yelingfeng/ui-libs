<template>
  <t-layout-page>
    <t-layout-page-item>
      <div class="box-chart">
        <t-radio v-model="value" :options="options" @change="changeRadio" />
        <t-charts
          ref="charts"
          :options="opt"
          :data="echartData"
          chart-type="pie"
          sub-chart-type="pie02"
          :isSelect="isSelect"
        />
      </div>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts" name="Pie02">
import { shallowRef, onMounted, ref, computed } from 'vue'
const charts: any = shallowRef(null)
const opt: any = {}

const isSelect: any = computed(() => {
  return value.value == 1
})

const value = ref(1)
const options: any = ref([
  { label: '默认选中', value: 1 },
  { label: '默认不选中', value: 2 },
])

const changeRadio = (val) => {
  console.log(isSelect.value)
}

const echartData = [
  { value: '2879', name: '北京分中心' },
  { value: '806', name: '上海分中心' },
  { value: '723', name: '天津分中心' },
  { value: '546', name: '宁夏分中心' },
  { value: '454', name: '青岛分中心' },
  { value: '344', name: '沈阳分中心' },
  { value: '244', name: '新疆分中心' },
]
onMounted(() => {
  charts.value.pieDefaultSelect(0)
})
</script>
