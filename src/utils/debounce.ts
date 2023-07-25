export const debounce = <T>(cb: (arg: T) => void | Promise<void>, delay: number) => {
	let timeout: number;

	return function (arg: T) {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => cb(arg), delay);
	};
};
