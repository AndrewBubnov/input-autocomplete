import { ChangeEvent, FormEvent, ForwardedRef, forwardRef } from 'react';

interface InputFormProps {
	submitHandler(evt: FormEvent): void;
	value: string;
	changeHandler(evt: ChangeEvent<HTMLInputElement>): void;
	className: string;
}

export const InputForm = forwardRef(
	({ value, submitHandler, changeHandler, className }: InputFormProps, ref: ForwardedRef<HTMLInputElement>) => (
		<form onSubmit={submitHandler}>
			<input ref={ref} value={value} onInput={changeHandler} className={className} />
		</form>
	)
);
