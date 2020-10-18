<template>
    <div class="m-total-device">
        <div class="total-device-left">
            <!-- <div id="total-device-chart"> -->
            <qa-charts :options="chartOptions" />
            <!-- </div> -->
        </div>
        <div class="total-device-right">
            <div class="title-wrapper">
                <div class="total-device-right-left">
                    <div class="title">用户登录设备</div>
                    <div class="sub-title">Distribution of Internet devices</div>
                </div>
                <div class="total-device-right-right">
                    <div class="age">
                        <count-to
                            :startVal="startTotal"
                            :endVal="endTotal"
                            :duration="1000"
                        />
                        <span class="age-unit">台</span>
                    </div>
                </div>
            </div>
            <div class="average-data-wrapper">
                <div
                    class="average-data"
                    v-for="(item, index) in categoryData"
                    :key="index"
                >
                    <div class="average-data-value">
                        <count-to
                            :startVal="item.startValue"
                            :endVal="item.value"
                            :duration="1000"
                        />
                    </div>
                    <div class="average-data-axis">
                        <div
                            class="point"
                            :style="{background: item.color}"
                        />
                        <div class="text">{{item.name}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { computed, ref, watch } from "vue";
export default {
  name: "TotalDevice",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  /* eslint-disable */
  setup(props) {
    const total = props.data.totalDevices;
    const devices = props.data.devices;
    const startTotal = ref(0);
    const endTotal = ref(total);
    const chartOptions = ref(null);
    const color = ["rgb(176,207,120)", "rgb(157,195,91)", "rgb(131,167,72)"];
    const categoryData = computed(() => {
      return devices.map((item, index) => {
        return {
          color: color[index],
          name: item.key,
          value: item.value,
        };
      });
    });
    const initCharts = (data) => {
      if (!data) return null;
      const options = {
        grid: {
          top: 0,
          left: 0,
        },

        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "80%",
            center: ["50%", "50%"],
            data: data.map((item, index) => {
              return {
                name: item.key,
                value: item.value,
                itemStyle: {
                  color: color[index],
                },
              };
            }),
            roseType: "radius",
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              color: "#c23531",
              shadowBlur: 200,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
            selectedMode: "multiple",
            selectedOffset: 10,
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function (idx) {
              return Math.random() * 200;
            },
          },
        ],
      };
      chartOptions.value = options;
    };

    watch(
      () => devices,
      (cur, pre) => {
        initCharts(cur);
      },
      {
        immediate: true,
      }
    );

    watch(
      () => total,
      (cur, pre) => {
        startTotal.value = pre;
      }
    );
    return {
      startTotal,
      endTotal,
      categoryData,
      chartOptions,
    };
  },
};
</script>
<style lang="scss" scoped>
.m-total-device {
  display: flex;
  width: 100%;
  height: 100%;
  background: rgb(43, 44, 46);

  .total-device-left {
    width: 30%;
    height: 100%;

    #total-device-chart {
      width: 100%;
      height: 100%;
    }
  }

  .total-device-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 40px 10px 40px 0;

    .title-wrapper {
      display: flex;
      align-items: center;

      .total-device-right-left {
        .title {
          font-size: 32px;
        }

        .sub-title {
          font-size: 16px;
          margin-top: 10px;
        }
      }

      .total-device-right-right {
        flex: 1;
        margin-left: 40px;
        font-weight: bold;

        .age {
          font-size: 56px;
          font-family: DIN;

          .age-unit {
            font-size: 20px;
          }
        }
      }
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
          width: 100%;
        }

        .average-data-axis {
          display: flex;
          align-items: center;
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
}
</style>