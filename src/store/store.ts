import { InjectionKey } from "vue";
import { IStoreModules } from "./interface";
import root from "./modules/root";
import { createStore, Store } from "vuex";
import auth from "./modules/auth";
import VuexPersistence from "vuex-persist";


const vuexLocal = new VuexPersistence<IStoreModules>({
	storage: window.localStorage,
});

export const key: InjectionKey<Store<IStoreModules>> = Symbol();

export const store = createStore<IStoreModules>({
	modules: {
		root,
		auth,
	},
	plugins: [vuexLocal.plugin],
});