<template>
    <div class="m-xi-an-map">
        <qa-charts :options="options" />
    </div>
</template>
<script>
import { onMounted, ref } from "vue";
import echarts from "echarts";
import mapJson from "./map.json";
export default {
  setup() {
    const options = ref({});
     const center = ref({})
      const getCenter = () => {
        // 获得每个城市中心点
        for (let i of mapJson.features) {
          const { name, cp } = i.properties;
          center.value[name] = cp
        }
      };
    onMounted(() => {
      echarts.registerMap("xiAnProvide", mapJson); // 注册地图
      getCenter();
      console.log(center.value,'center')
      options.value = {
        geo: [
          {
            map: "xiAnProvide", // 使用自定义地图
            zoom: 1, // 默认显示级别
            roam: false, // 启动鼠标滚轮地图缩放
            scaleLimit: {
              min: 0,
              max: 3,
            }, // 控制最大和最小缩放比例(控制zoom)
            itemStyle: {
              areaColor: "#013c62", // 地图颜色
              shadowColor: "#013c62", // 阴影颜色
              shadowBlur: 20, // 阴影模糊度
              shadowOffsetX: -5,
              shadowOffsetY: 15,
            },
          },
        ],
      };
    });
    return {
      options,
    };
  },
};
</script>
<style lang="scss" scoped>
.m-xi-an-map {
  height: 100%;
  width: 100%;
}
</style>