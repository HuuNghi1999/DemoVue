<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import "../style.css";
import { Route } from "@utils/route";
import Loading from "@components/Loading.vue";
import { validateEmail, validatePassword } from "@/utils";
import { key, AuthActions } from "@/store";


const username = ref("");
const email = ref("");
const password = ref("");

const store = useStore(key);
console.log(store.state.root.loading)
const router = useRouter();
const error = ref();
const imageUrl = ref<string | ArrayBuffer | null | undefined>("");

const handleFileChange = (event: any) => {
	const file = event.target.files[0];
	if (file) {
		// Read the selected file as a Data URL
		const reader = new FileReader();
		reader.onload = (e) => {
			imageUrl.value = e.target?.result;
		};
		reader.readAsDataURL(file);
	}
};

watchEffect(() => {
	console.log(imageUrl.value);
});

const register = async () => {
	try {
		if (!password.value || !email.value || !username.value) {
			return (error.value = "You must complete all field");
		}
		if (!validateEmail(email.value)) {
			return (error.value = "Email is not valid");
		}
		if (!validatePassword(password.value)) {
			return (error.value =
				"Password must be at least 8 characters includes letters and numbers and not over 16 characters");
		}
		if (!imageUrl.value) {
			return (error.value = "Please choose your photo");
		}
		await store.dispatch(AuthActions.REGISTER, {
			email: email.value,
			password: password.value,
			name: username.value,
			photoUrl: imageUrl.value,
		});
		if (
			store.state.root.loading === false &&
			!store.state.auth.error
		) {
			moveToLogin();
		}
	} catch (err) {
		error.value = err;
	}
};

const moveToLogin = () => {
	router.push(Route.LOGIN);
};
</script>

<template>
	<div class="container" >
		<div class="content border">
		<form @submit.prevent="register">
			<h2 class="mb-3">Register</h2>
			<div class="input">
				<label for="email">Email address</label>
				<input
					class="form-control"
					type="text"
					name="email"
					placeholder="email@adress.com"
					v-model="email"
				/>
			</div>
			<div class="input">
				<label for="password">Password</label>
				<input
					class="form-control"
					type="password"
					name="password"
					placeholder="password123"
					v-model="password"
				/>
			</div>
			<div class="input">
				<label for="Username">Username</label>
				<input
					class="form-control"
					type="text"
					name="Username"
					placeholder="Username"
					v-model="username"
				/>
			</div>
			<div>
				<input type="file" @change="handleFileChange" accept="image/*" />
			</div>
			<div class="alternative-option mt-4">
				Already have an account?
				<span class="link" @click="moveToLogin">Login</span>
			</div>

			<button type="submit" id="register_button" class="mt-4 btn-pers" >
				Register
			</button>
			<div class="loading">
				<Loading :loading="store.state.root.loading" />
			</div>
			<div
				class="alert alert-warning alert-dismissible fade show mt-5 d-none"
				role="alert"
				id="alert_2"
				v-if="error"
			>
				{{ error }}
			</div>
		</form>
	</div>
	</div>
</template>
