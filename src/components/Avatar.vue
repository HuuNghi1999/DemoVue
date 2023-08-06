<script setup lang="ts">
const { url, size } = defineProps(["url", "size"]);
</script>
<template>
	<img
		:src="url"
		alt="Avatar"
		class="avatar"
		:class="{ small: size === 'small' }"
	/>
</template>
<style scoped>
.avatar {
	vertical-align: middle;
	width: 50px;
	height: 50px;
	border-radius: 50%;
}

.small {
	width: 20px;
	height: 20px;
}
</style>
