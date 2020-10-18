<template>
    <div class="country-category">
        <div
            class="category"
            v-for="(item,index) in data"
            :key="item"
            @click="onClick(index)"
            @mouseenter="onMouseenter(index)"
            @mouseleave="onMouseleave"
            @mousemove="onMouseenter(index)"
        >
            <div
                v-if="selected === index"
                class="selected"
                :style="{'background':color[0]}"
            >{{item}}</div>
            <div
                v-else-if="hover === index"
                class="hovered"
                :style="{'background':color[1]}"
            >
                {{item}}
            </div>
            <div v-else>{{item}}</div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
export default {
  name: "TransformCategory",
  props: {
    data: {
      type: Array,
      default: () => ["北京", "上海", "深圳", "杭州", "广东", "西安", "南京"],
    },
    duration: {
      type: [Number, String],
      default: 2,
    },
    color: {
      type: Array,
      default: () => {
        return ["rgb(140, 160, 173)", "rgb(80, 80, 80)"];
      },
    },
  },
  setup(props) {
    const selected = ref(0);
    const hover = ref(-1);
    let task = null;
    const transformCategory = () => {
      if (selected.value + 1 === props.data.length) {
        selected.value = 0;
      } else {
        selected.value++;
      }
    };
    const onMouseenter = (index) => {
      hover.value = index;
    };
    const onMouseleave = () => {
      hover.value = -1;
    };
    const onClick = (index) => {
      console.log(index, "index");
      selected.value = index;
    };
    onMounted(() => {
      task && clearInterval(task);
      task = setInterval(() => {
        transformCategory();
      }, 1000 * props.duration);
    });
    onUnmounted(() => {
      clearInterval(task);
    });
    return {
      selected,
      hover,
      onClick,
      onMouseleave,
      onMouseenter,
    };
  },
};
</script>

<style lang="scss" scoped>
.country-category {
  display: flex;
  width: 100%;
  height: 100%;

  .category {
    flex: 1;
    background: rgb(53, 57, 65);
    font-size: 24px;
    color: rgb(144, 160, 174);

    .hovered {
      background: rgb(80, 80, 80);
    }

    .selected {
      background: rgb(140, 160, 173);
      color: #fff;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>