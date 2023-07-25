import { useCallback, useMemo, useRef, useState } from 'react';
import { debounce } from '../utils/debounce.ts';
import { DEBOUNCE_DELAY } from '../constants.ts';

interface UseHintsProps {
	onChange(arg: string): void;
	fetchFn(arg: string): Promise<string[]>;
}

export const useHints = ({ fetchFn, onChange }: UseHintsProps) => {
	const [hints, setHints] = useState<string[]>([]);
	const [currentHint, setCurrentHint] = useState<string>('');
	const request = useRef<string>('');

	const getHints = useMemo(
		() =>
			debounce(async (req: string) => {
				const fetched = await fetchFn(req);
				const hint = fetched.length ? fetched[0] : '';
				onChange(hint && hint.length > req.length ? hint : req);
				setCurrentHint(hint);
				setHints(fetched);
			}, DEBOUNCE_DELAY),
		[fetchFn, onChange]
	);

	const selectHandler = useCallback(
		(arg: string) => {
			setCurrentHint('');
			request.current = arg;
			onChange(arg);
		},
		[onChange]
	);

	const activeHintChangeHandler = useCallback(
		(hint: string) => {
			setCurrentHint(hint);
			onChange(hint);
		},
		[onChange]
	);

	const clickHandler = () => {
		request.current = currentHint;
	};

	return {
		hints,
		currentHint,
		setCurrentHint,
		request,
		getHints,
		activeHintChangeHandler,
		selectHandler,
		clickHandler,
	};
};
