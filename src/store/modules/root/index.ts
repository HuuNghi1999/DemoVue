import { IRootState, IStoreModules } from "@/store/interface";
import { Module } from "vuex";
import state from "./state";
import mutations from "./mutations";

const root: Module<IRootState, IStoreModules> = {
	state,
	mutations,
};

export default root;
