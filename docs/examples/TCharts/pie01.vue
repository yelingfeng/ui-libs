<template>
  <t-layout-page>
    <t-layout-page-item>
      <div class="box-chart">
        <t-charts
        :options="opt"
        :data="echartData"
        chart-type="pie"
        sub-chart-type="pie01"
      />
      </div>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts" name="Pie">
const opt:any = {}
const echartData:any = [
  {
    name: 'A类',
    value: '3720',
  },
  {
    name: 'B类',
    value: '2920',
  },
  {
    name: 'C类',
    value: '2200',
  },
  {
    name: 'D类',
    value: '1420',
  },
  {
    name: 'E类',
    value: '3200',
  },
  {
    name: 'F类',
    value: '2420',
  },
  {
    name: 'G类',
    value: '2200',
  },
  {
    name: 'H类',
    value: '1420',
  },
  {
    name: 'I类',
    value: '3200',
  },
  {
    name: 'J类',
    value: '2420',
  },
]
</script>
