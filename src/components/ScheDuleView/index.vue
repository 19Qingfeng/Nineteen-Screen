<template>
    <div class="m-schedule-view">
        <!-- 日历图 -->
        <qa-charts :options="options" />
    </div>
</template>
<script>
import Echarts from "echarts";
import { onMounted, ref } from "vue";
export default {
  name: "ScheDuleView",
  props: {
    data: {
      type: Object,
    },
  },
  /* eslint-disable */
  setup() {
    const options = ref({});
    function getVirtualData(year) {
      year = year || "2020";
      //   Echarts 提供APi获得 当前年份
      const date = +Echarts.number.parseDate(year + "-06-01");
      //   console.log(date,'date')时间戳 开始时间
      const end = +Echarts.number.parseDate(+year + 1 + "-12-31");
      //   console.log(end,'end') 结束时间戳
      const dayTime = 3600 * 24 * 1000;
      const data = [];
      for (let time = date; time < end; time += dayTime) {
        data.push([
          Echarts.format.formatTime("yyyy-MM-dd", time), // time变成yyyy-mm-dd
          Math.floor(Math.random() * 10000),
        ]);
      }
      return data;
    }

    const updateChart = () => {
      const data = getVirtualData(2020);
      console.log("执行");
      options.value = {
        calendar: [
          {
            top: 30,
            left: 80,
            right: 40,
            bottom: 10,
            range: ["2020-06-01", "2020-12-31"],
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgb(127, 127, 127)",
              },
            },
            yearLabel: { show: false },
            dayLabel: {
              color: "rgb(127, 127, 127)",
              fontSize: 18,
            },
            monthLabel: {
              color: "rgb(127, 127, 127)",
              fontSize: 18,
            },
            itemStyle: {
              color: "rgb(48, 48, 48)",
              borderWidth: 1,
              borderColor: "rgb(48, 48, 48)",
            },
          },
        ],
        series: [
          {
            name: "步数",
            type: "scatter",
            coordinateSystem: "calendar",
            data: data,
            symbolSize: function (val) {
              return val[1] / 600;
            },
            itemStyle: {
              color: "rgb(208,248,138)",
            },
          },
          {
            name: "Top 12",
            type: "effectScatter",
            coordinateSystem: "calendar",
            data: data
              .sort(function (a, b) {
                return b[1] - a[1];
              })
              .slice(0, 12),
            symbolSize: function (val) {
              return val[1] / 500;
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
            },
            hoverAnimation: true,
            itemStyle: {
              color: "rgb(208,248,138)",
              shadowBlur: 10,
              shadowColor: "#333",
            },
            zlevel: 1,
          },
        ],
      };
    };
    onMounted(() => {
      updateChart();
    });
    return {
      options,
    };
  },
};
</script>
<style lang="scss" scoped>
.m-schedule-view {
  height: 100%;
  width: 100%;
}
</style>