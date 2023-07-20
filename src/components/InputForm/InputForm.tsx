import { ChangeEvent, FormEvent, ForwardedRef, forwardRef } from 'react';

interface InputFormProps {
	submitHandler(evt: FormEvent): void;
	value: string;
	changeHandler(evt: ChangeEvent<HTMLInputElement>): void;
	onConfirm(): void;
	className: string;
}

export const InputForm = forwardRef(
	(
		{ value, submitHandler, changeHandler, onConfirm, className }: InputFormProps,
		ref: ForwardedRef<HTMLInputElement>
	) => (
		<form onSubmit={submitHandler}>
			<input ref={ref} value={value} onInput={changeHandler} onClick={onConfirm} className={className} />
		</form>
	)
);
