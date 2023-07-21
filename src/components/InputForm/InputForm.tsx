import { ChangeEvent, FormEvent, ForwardedRef, forwardRef } from 'react';

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
			<input ref={ref} value={value} onInput={onChange} onClick={onClick} className={className} id="input" />
		</form>
	)
);
