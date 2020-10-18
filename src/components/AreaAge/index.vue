<template>
    <div class="m-area-age">
        <div class="title-wrapper">
            <div class="average-age-left">
                <div class="title">用户年龄分布&平均年龄</div>
                <div class="sub-title">Distribution of Age</div>
            </div>
            <div class="average-age-right">
                <div class="age">
                    <count-to
                        :start-val="startAge"
                        :end-val="avgAge"
                        :duration="1000"
                        :decimals="2"
                    />
                    <span class="age-unit">岁</span>
                </div>
            </div>
        </div>
        <div class="average-age-chart">
            <qa-charts :options="options" />
        </div>
        <div class="average-data-wrapper">
            <div
                class="average-data"
                v-for="(item, index) in data"
                :key="index"
            >
                <div class="average-data-value">
                    <count-to
                        :start-val="item.startValue"
                        :end-val="item.value"
                        :duration="1000"
                    />
                </div>
                <div class="average-data-axis">
                    <div
                        class="point"
                        :style="{background: item.color}"
                    />
                    <div class="text">{{item.axis}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { onMounted, ref, watch } from "vue";
export default {
  name: "AreaAge",
  props: {
    data: Array,
    avgAge: Number,
  },
  setup(props) {
    const startAge = ref(0);
    const options = ref(null);
    const updateChart = () => {
      const data = [];
      const colors = [];
      const axis = [];
      let max = 0;
      props.data.forEach((item) => {
        max += +item.value;
        data.push(item.value);
        axis.push(item.axis);
        colors.push(item.color);
      });
      options.value = {
        color: colors,
        tooltip: {
          textStyle: {
            fontSize: 20,
          },
          padding: 10,
        },
        grid: {
          top: 20,
          left: 20,
        },
        dataset: {
          source: [axis, data],
        },
        yAxis: {
          type: "category",
        },
        xAxis: {
          // show: false,
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {},
            color: "rgb(98,105,113)",
            fontSize: 18,
          },
          axisTick: { show: false },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgb(50,51,53)",
            },
          },
          splitLine: {
            show: false,
          },
          max: max,
        },
        series: [
          {
            type: "bar",
            stack: "bar",
            barWidth: 10,
          },
          {
            type: "bar",
            stack: "bar",
          },
          {
            type: "bar",
            stack: "bar",
          },
          {
            type: "bar",
            stack: "bar",
          },
        ],
      };
    };
    watch(
      () => props.data,
      () => {
        // data变化options变化
        updateChart();
      }
    );
    watch(
      () => props.avgAge,
      (cur, pre) => {
        startAge.value = pre;
      }
    );
    onMounted(() => {
      updateChart();
    });
    return {
      startAge,
      options,
    };
  },
};
</script>
<style lang="scss" scoped>
.m-area-age {
  width: 100%;
  height: 100%;
  background: rgb(43, 44, 46);
  padding: 20px 40px;
  box-sizing: border-box;

  .title-wrapper {
    display: flex;
    align-items: center;

    .average-age-left {
      .title {
        font-size: 32px;
      }

      .sub-title {
        font-size: 16px;
        margin-top: 10px;
      }
    }

    .average-age-right {
      flex: 1;
      margin-left: 40px;
      font-weight: bold;

      .age {
        font-size: 68px;
        font-family: DIN;

        .age-unit {
          font-size: 20px;
        }
      }
    }
  }

  .average-age-chart {
    height: 120px;
    // background: red;
  }

  .average-data-wrapper {
    display: flex;

    .average-data {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      font-weight: bolder;

      .average-data-value {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }

      .average-data-axis {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-top: 5px;

        .point {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .text {
          margin-left: 10px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>