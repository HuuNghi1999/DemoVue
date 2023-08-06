<script setup lang="ts">
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const { loading } = defineProps(['loading']);
</script>
<template>
  <div v-if="loading">
    <loading :active="loading" :canCancel="false" />
  </div>
</template>


