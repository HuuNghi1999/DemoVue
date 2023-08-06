import { RootMutations } from "@/store/enum";
import { IRootState } from "@/store/interface";
import { MutationTree } from "vuex";

const mutations: MutationTree<IRootState> = {
	[RootMutations.UPDATE_LOADING](state: IRootState, value: boolean) {
		state.loading = value;
	},
	[RootMutations.UPDATE_VERSION](state: IRootState, value: string) {
		state.version = value;
	},
};

export default mutations;
