<template>
    <div class="m_top_header">

        <div class="logo-text">
            <div class="cn-title">年度业务数据大盘</div>
            <div class="zn-title">2019 Year Business Data Market</div>
        </div>
        <div class="logo-wapper">
            <draw-logo />
        </div>
        <div class="earth">
            <qa-charts :options="options" />
        </div>
    </div>
</template>
<script>
import { onMounted, ref } from "vue";
import "echarts-gl";
export default {
  name: "TopHeader",
  setup() {
    const options = ref({
      globe: {},
    });
    const baseUrl = "./assets/";
    onMounted(() => {
      options.value = {
        globe: {
          // left:'80%',
          environment: `${baseUrl}star-bg.jpg`, // 地图背景
          baseTexture: `${baseUrl}datav-gl-texture.jpg`, // 地图纹理
          heightTexture: `${baseUrl}datav-gl-texture.jpg`, // 地图高度纹理凹凸
          displacementScale: 0.02, // 地球顶点位置 更加立体
          shading: "realistic", // 地球渲染着色
          // 后期处理
          postEffect: {
            enable: true,
          },
          // 光照
          light: {
            // 主光源
            main: {
              // 强度
              intensity: 5,
              shadow:true
            },
          },
        },
      };
    });
    return {
      options,
    };
  },
};
</script>
<style lang="scss" scoped>
.m_top_header {
  height: 100%;
  width: 100%;
  font-size: 48px;
  position: relative;
  // padding-right: 200px;
  background-image: url("../../assets/star-bg.jpg");
  box-sizing: border-box;
  display: flex;
  .earth {
    height: 100%;
    // flex: 0 0 480px;
    flex: 1;
  }
  .logo-wapper {
    right:0;
    
    position: absolute;
    z-index: 99;
    // width: ;
    width: 800px !important;
    padding: 20px;
    box-sizing: border-box;
  }
  .logo-text {
    position: absolute;
    z-index: 99;
    top:50%;
    margin-top:-70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    // flex: 1;
    flex: 0 0 800px;
    .cn-title {
      color: rgb(255, 255, 255, 0.8);
      font-weight: bold;
      font-size: 60px;
      letter-spacing: 2px;
    }
    .zn-title {
      color: rgba(255, 255, 255, 0.6);
      font-size: 30px;
      font-style: italic;
      letter-spacing: 2px;
    }
  }
}
</style>