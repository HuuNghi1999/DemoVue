// tao keywords cho username, su dung cho search
export const generateKeywords = (username: string) => {
	// liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
	// => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
	const name = username.split(" ").filter((word) => word);

	const length = name.length;
	let flagArray: Array<boolean> = [];
	let result: string[] = [];
	let stringArray: string[] = [];

	/**
	 * khoi tao mang flag false
	 * dung de danh dau xem gia tri
	 * tai vi tri nay da duoc su dung
	 * hay chua
	 **/
	for (let i = 0; i < length; i++) {
		flagArray[i] = false;
	}

	const createKeywords = (name: string) => {
		const arrName: string[] = [];
		let curName = "";
		name.split("").forEach((letter) => {
			curName += letter;
			arrName.push(curName);
		});
		return arrName;
	};

	function findPermutation(k:number) {
		for (let i = 0; i < length; i++) {
			if (!flagArray[i]) {
				flagArray[i] = true;
				result[k] = name[i];

				if (k === length - 1) {
					stringArray.push(result.join(" "));
				}

				findPermutation(k + 1);
				flagArray[i] = false;
			}
		}
	}

	findPermutation(0);

	const keywords = stringArray.reduce((acc:any, cur:any) => {
		const words = createKeywords(cur);
		return [...acc, ...words];
	}, []);

	return keywords;
};
