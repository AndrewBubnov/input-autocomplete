import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HintList } from '../HintList/HintList.tsx';
import { useDimensions } from '../../hooks/useDimensions.ts';
import { clsx } from 'clsx';
import { debounce } from '../../utils/debounce.ts';
import { DEBOUNCE_DELAY } from '../../constants.ts';
import styles from './Autocomplete.module.css';

interface AutocompleteProps {
	value: string;
	onChange(arg: string): void;
	onSubmit(arg: string): void;
	fetchFn(arg: string): Promise<string[]>;
	className?: string;
}

export const Autocomplete = ({ value, onChange, fetchFn, onSubmit, className = '' }: AutocompleteProps) => {
	const [hints, setHints] = useState<string[]>([]);
	const [activeHint, setActiveHint] = useState<string>('');
	const request = useRef<string>('');

	const { inputRef, dimensions } = useDimensions();

	useEffect(() => {
		const hint = hints.length ? hints[0] : '';
		onChange(hint && hint.length > request.current.length ? hint : request.current);
		setActiveHint(hint);
	}, [hints, onChange]);

	const getHints = useMemo(
		() => debounce(async (req: string) => setHints(await fetchFn(req)), DEBOUNCE_DELAY),
		[fetchFn]
	);

	const selectHandler = useCallback(
		(arg: string) => {
			setHints([]);
			request.current = arg;
			onChange(arg);
		},
		[onChange]
	);

	const activeHintChangeHandler = useCallback(
		(hint: string) => {
			setActiveHint(hint);
			onChange(hint);
		},
		[onChange]
	);

	const clickHandler = () => {
		request.current = activeHint;
	};

	useEffect(() => {
		if (!inputRef.current) return;
		inputRef.current.setSelectionRange(request.current.length, activeHint.length);
	}, [activeHint, inputRef, request]);

	const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		const { value } = evt.target;
		onChange(value);
		if (!value) setHints([]);
		if (value.length > request.current.length) void getHints(value);
		request.current = value;
	};

	const submitHandler = (evt: FormEvent) => {
		evt.preventDefault();
		onSubmit(value);
		request.current = value;
		setHints([]);
	};

	const isHintListRendered = !!value && !!activeHint;

	return (
		<>
			<form onSubmit={submitHandler}>
				<input
					ref={inputRef}
					value={value}
					onInput={changeHandler}
					onClick={clickHandler}
					className={clsx(className, styles.input)}
					autoComplete="off"
				/>
			</form>
			{isHintListRendered && (
				<HintList
					list={hints}
					dimensions={dimensions}
					onSelect={selectHandler}
					setHintText={activeHintChangeHandler}
					request={request.current}
				/>
			)}
		</>
	);
};
