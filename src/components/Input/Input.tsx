import styles from './Input.module.css';
import { ChangeEvent, FormEvent, useLayoutEffect, useRef, useState, CSSProperties } from 'react';
import { clsx } from 'clsx';

interface InputProps {
	value: string;
	onChange(arg: string): void;
	className?: string;
}

export default function Input({ value, onChange, className = '' }: InputProps) {
	const [hints, setHints] = useState<string[]>([]);
	const ref = useRef<HTMLInputElement>(null);
	const width = useRef<string>('');

	useLayoutEffect(() => {
		if (!ref.current) return;
		width.current = `${ref.current.clientWidth}px`;
	}, []);

	const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		onChange(evt.target.value);
	};

	const hintCallback = (hint: string) => hint.startsWith(value);

	const hintText = value && hints.find(hintCallback);

	const hintsList = hintText ? hints.filter(hintCallback) : [];
	const submitHandler = (evt: FormEvent) => {
		evt.preventDefault();
		setHints(prevState => Array.from(new Set([...prevState, value])));
		onChange('');
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
			{hintsList.length ? (
				<div className={styles.hintsList} style={{ '--width': width.current } as CSSProperties}>
					{hintsList.map(hint => (
						<p key={hint}>{hint}</p>
					))}
				</div>
			) : null}
		</>
	);
}
