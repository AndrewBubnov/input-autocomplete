import styles from './Autocomplete.module.css';
import { ChangeEvent, FormEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { HintsList } from '../HintsList/HintsList.tsx';
import debounce from 'lodash.debounce';

interface InputProps {
	value: string;
	onChange(arg: string): void;
	className?: string;
}

const getHints = Array.from({ length: 3000 }, () =>
	Array.from({ length: 5 }, () => String.fromCharCode(Math.random() * 25 + 97)).join('')
);

export const Autocomplete = ({ value, onChange, className = '' }: InputProps) => {
	const [hints, setHints] = useState<string[]>([]);
	const [listOpen, setListOpen] = useState<boolean>(false);
	const ref = useRef<HTMLInputElement>(null);
	const dimensions = useRef<{ top: string; left: string; width: string }>({ top: '', left: '', width: '' });

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

	const hintsList = value ? hints.filter(hint => hint.startsWith(value)) : [];

	useEffect(() => setListOpen(!!hintsList.length), [hintsList.length]);

	const hintText = hintsList.length ? hintsList[0] : '';

	const selectHandler = useCallback(
		(arg: string) => {
			onChange(arg);
			setListOpen(false);
		},
		[onChange]
	);

	const submitHandler = (evt: FormEvent) => {
		evt.preventDefault();
		setHints(prevState => Array.from(new Set([...prevState, value])));
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
			{listOpen ? <HintsList list={hintsList} dimensions={dimensions.current} onSelect={selectHandler} /> : null}
		</>
	);
};
