import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { HintList } from 'components/HintList/HintList.tsx';
import { useHints } from 'hooks/useHints.ts';
import { useDimensions } from 'hooks/useDimensions.ts';
import { clsx } from 'clsx';
import { DEBOUNCE_DELAY } from 'constants.ts';
import styles from './Autocomplete.module.css';
import { useLatest } from 'hooks/useLatest.ts';

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
	const [isSelectable, setIsSelectable] = useState<boolean>(false);
	const request = useRef<string>('');

	const { hints, setHints, getHints } = useHints({ fetchFn, isCached, debounceDelay });
	const { inputRef, dimensions } = useDimensions();
	const activeHintRef = useLatest(activeHint);

	useEffect(() => {
		const hint = hints.length ? hints[0] : '';
		onChange(hint && hint.length > request.current.length ? hint : request.current);
		setActiveHint(hint);
		setIsSelectable(true);
	}, [hints, onChange]);

	useEffect(() => {
		if (!inputRef.current || !isSelectable) return;
		inputRef.current.setSelectionRange(request.current.length, activeHintRef.current.length);
		setIsSelectable(false);
	}, [inputRef, activeHintRef, isSelectable]);

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
			setIsSelectable(true);
			onChange(hint);
		},
		[onChange]
	);

	const clickHandler = () => {
		request.current = activeHint;
	};

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
					spellCheck={false}
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
