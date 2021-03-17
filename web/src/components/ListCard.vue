<template>
  <m-card :icon="icon" :title="title">
    <div class="nav jc-between">
      <div class="nav-item" :class="{ active: false }">
        <div class="nav-link">热门</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper>
        <swiper-slide v-for="m in 5" :key="m">
          <div class="py-2" v-for="n in 5" :key="n">
            <span>[新闻]</span>
            <span>|</span>
            <span>第三届王者荣耀全国大赛——安徽省再次启航！</span>
            <span>03/12</span>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    categories: { type: Array, required: true },
  },
};
</script>