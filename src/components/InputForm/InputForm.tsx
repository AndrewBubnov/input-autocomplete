import styles from './InputForm.module.css';
import { clsx } from 'clsx';
import { ChangeEvent, FormEvent, ForwardedRef, forwardRef } from 'react';

interface InputFormProps {
	submitHandler(evt: FormEvent): void;
	value: string;
	changeHandler(evt: ChangeEvent<HTMLInputElement>): void;
	className: string;
	hintText?: string;
}

export const InputForm = forwardRef(
	(
		{ hintText, value, submitHandler, changeHandler, className }: InputFormProps,
		ref: ForwardedRef<HTMLInputElement>
	) => (
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
	)
);
