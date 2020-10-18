<template>
    <div class="m-sale-list">
        <base-scrollList :config="config" />
    </div>
</template>
<script>
import { ref, onMounted } from "vue";
export default {
  name: "SaleList",
  props: {
    data: Array,
  },
  setup(props) {
    const config = ref({});
    /* 
    const defaultConfig = {
  headerData: [],
  headerStyle: [],
  headerBg: "rgb(90,90,90)",
  headerHeight: 48,
  headerIndex: false,
  headerIndexContext: "#",
  headerAlign: "center",
  headerFontSize: 32,
  headerColor: "#fff",
  headerIndexContextStyle: {
    color: "green",
    width: "20px",
  },
  data: [],
  rowNumber: 10, // 每页显示行数
  // 序号列内容的样式
  rowIndexStyle: {
    color: "red",
  },
  // 表体样式
  rowStyle: [{ color: "green" }],
  // 奇偶行背景颜色
  rowBg: ["rgb(40,40,40)", "rgb(55,55,55)"],
  rowFontSize: 28,
  rowColor: "#000",
  rowsAlign: "center",
  moveItems: 1,
  duration: 2,
}; */
    const update = () => {
      const data = [];
      const headerIndexData = [];
      /* eslint-disable */
      for (let [key, value] of props.data.entries()) {
        data[key] = [];
        if (key % 2 == 0) {
          // 偶数咧
          headerIndexData.push(`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
            <div style="width:15px;height:15px;background:rgb(72,122,72);border-radius:50%;border:1px solid #fff;"/>
          </div>`);
        } else {
          // 奇数列
          headerIndexData.push(`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
            <div style="width:15px;height:15px;background:rgb(38,88,104);border-radius:50%;border:1px solid #fff;"/>
          </div>`);
        }
        for (let j = 0; j < 5; j++) {
          let text = "";
          switch (j) {
            case 0:
              text = props.data[key].order;
              break;
            case 1:
              text = props.data[key].shop;
              break;
            case 2:
              text = props.data[key].rider;
              break;
            case 3:
              text = props.data[key].newShop;
              break;
            case 4:
              text = props.data[key].avgOrder;
              break;
            default:
          }
          if (j === 1 || j === 3) {
            data[key].push(`<div style="color:rgb(178,209,126)">${text}</div>`);
          } else {
            data[key].push(`<div>${text}</div>`);
          }
        }
      }

      config.value = {
        headerData: [
          "城市订单量",
          "店铺数量",
          "每日接单人数",
          "新增加数量",
          "人均购买量",
        ],
        headerStyle: [],
        headerHeight: 55,
        headerFontSize: 24,
        headerIndex: true,
        headerIndexData,
        headerIndexContextStyle: { width: "50px" },
        headerIndexContext: "",
        rowFontSize: 24,
        data,
      };
    };
    onMounted(() => {
      update();
    });
    return {
      config,
    };
  },
};
</script>
<style lang="scss" scoped>
.m-sale-list {
  height: 100%;
  width: 100%;
}
</style>