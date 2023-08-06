<script setup lang="ts">
import { useStore } from "vuex";
import { auth } from "./config";
import { AuthMutations, key } from "./store";
import './style.css'
import { Route } from "./utils";
import { useRouter } from "vue-router";

const store = useStore(key);
const router = useRouter();
auth.onAuthStateChanged((user) => {
	if (!user) {
		store.commit(AuthMutations.UPDATE_ACCOUNT, null);
		store.commit(AuthMutations.UPDATE_LOGGED, false);
		router.push({name: Route.LOGIN})
	}
});
</script>

<template>
	<router-view id="route"></router-view>
</template>
