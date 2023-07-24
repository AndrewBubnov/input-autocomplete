import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { HintList } from '../HintList/HintList.tsx';
import { InputForm } from '../InputForm/InputForm.tsx';
import debounce from 'lodash.debounce';
import { DEBOUNCE_DELAY } from '../../constants.ts';
import { useDimensions } from '../../hooks/useDimensions.ts';

interface AutocompleteProps {
	value: string;
	onChange(arg: string): void;
	onSubmit(arg: string): void;
	fetchFn(arg: string): Promise<string[]>;
	className?: string;
}

export const Autocomplete = ({ value, onChange, fetchFn, onSubmit, className = '' }: AutocompleteProps) => {
	const [hints, setHints] = useState<string[]>([]);
	const [currentHint, setCurrentHint] = useState<string>('');
	const request = useRef<string>('');

	const { inputRef, dimensions } = useDimensions();

	useEffect(() => {
		if (!inputRef.current) return;
		inputRef.current.setSelectionRange(request.current.length, currentHint.length);
	}, [currentHint, inputRef]);

	const fetchHints = useCallback(
		(req: string) =>
			debounce(async () => {
				const fetched = await fetchFn(req);
				const hint = fetched.length ? fetched[0] : '';
				onChange(hint && hint.length > req.length ? hint : req);
				setCurrentHint(hint);
				setHints(fetched);
			}, DEBOUNCE_DELAY),
		[fetchFn, onChange]
	);

	const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		const { value } = evt.target;
		onChange(value);
		if (value.length > request.current.length) void fetchHints(value)();
		request.current = value;
	};

	const selectHandler = useCallback(
		(arg: string) => {
			setCurrentHint('');
			request.current = arg;
			onChange(arg);
		},
		[onChange]
	);

	const clickHandler = useCallback(() => {
		request.current = currentHint;
	}, [currentHint]);

	const submitHandler = useCallback(
		(evt: FormEvent) => {
			evt.preventDefault();
			const value = inputRef.current?.value || '';
			onSubmit(value);
			request.current = value;
			setCurrentHint('');
		},
		[inputRef, onSubmit]
	);

	const setCurrentHintTextHandler = useCallback(
		(hint: string) => {
			setCurrentHint(hint);
			onChange(hint);
		},
		[onChange]
	);

	const isHintListRendered = !!value && !!currentHint;

	return (
		<>
			<InputForm
				value={value}
				onChange={changeHandler}
				onSubmit={submitHandler}
				onClick={clickHandler}
				className={className}
				ref={inputRef}
			/>
			{isHintListRendered && (
				<HintList
					list={hints}
					dimensions={dimensions}
					onSelect={selectHandler}
					setHintText={setCurrentHintTextHandler}
					request={request.current}
				/>
			)}
		</>
	);
};
