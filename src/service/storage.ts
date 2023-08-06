import {
	collection,
	addDoc,
	query,
	where,
	WhereFilterOp,
	getDocs,
	onSnapshot,
} from "firebase/firestore";
import { db } from "@config/firebase";
import { FirebaseError } from "firebase/app";

export interface IAddDoc {
	collectionName: string;
	data?: Record<any, any>;
	condition?: ICondition;
}

export interface ICondition {
	field: string;
	operator: WhereFilterOp;
	value: string | number;
}

export interface IStatus {
	status: boolean;
	error?: string;
}

export interface IQueryDoc {
	collectionName: string;
	condition: ICondition;
}

export const addDocument = async ({
	collectionName,
	data,
}: IAddDoc): Promise<IStatus> => {
	try {
		await addDoc(collection(db, collectionName), data);
		return { status: true };
	} catch (e) {
		console.error("Error adding document: ", e);
		const { message } = e as FirebaseError;
		return { status: false, error: message };
	}
};

export const getDocuments = async ({
	collectionName,
	condition,
}: IQueryDoc) => {
	console.log("🚀 ~ file: storage.ts:52 ~ condition:", condition)
	const docsRef = await getDocs(
		query(
			collection(db, collectionName),
			where(condition.field, condition.operator, condition.value)
		)
	);
	console.log("🚀 ~ file: storage.ts:58 ~ docsRef:", docsRef.docs)
	return docsRef.docs.map((item) => item.data());
};

export const getSnapShot = ({ collectionName, condition }: IQueryDoc) => {
	let docs: Array<any> =[]
	const q = query(
		collection(db, collectionName),
		where(condition.field, condition.operator, condition.value)
	);
	onSnapshot(q, (snapshot) => {
		docs=snapshot.docs.map(doc=>{
			console.log("doc", doc.data());
			return {
			id: doc.id,
			...doc.data()
			}
		})
	});
	return docs;
};
