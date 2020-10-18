<template>
    <div class="m-total-sale">
        <div class="title-wrapper">
            <div class="zh">
                用户销售骑手概况
            </div>
            <div class="en">
                Rider Growth rate
            </div>
        </div>
        <div class="chart">
            <qa-charts :options="options" />
        </div>
    </div>
</template>
<script>
import { onMounted, onUnmounted, ref, watch } from "vue";
export default {
  name: "TotalSale",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  //   两个线图进行切换
  setup(props) {
    const options = ref(null);
    let currentChart = 0;
    let task = null;
    const colors = ["rgb(209,248,139)", "rgb(115,201,245)", "rgb(124,136,146)"];
    const updateChart = () => {
      const { axisX, orderData, rateData } = props.data;
      const axisData = axisX;
      let legendData = [];
      let data1 = [];
      let data2 = [];
      if (currentChart === 0) {
        legendData = [orderData.legend1, orderData.legend2];
        data1 = orderData.data1;
        data2 = orderData.data2;
      } else {
        legendData = [rateData.legend1, rateData.legend2];
        data1 = rateData.data1;
        data2 = rateData.data2;
      }
      options.value = {
        color: colors,
        legend: {
          top: 20,
          right: 40,
          icon: "rect",
          textStyle: {
            fontSize: 16,
            color: colors[2],
          },
          data: legendData,
        },
        grid: {
          top: 60,
          bottom: 30,
          left: 80,
          right: 40,
        },
        tooltip: {
          trigger: "none",
          axisPointer: {
            type: "cross",
          },
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[2],
              },
            },
            axisLabel: {
              fontSize: 16,
            },
            data: axisData,
          },
          {
            type: "category",
            axisTick: { show: false },
            axisLine: { show: false },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: { show: false },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[2],
              },
            },
            axisLabel: {
              fontSize: 16,
            },
            splitLine: {
              lineStyle: {
                type: "dotted",
              },
            },
          },
        ],
        series: [
          {
            name: legendData[0],
            type: "line",
            xAxisIndex: 0,
            smooth: true,
            lineStyle: {
              width: 2,
            },
            symbol: "none",
            data: data1,
          },
          {
            name: legendData[1],
            type: "line",
            smooth: true,
            lineStyle: {
              width: 2,
            },
            symbol: "none",
            data: data2,
          },
        ],
      };
      //    改变图表
      if (currentChart === 0) {
        currentChart = 1;
      } else {
        currentChart = 0;
      }
    };
    onMounted(() => {
      updateChart();
    });
    const stop = watch(
      () => props.data,
      () => {
        updateChart();
        // 一秒更新一次
        task = setInterval(() => {
          updateChart();
        }, 5000);
        stop(); // 清除监听 props本身就是动态的 所以会实时更新
      },
      { deep: true }
    );
    onUnmounted(() => {
      // 卸载的时候清除了task
      if (task) clearInterval(task);
    });
    return {
      options,
    };
  },
};
</script>
<style lang="scss" scoped>
.m-total-sale {
  width: 100%;
  height: 100%;
  background: rgb(43, 44, 46);

  .title-wrapper {
    padding: 20px 40px 0;
    box-sizing: border-box;

    .zh {
      font-size: 32px;
    }

    .en {
      font-size: 16px;
      margin-top: 10px;
    }
  }

  .chart {
    width: 100%;
    height: 250px;
  }
}
</style>