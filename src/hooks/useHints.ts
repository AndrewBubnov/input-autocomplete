import { useCallback, useMemo, useRef, useState } from 'react';
import { debounce } from '../utils/debounce.ts';

interface UseHintsProps {
	fetchFn(arg: string): Promise<string[]>;
	isCached: boolean;
	debounceDelay: number;
}

export const useHints = ({ fetchFn, isCached, debounceDelay }: UseHintsProps) => {
	const [hints, setHints] = useState<string[]>([]);
	const cache = useRef<{ [key: string]: string[] }>({});

	const fetchHints = useMemo(
		() =>
			debounce(async (req: string) => {
				const data = await fetchFn(req);
				setHints(data);
				if (isCached) cache.current[req] = data;
			}, debounceDelay),
		[debounceDelay, fetchFn, isCached]
	);

	const getHints = useCallback(
		(req: string) => {
			if (isCached && cache.current[req]) {
				setHints(cache.current[req]);
				return;
			}
			void fetchHints(req);
		},
		[fetchHints, isCached]
	);

	return { hints, setHints, getHints };
};
