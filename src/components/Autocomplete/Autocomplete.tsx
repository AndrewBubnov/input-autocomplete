import styles from './Autocomplete.module.css';
import { ChangeEvent, FormEvent, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { Dimensions, HintsList } from '../HintsList/HintsList.tsx';
import debounce from 'lodash.debounce';

interface InputProps {
	value: string;
	onChange(arg: string): void;
	className?: string;
}

const getHints = Array.from({ length: 5000 }, () =>
	Array.from({ length: 5 }, () => String.fromCharCode(Math.random() * 25 + 97)).join('')
);

export const Autocomplete = ({ value, onChange, className = '' }: InputProps) => {
	const [hints, setHints] = useState<string[]>([]);
	const [hintText, setHintText] = useState<string>('');
	const ref = useRef<HTMLInputElement>(null);
	const dimensions = useRef<Dimensions>({ top: '', left: '', width: '' });

	const debounced = debounce(() => setHints(getHints), 400);

	useLayoutEffect(() => {
		if (!ref.current) return;
		const { width, bottom, left } = ref.current.getBoundingClientRect();
		dimensions.current = { top: `${bottom}px`, left: `${left}px`, width: `${width}px` };
	}, []);

	const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		onChange(evt.target.value);
		if (!hints.length) debounced();
	};

	const relevantHints = useMemo(() => (value ? hints.filter(hint => hint.startsWith(value)) : []), [hints, value]);

	useEffect(() => {
		if (relevantHints.length) setHintText(relevantHints[0]);
	}, [relevantHints]);

	const selectHandler = useCallback(
		(arg: string) => {
			onChange(arg);
			setHints([]);
		},
		[onChange]
	);

	const submitHandler = (evt: FormEvent) => {
		evt.preventDefault();
		setHints([]);
	};

	return (
		<>
			<div className={styles.container}>
				<form onSubmit={submitHandler}>
					<input
						ref={ref}
						value={value}
						onChange={changeHandler}
						className={clsx(styles.common, styles.input, className)}
					/>
				</form>
				{hintText && <div className={clsx(styles.common, styles.hint, className)}>{hintText}</div>}
			</div>
			{relevantHints.length ? (
				<HintsList
					list={relevantHints}
					dimensions={dimensions.current}
					onSelect={selectHandler}
					setHintText={setHintText}
				/>
			) : null}
		</>
	);
};
