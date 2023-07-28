const FETCH_DELAY = 200;

const generateRandomChar = () => String.fromCharCode(Math.random() * 25 + 97);

export const getMockHints = (head: string) =>
	new Promise(resolve => setTimeout(resolve, FETCH_DELAY)).then(
		() =>
			new Promise<string[]>(resolve =>
				resolve([
					...new Set(
						Array.from({ length: 15 }, () => {
							const tail = Array.from({ length: 10 }, generateRandomChar).join('');
							return `${head}${tail.slice(0, 5)} ${tail.slice(5)}`;
						})
					),
				])
			)
	);
