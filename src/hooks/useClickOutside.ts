import { RefObject, useEffect } from 'react';

export const useClickOutside = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, callback: () => void) => {
	useEffect(() => {
		const listener = (event: Event) => {
			if (!ref.current) return;
			if (ref.current && !ref.current.contains(event?.target as Node)) callback();
		};
		document.addEventListener('click', listener);
		return () => document.removeEventListener('click', listener);
	}, [callback, ref]);
};
