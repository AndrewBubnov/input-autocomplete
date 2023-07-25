import { useLayoutEffect, useRef } from 'react';
import { Dimensions } from '../components/HintList/HintList.tsx';
import { HINT_LIST_MARGIN } from '../constants.ts';

export const useDimensions = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const dimensions = useRef<Dimensions>({ top: '', left: '', width: '' });

	useLayoutEffect(() => {
		if (!inputRef.current) return;
		const { top, width, bottom, left } = inputRef.current.getBoundingClientRect();
		const { innerHeight, scrollY, scrollX } = window;
		const halfHeight = innerHeight / 2;
		const isBottom = bottom + scrollY > halfHeight;
		console.log({
			top: `${isBottom ? top + scrollY - halfHeight - HINT_LIST_MARGIN : bottom + HINT_LIST_MARGIN}px`,
			left: `${left + scrollX}px`,
			width: `${width}px`,
		});
		dimensions.current = {
			top: `${isBottom ? top + scrollY - halfHeight - HINT_LIST_MARGIN : bottom + HINT_LIST_MARGIN}px`,
			left: `${left + scrollX}px`,
			width: `${width}px`,
		};
	}, []);

	return { inputRef, dimensions: dimensions.current };
};
