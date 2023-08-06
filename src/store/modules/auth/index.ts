import { Module, ModuleTree } from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import { IAuthState, IStoreModules } from "@/store/interface";

const auth: Module<IAuthState, IStoreModules> = {
	namespaced: false,
	state: () =>
		({
			isLogged: false,
			account: null,
			error: ''
		} as IAuthState),
	mutations: mutations,
	actions:actions,
};

export default auth;