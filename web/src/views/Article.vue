<template>
  <div class="page-article">
    <div class="d-flex">
      <div class="iconfont icon-Back"></div>
      <div class="flex-1">
        {{id}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  }
}
</script>
