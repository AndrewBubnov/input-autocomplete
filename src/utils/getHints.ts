export const getHints = Array.from({ length: 5000 }, () =>
	Array.from({ length: 5 }, () => String.fromCharCode(Math.random() * 25 + 97)).join('')
);
