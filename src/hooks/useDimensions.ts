import { useLayoutEffect, useRef } from 'react';
import { Dimensions } from '../components/HintList/HintList.tsx';

export const useDimensions = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const dimensions = useRef<Dimensions>({ top: '', left: '', width: '' });

	useLayoutEffect(() => {
		if (!inputRef.current) return;
		const { width, bottom, left } = inputRef.current.getBoundingClientRect();
		dimensions.current = { top: `${bottom}px`, left: `${left}px`, width: `${width}px` };
	}, []);

	return { inputRef, dimensions: dimensions.current };
};
