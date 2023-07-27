const generateRandomChar = () => String.fromCharCode(Math.random() * 25 + 97);

export const getMockHints = (head: string) =>
	new Promise<string[]>(resolve =>
		resolve([
			...new Set(
				Array.from({ length: 15 }, () => {
					const tail = Array.from({ length: 10 }, generateRandomChar).join('');
					return `${head}${tail}`;
				})
			),
		])
	);
