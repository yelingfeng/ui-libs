<template>
  <t-layout-page>
    <t-layout-page-item>
      <div class="box-chart">
        <t-charts
        :options="opt"
        :data="echartData"
        chart-type="pie"
        sub-chart-type="pie02"
      />
      </div>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts" name="Pie">
const opt:any = {}
const echartData = [
  { value: '2879', name: '北京分中心' },
  { value: '806', name: '上海分中心' },
  { value: '723', name: '天津分中心' },
  { value: '546', name: '宁夏分中心' },
  { value: '454', name: '青岛分中心' },
  { value: '344', name: '沈阳分中心' },
  { value: '244', name: '新疆分中心' },
]

</script>
