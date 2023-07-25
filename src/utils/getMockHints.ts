export const getMockHints = (head: string) =>
	new Promise<string[]>(resolve =>
		resolve([
			...new Set(
				Array.from({ length: 15 }, () => {
					const tail = Array.from({ length: 10 }, () => String.fromCharCode(Math.random() * 25 + 97)).join(
						''
					);
					return `${head}${tail}`;
				})
			),
		])
	);
