import { ChangeEvent, FormEvent, useEffect } from 'react';
import { HintList } from '../HintList/HintList.tsx';
import { useDimensions } from '../../hooks/useDimensions.ts';
import { clsx } from 'clsx';
import styles from './Autocomplete.module.css';
import { useHints } from '../../hooks/useHints.ts';

interface AutocompleteProps {
	value: string;
	onChange(arg: string): void;
	onSubmit(arg: string): void;
	fetchFn(arg: string): Promise<string[]>;
	className?: string;
}

export const Autocomplete = ({ value, onChange, fetchFn, onSubmit, className = '' }: AutocompleteProps) => {
	const {
		hints,
		currentHint,
		setCurrentHint,
		request,
		getHints,
		clickHandler,
		activeHintChangeHandler,
		selectHandler,
	} = useHints({
		fetchFn,
		onChange,
	});

	const { inputRef, dimensions } = useDimensions();

	useEffect(() => {
		if (!inputRef.current) return;
		inputRef.current.setSelectionRange(request.current.length, currentHint.length);
	}, [currentHint, inputRef, request]);

	const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		const { value } = evt.target;
		onChange(value);
		if (value.length > request.current.length) void getHints(value)();
		request.current = value;
	};

	const submitHandler = (evt: FormEvent) => {
		evt.preventDefault();
		onSubmit(value);
		request.current = value;
		setCurrentHint('');
	};

	const isHintListRendered = !!value && !!currentHint;

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
