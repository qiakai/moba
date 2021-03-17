<template>
  <div>
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg"
          alt=""
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/b9905b35bb0afa9050d9ddbe04d82d29.jpeg"
          alt=""
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/ddc8c8922cbb694dfb73c86bb03fce22.jpeg"
          alt=""
        />
      </swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-3"
        slot="pagination"
      ></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center text-grey-1 pt-3">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm d-flex ai-center jc-center">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->

    <m-card-list icon="menu1" title="新闻资讯" :categories="newsCates">
      <div class="py-2" v-for="n in 5" :key="n">
        <span>[新闻]</span>
        <span>|</span>
        <span>第三届王者荣耀全国大赛——安徽省再次启航！</span>
        <span>03/12</span>
      </div>
    </m-card-list>
    <m-card icon="card-hero" title="英雄列表"> </m-card>
    <m-card icon="menu1" title="精彩视频"> </m-card>
    <m-card icon="news" title="图文攻略"> </m-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".pagination-home",
        },
        // Some Swiper option/callback...
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
      },
      newsCates: [
        {
          name: "热门",
          newsList: new Array(5).fill(1).map(() => ({
              categoryName:'公告',
              title:'3月17日净化游戏环境声明及处罚公告',
              date:'03/17'
            }))
        },
      ]
    };
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($map: $colors, $key: "white");
    &.swiper-pagination-bullet-active {
      background: map-get($map: $colors, $key: "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-left: 1px solid $border-color;
    &:nth-child(4n + 1) {
      border-left: none;
    }
  }
}
</style>
