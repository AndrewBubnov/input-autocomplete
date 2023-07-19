import { ChangeEvent, FormEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Dimensions, HintsList } from '../HintsList/HintsList.tsx';
import { InputForm } from '../InputForm/InputForm.tsx';
import { getHints } from '../../utils/getHints.ts';
import debounce from 'lodash.debounce';
import { DEBOUNCE_DELAY } from '../../constants.ts';

interface InputProps {
	value: string;
	onChange(arg: string): void;
	className?: string;
}

export const Autocomplete = ({ value, onChange, className = '' }: InputProps) => {
	const [allHints, setAllHints] = useState<string[]>([]);
	const [relevantHints, setRelevantHints] = useState<string[]>([]);
	const [currentHint, setCurrentHint] = useState<string>('');
	const [request, setRequest] = useState<string>('');

	const ref = useRef<HTMLInputElement>(null);
	const dimensions = useRef<Dimensions>({ top: '', left: '', width: '' });

	const debounced = debounce(() => setAllHints(getHints), DEBOUNCE_DELAY);

	useLayoutEffect(() => {
		if (!ref.current) return;
		const { width, bottom, left } = ref.current.getBoundingClientRect();
		dimensions.current = { top: `${bottom}px`, left: `${left}px`, width: `${width}px` };
	}, []);

	useEffect(() => {
		if (!ref.current || !currentHint) return;
		ref.current.setSelectionRange(request.length, currentHint.length);
	}, [currentHint, request]);

	const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		const { value: currentRequest } = evt.target;

		const relevant = value ? allHints.filter(hint => hint.startsWith(currentRequest)) : [];
		setRelevantHints(relevant);
		const hint = relevant.length ? relevant[0] : '';
		setCurrentHint(hint);
		const isHintRendered = hint && hint.length > currentRequest.length && currentRequest.length > request.length;
		onChange(isHintRendered ? hint : currentRequest);
		setRequest(currentRequest);

		if (!allHints.length) debounced();
	};

	const selectHandler = useCallback(
		(arg: string) => {
			onChange(arg);
			setRelevantHints([]);
		},
		[onChange]
	);

	const submitHandler = useCallback((evt: FormEvent) => {
		evt.preventDefault();
		setRelevantHints([]);
	}, []);

	const currentHintHandler = useCallback(
		(hint: string) => {
			setCurrentHint(hint);
			onChange(hint);
		},
		[onChange]
	);

	return (
		<>
			<InputForm
				value={value}
				changeHandler={changeHandler}
				submitHandler={submitHandler}
				className={className}
				ref={ref}
			/>
			{relevantHints.length ? (
				<HintsList
					list={relevantHints}
					dimensions={dimensions.current}
					onSelect={selectHandler}
					setHintText={currentHintHandler}
				/>
			) : null}
		</>
	);
};
