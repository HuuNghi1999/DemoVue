export interface IAccount {
	uid: string;
	displayName?: string;
	email: string;
	photoUrl?: string;
	keyword?: Array<string>;
}
export interface IFirebaseError {
	code: number;
	message: string;
}

export interface IMessage {
	text: string;
	uid: string;
	users: Array<string>;
	displayName: string;
	from: string;
	createAt: Date
}
