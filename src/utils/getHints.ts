export const getHints = (head: string) =>
	new Promise<string[]>(resolve =>
		resolve([
			...new Set(
				Array.from({ length: 15 }, () => {
					const tail = Array.from({ length: 5 }, () => String.fromCharCode(Math.random() * 25 + 97)).join('');
					return `${head}${tail}`;
				})
			),
		])
	);
