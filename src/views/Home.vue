<template>
    <div class="home">
        <loading-cmp
            v-if="loading"
            :height="90"
            :width="90"
        >
            <div class="loading-text">loading...</div>
        </loading-cmp>
        <!-- 数据大屏 容器组件 -->
        <screen-container
            :options="{height:2160,width:3840}"
            v-else
        >
            <div class="header">
                <div class="logo-wapper">
                    <top-header />
                </div>
            </div>
            <div class="separator" />
            <div class="center">
                <div class="left">
                    <div class="left1">
                        <total-user
                            :today-user="todayUser"
                            :growth-lastDay="growthLastDay"
                            :growth-lastMonth="growthLastMonth"
                        />
                    </div>
                    <div class="left2">
                        <area-age
                            :data="ageData"
                            :avgAge="avgAge"
                        />
                    </div>
                    <div class="left3">
                        <total-device :data="deviceData" />
                    </div>
                    <div class="left4">
                        <total-genger :data="genderData" />
                    </div>
                    <div class="left5">
                        <total-sale :data="riderData" />
                    </div>
                    <div class="left6">
                        <hot-category :data="hotCategoryData" />
                    </div>
                </div>
                <div class="right">
                    <div class="right-top1">
                        <center-header :data="headerData" />
                    </div>
                    <div class="right-top2">
                        <transform-category />
                    </div>
                    <div class="right-bottom">
                        <div class="right-left">
                            <div class="right-left1">
                                <!-- <gdpChart /> -->
                                <!-- <xi-an-map /> -->
                                <order-map />
                            </div>
                            <div class="right-left2">
                                <transform-category
                                    :data="['订单量','销售额','用户数','退单量']"
                                    :color="['rgb(198,209,126)','rgb(116,166,49)']"
                                />
                            </div>
                            <div class="right-left3">
                              <fly-box starColor="rgb(251,253,142)" :duration="4"
                                lineColor="#eee"
                              >
                                <real-time-order :data="realTimeOrder"/>
                              </fly-box>
                            </div>
                            <div class="right-left4">
                              <sche-dule-view :data="scheduleView" />
                            </div>
                        </div>
                        <div class="right-right">
                            <div class="right-right1">
                                <sale-list :data="saleListData" />
                            </div>
                            <div class="right-right2">
                              <sale-rank :data="salesRank" />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </screen-container>
    </div>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */
import { onMounted, ref } from "vue";
import TopHeader from "../components/TopHeader";
import TotalUser from "../components/TotalUser";
import AreaAge from "../components/AreaAge";
import ScreenData from "../hooks/useScreenData";
import TotalDevice from "../components/TotalDevice";
import TotalGenger from "../components/TotalGenger";
import TotalSale from "../components/TotalSale";
import HotCategory from "../components/HotCategory";
import CenterHeader from "../components/CenterHeader";
import TransformCategory from "../components/TransformCategory";
import SaleList from "../components/SaleList";
// import gdpChart from "../components/GdpTimeLineChart";
import OrderMap from "../components/OrderMap";
import RealTimeOrder from "../components/RealTimeOrder"
import ScheDuleView from "../components/ScheDuleView"
import SaleRank from "../components/SaleRank"

export default {
  name: "Home",
  components: {
    TopHeader,
    TotalUser,
    AreaAge,
    TotalDevice,
    TotalGenger,
    TotalSale,
    HotCategory,
    CenterHeader,
    TransformCategory,
    SaleList,
    // gdpChart,
    OrderMap,
    RealTimeOrder,
    ScheDuleView,
    SaleRank
  },
  setup() {
    const loading = ref(false);
    onMounted(() => {
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    });
    return {
      ...ScreenData(),
      loading,
    };
  },
};
</script>
<style lang="scss">
.home {
  height: 100%;
  background: rgba(29, 29, 29);
  color: #fff;
  font-size: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .screen-container {
    display: flex;
    flex-direction: column;
    .header {
      height: 167px;
      .logo-wapper {
        height: 100%;
        width: 100%;
      }
    }
    .separator {
      height: 10px;
      background: rgb(92, 88, 89);
    }
    .center {
      flex: 1;
      display: flex;
      .left {
        flex: 0 0 860px;
        width: 860px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
        padding-bottom: 10px;
        .left1 {
          height: 300px;
        }
        .left2 {
          height: 320px;
        }
        .left3 {
          height: 280px;
        }
        .left4 {
          height: 230px;
        }
        .left5 {
          height: 360px;
        }
        .left6 {
          height: 360px;
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        .right-top1 {
          width: 100%;
          height: 206px;
        }
        .right-top2 {
          width: 100%;
          height: 48px;
          margin: 10px 0;
        }
        .right-bottom {
          flex: 1;
          display: flex;
          .right-left {
            display: flex;
            flex: 0 0 1917px;
            width: 1917px;
            flex-direction: column;
            // justify-content: space-between;
            .right-left1 {
              height: 999px;
            }
            .right-left2 {
              height: 80px;
            }
            .right-left3 {
              height: 350px;
            }
            .right-left4 {
              height: 220px;
            }
          }
          .right-right {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 10px;
            margin-right: 30px;
            .right-right1 {
              width: 100%;
              height: 999px;
            }
            .right-right2 {
              flex: 1;
              margin-top: 20px;
              width: 100%;
              // height: 650px;
            }
          }
        }
      }
    }
  }

  .loading-text {
    font-size: 20px;
  }
}
</style>
