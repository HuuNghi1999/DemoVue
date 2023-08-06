import { ActionTree } from "vuex";
import {
	User,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { addDocument, getDocuments } from "@/service";
import { auth } from "@/config";
import { FirebaseError } from "firebase/app";
import { Collections, IAccount, handleAuthError } from "@/utils";
import {
	IAuthState,
	AuthActions,
	AuthMutations,
	RootMutations,
	IStoreModules,
} from "@/store";
import { generateKeywords } from "@/utils/generateKeyword";
import { v4 as uuidv4 } from "uuid";

const actions: ActionTree<IAuthState, IStoreModules> = {
	async [AuthActions.REGISTER](context, { email, password, name, photoUrl }) {
		context.commit(RootMutations.UPDATE_LOADING, true);
		context.commit(AuthMutations.UPDATE_ERROR, null);
		try {
			const user = await createUserWithEmailAndPassword(auth, email, password);
			if (user) {
				await addDocument({
					collectionName: Collections.USERS,
					data: {
						email,
						password,
						photoUrl,
						displayName: name,
						keywords: generateKeywords(name?.toLowerCase()),
						uid: uuidv4()
					},
				});

				context.commit(AuthMutations.UPDATE_ERROR, null);
			}
		} catch (error) {
			context.commit(
				AuthMutations.UPDATE_ERROR,
				handleAuthError(error as FirebaseError)
			);
		}
		context.commit(RootMutations.UPDATE_LOADING, false);
	},
	async [AuthActions.LOGIN](context, { email, password }) {
		context.commit(RootMutations.UPDATE_LOADING, true);
		context.commit(AuthMutations.UPDATE_ERROR, null);
		try {
			const response = await signInWithEmailAndPassword(auth, email, password);
			if(response.user){
				const user = await getDocuments({collectionName: Collections.USERS, condition:{field: 'email', operator: "==", value: email}}) as Array<IAccount>
				context.commit(AuthMutations.UPDATE_ACCOUNT,user[0] );
				context.commit(AuthMutations.UPDATE_LOGGED, true);
				context.commit(AuthMutations.UPDATE_ERROR, null);
			}
		} catch (error) {
			context.commit(AuthMutations.UPDATE_ACCOUNT, null);
			const errorMessage = handleAuthError(error as FirebaseError)
			console.log("🚀 ~ file: actions.ts:65 ~ errorMessage:", errorMessage)
			context.commit(
				AuthMutations.UPDATE_ERROR,
				errorMessage
			);
		}
		context.commit(RootMutations.UPDATE_LOADING, false);
	},
	async [AuthActions.LOGOUT](context) {
		context.commit(RootMutations.UPDATE_LOADING, false);
		await signOut(auth);
		context.commit(AuthMutations.UPDATE_ACCOUNT, null);
		context.commit(AuthMutations.UPDATE_LOGGED, false);
		context.commit(RootMutations.UPDATE_LOADING, false);
	},

	async [AuthActions.FETCH_USER](context, user: User) {
		context.commit(AuthMutations.UPDATE_LOGGED, user !== null);
		if (user) {
			context.commit(AuthMutations.UPDATE_ACCOUNT, {
				displayName: user.displayName,
				email: user.email,
				uid: user.uid,
				photoUrl: user.photoURL,
			});
		}
	},
};

export default actions;
