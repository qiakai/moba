<template>
  <div class="page-article" v-if="model">
    <div class="d-flex">
      <div class="iconfont icon-Back"></div>
      <div class="flex-1">
        {{model.title}}
      </div>
      <div class="text-gray fs-xs">
        2021/3/19
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true },
  },
  data() {
    return {
      model: null,
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      
      this.model = res.model;
    },
  },
  created() {
    this.fetch();
  },
};
</script>
