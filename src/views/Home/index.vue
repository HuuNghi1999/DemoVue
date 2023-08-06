<script setup lang="ts">
import { AuthActions, key } from "@/store";
import Avatar from "@components/Avatar.vue";
import { useStore } from "vuex";
import "./style.css";
import { ref, watch } from "vue";
import { addDocument, getDocuments, getSnapShot } from "@/service";
import { Collections, IAccount, IMessage } from "@/utils";
// import { db } from "@/config";
// import { collection, doc, onSnapshot } from "firebase/firestore";

const inputUsername = ref("");
const inputMessage = ref("");
const matchedUsers = ref<IAccount[]>([]);
const selectedUser = ref<IAccount>();
const messages = ref<Array<IMessage>>([]);

const store = useStore(key);

const logout = () => {
	console.log("click");
	store.dispatch(AuthActions.LOGOUT);
};

const clickUser = (user: IAccount) => {
	console.log(user);
	selectedUser.value = user;
	matchedUsers.value = [];
};

const sendMessage = async () => {
	await addDocument({
		collectionName: Collections.MESSAGES,
		data: {
			text: inputMessage.value,
			uid: selectedUser.value?.uid,
			users: [selectedUser.value?.uid, store.state.auth.account?.uid],
			displayName: selectedUser.value?.displayName,
			from: store.state.auth.account?.uid,
			createAt: Date.now(),
		},
	});
	inputMessage.value = "";
};

const list = getSnapShot({
			collectionName: Collections.MESSAGES,
			condition: {
				field: "uid",
				operator: "==",
				value: selectedUser.value?.uid??'',
			},
		}) as Array<IMessage>

const getMessages = async () => {
	if (selectedUser.value?.uid) {
		const mess = await getDocuments({
			collectionName: Collections.MESSAGES,
			condition: {
				field: "uid",
				operator: "==",
				value: selectedUser.value?.uid,
			},
		})as Array<IMessage>;
		messages.value = mess.sort();
	} else messages.value = [];
};

watch([inputUsername, getDocuments], () => {
	getDocuments({
		collectionName: Collections.USERS,
		condition: {
			field: "keywords",
			operator: "array-contains",
			value: inputUsername.value,
		},
	}).then((res) => {
		matchedUsers.value = res as Array<IAccount>;
	});
});

watch([selectedUser, getMessages], () => {
	getMessages();
});
</script>

<template>
	<div>
		<div class="header">
			<div class="item-1">
				<h3 class="mr-3">
					Welcome, {{ store.state.auth.account?.displayName }}
				</h3>
				<Avatar :url="store.state.auth.account?.photoUrl" />
			</div>
			<div class="item-2">
				<button
					type="submit"
					class="mt-4 btn-pers btn-logout"
					id="login_button"
					@click="logout"
				>
					Logout
				</button>
			</div>
		</div>
		<div class="chat-container">
			<div class="channels">
				<div class="title">Chat</div>
				<input type="text" v-model="inputUsername" class="search" />
				<div class="item fruit" v-for="user in matchedUsers" :key="user.uid">
					<div class="match-user" @click="() => clickUser(user)">
						<div>
							<Avatar :url="user.photoUrl" size="small" />
						</div>
						<div>
							{{ user.displayName }}
						</div>
					</div>
				</div>

				<div class="match-user" v-if="selectedUser?.email">
					<div>
						<Avatar :url="selectedUser?.photoUrl" size="small" />
					</div>
					<div>
						{{ selectedUser?.displayName }}
					</div>
				</div>
			</div>
			<div class="messages">
				<div v-if="selectedUser" class="match-user">
					<div>
						<Avatar :url="selectedUser?.photoUrl" />
					</div>
					<div>
						{{ selectedUser?.displayName }}
					</div>
				</div>
				<div v-for="message in messages">
					<p class="match-user">
						{{ message.text }}
					</p>
				</div>
				<div v-if="selectedUser?.email" class="input-container">
					<form @submit.prevent="sendMessage">
						<input
							class="input"
							type="text"
							v-model="inputMessage"
							placeholder="Write a message..."
						/>
						<input class="btn-submit" type="submit" value="Send" />
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
