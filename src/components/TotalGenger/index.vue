<template>
    <div class="total-gender">
        <div class="total-gender-wrapper">
            <div class="total-gender-left">
                <img src="https://www.youbaobao.xyz/datav-res/datav/datav_circle.png">
            </div>
            <div class="total-gender-right">
                <div class="title">男性用户人数</div>
                <div class="sub-title">Number of male users</div>
                <div class="age">
                    <count-to
                        :startVal="malePreUser"
                        :endVal="maleUser"
                        :duration="1000"
                    />
                    <span class="age-unit">万人</span>
                </div>
            </div>
        </div>
        <div class="total-gender-wrapper">
            <div class="total-gender-left">
                <img src="https://www.youbaobao.xyz/datav-res/datav/datav_circle.png">
            </div>
            <div class="total-gender-right">
                <div class="title">女性用户人数
                    <div class="sub-title">Number of female users</div>
                    <div class="age">
                        <count-to
                            :startVal="femalePreUser"
                            :endVal="femaleUser"
                            :duration="1000"
                        />
                        <span class="age-unit">万人</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, watch } from "vue";
export default {
  name: "TotalGender",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const malePreUser = ref(props.data[0].value);
    const femalePreUser = ref(props.data[1].value);
    const maleUser = ref(props.data[0].value);
    const femaleUser = ref(props.data[1].value);
    watch(
      () => props.data,
      (cur, pre) => {
        malePreUser.value = pre[0].value;
        femalePreUser.value = pre[1].value;
      },
      {
        deep: true,
      }
    );
    return {
      malePreUser,
      femalePreUser,
      maleUser,
      femaleUser,
    };
  },
};
</script>
<style lang="scss" scoped>
.total-gender {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  background: rgb(43, 44, 46);
  box-sizing: border-box;

  .total-gender-wrapper {
    display: flex;

    .total-gender-left {
      img {
        width: 75px;
        height: 75px;
      }
    }

    .total-gender-right {
      margin-left: 40px;

      .title {
        font-size: 32px;
      }

      .sub-title {
        font-size: 16px;
        margin-top: 10px;
      }

      .age {
        font-size: 49px;
        font-family: DIN;
        font-weight: bold;
        margin-top: 10px;

        .age-unit {
          font-size: 20px;
        }
      }
    }
  }
}
</style>