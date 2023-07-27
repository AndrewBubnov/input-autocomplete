import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { HintList } from '../HintList/HintList.tsx';
import { useDimensions } from '../../hooks/useDimensions.ts';
import { clsx } from 'clsx';
import styles from './Autocomplete.module.css';
import { useHints } from '../../hooks/useHints.ts';
import { DEBOUNCE_DELAY } from '../../constants.ts';

interface AutocompleteProps {
	value: string;
	onChange(arg: string): void;
	onSubmit(arg: string): void;
	fetchFn(arg: string): Promise<string[]>;
	debounceDelay?: number;
	isCached?: boolean;
	className?: string;
}

export const Autocomplete = ({
	value,
	onChange,
	fetchFn,
	onSubmit,
	isCached = true,
	debounceDelay = DEBOUNCE_DELAY,
	className = '',
}: AutocompleteProps) => {
	const [activeHint, setActiveHint] = useState<string>('');
	const request = useRef<string>('');

	const { hints, setHints, getHints } = useHints({ fetchFn, isCached, debounceDelay });
	const { inputRef, dimensions } = useDimensions();

	useEffect(() => {
		const hint = hints.length ? hints[0] : '';
		onChange(hint && hint.length > request.current.length ? hint : request.current);
		setActiveHint(hint);
	}, [hints, onChange]);

	const selectHandler = useCallback(
		(arg: string) => {
			setHints([]);
			request.current = arg;
			onChange(arg);
		},
		[onChange, setHints]
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
		if (value.length > request.current.length) getHints(value);
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
