<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import "../style.css";
import { validateEmail, validatePassword, Route } from "@/utils";
import { AuthActions, key } from "@/store";
import Loading from "@components/Loading.vue";

const input = ref({
	email: "",
	password: "",
});

const error = ref();
const store = useStore(key);
const router = useRouter();
const login = () => {
	if (!input.value.email && !input.value.password) {
		return (error.value = "You must complete all field");
	}
	if (!validateEmail(input.value.email)) {
		return (error.value = "Email is not valid");
	}
	if (!validatePassword(input.value.password)) {
		return (error.value =
			"Password must be at least 8 characters includes letters and numbers and not over 16 characters");
	}
	store.dispatch(AuthActions.LOGIN, input.value).then(() => {
		error.value = store.state.auth.error;
		if (!error.value) {
			navigateHome();
		}
	});
};

const navigateRegister = () => {
	router.push(Route.REGISTER);
};

const navigateHome = () => {
	router.push(Route.HOME);
};
</script>
<template>
	<div class="container" >
		<div class="content border">
			<form @submit.prevent="login">
				<h2 class="mb-3">Login</h2>
				<div class="input">
					<label for="email">Email address</label>
					<input
						class="form-control"
						type="text"
						name="email"
						placeholder="email@adress.com"
						v-model="input.email"
					/>
				</div>
				<div class="input">
					<label for="password">Password</label>
					<input
						class="form-control"
						type="password"
						name="password"
						placeholder="password123"
						v-model="input.password"
					/>
				</div>
				<div class="alternative-option mt-4">
					You don't have an account?
					<span class="link" @click="navigateRegister">Register</span>
				</div>
				<button type="submit" class="mt-4 btn-pers" id="login_button">
					Login
				</button>
				<div class="loading">
					<Loading :loading="store.state.root.loading" />
				</div>
				<div
					v-if="error"
					class="alert alert-warning alert-dismissible fade show mt-5 d-none"
					role="alert"
					id="alert_1"
				>
					{{ error }}
				</div>
			</form>
		</div>
	</div>
</template>
@/utils/route
