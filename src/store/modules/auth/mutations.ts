import { IAccount } from "@utils/interface";
import { MutationTree } from "vuex";
import { IAuthState } from "@/store/interface";
import { AuthMutations } from "@/store/enum";

const mutations: MutationTree<IAuthState> = {
	[AuthMutations.UPDATE_LOGGED](state: IAuthState, value: boolean) {
		state.isLogged = value;
	},
	[AuthMutations.UPDATE_ACCOUNT](state: IAuthState, data: IAccount) {
		state.account = data;
	},
	[AuthMutations.UPDATE_ERROR](state: IAuthState, value: string | null) {
		state.error = value;
	},
};

export default mutations;
