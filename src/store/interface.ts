import { IAccount } from "@/utils/interface";
import { RootMutations } from "./enum";

export interface IRootState {
	loading: boolean;
	version: string;
}

export interface IAuthState {
	isLogged: boolean;
	account: IAccount | null;
    error: string|null;
}


export type IStoreModules = {
	auth: IAuthState;
	root: IRootState;
};

export type IRootMutationTypes<S=IRootState>={
	[RootMutations.UPDATE_VERSION](state: S, value: string): void;
	[RootMutations.UPDATE_LOADING](state: S, value: boolean): void;
}
