import { ChangeEvent, FormEvent, ForwardedRef, forwardRef } from 'react';
import styles from './InputForm.module.css';
import { clsx } from 'clsx';

interface InputFormProps {
	onSubmit(evt: FormEvent): void;
	value: string;
	onChange(evt: ChangeEvent<HTMLInputElement>): void;
	onClick(): void;
	className: string;
}

export const InputForm = forwardRef(
	({ value, onSubmit, onChange, onClick, className }: InputFormProps, ref: ForwardedRef<HTMLInputElement>) => (
		<form onSubmit={onSubmit}>
			<input
				ref={ref}
				value={value}
				onInput={onChange}
				onClick={onClick}
				className={clsx(className, styles.input)}
				autoComplete="off"
				autoFocus
			/>
		</form>
	)
);
