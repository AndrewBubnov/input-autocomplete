import { ChangeEvent, FormEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Dimensions, HintList } from '../HintList/HintList.tsx';
import { InputForm } from '../InputForm/InputForm.tsx';
import debounce from 'lodash.debounce';
import { DEBOUNCE_DELAY } from '../../constants.ts';

interface InputProps {
	value: string;
	onChange(arg: string): void;
	onSubmit(arg: string): void;
	fetchFn(arg: string): Promise<string[]>;
	className?: string;
}

export const Autocomplete = ({ value, onChange, fetchFn, onSubmit, className = '' }: InputProps) => {
	const [hints, setHints] = useState<string[]>([]);
	const [currentHint, setCurrentHint] = useState<string>('');
	const request = useRef<string>('');

	const ref = useRef<HTMLInputElement>(null);
	const dimensions = useRef<Dimensions>({ top: '', left: '', width: '' });

	useLayoutEffect(() => {
		if (!ref.current) return;
		const { width, bottom, left } = ref.current.getBoundingClientRect();
		dimensions.current = { top: `${bottom}px`, left: `${left}px`, width: `${width}px` };
	}, []);

	useEffect(() => {
		if (!ref.current || !currentHint) return;
		ref.current.setSelectionRange(request.current.length, currentHint.length);
	}, [currentHint]);

	const debounced = useCallback(
		(req: string) =>
			debounce(async () => {
				const fetched = await fetchFn(req);
				const hint = fetched.length ? fetched[0] : '';
				onChange(hint && hint.length > req.length ? hint : req);
				setCurrentHint(hint);
				setHints(fetched);
			}, DEBOUNCE_DELAY),
		[fetchFn, onChange]
	);

	const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		const { value } = evt.target;
		onChange(value);
		if (value.length > request.current.length) void debounced(value)();
		request.current = value;
	};

	const selectHandler = useCallback(
		(arg: string) => {
			setCurrentHint('');
			request.current = arg;
			onChange(arg);
		},
		[onChange]
	);

	const clickHandler = useCallback(() => {
		request.current = currentHint;
	}, [currentHint]);

	const submitHandler = useCallback(
		(evt: FormEvent) => {
			evt.preventDefault();
			onSubmit(ref.current?.value || '');
		},
		[onSubmit]
	);

	const setCurrentHintTextHandler = useCallback(
		(hint: string) => {
			setCurrentHint(hint);
			onChange(hint);
		},
		[onChange]
	);

	const isHintListRendered = !!value && !!currentHint;

	return (
		<>
			<InputForm
				value={value}
				onChange={changeHandler}
				onSubmit={submitHandler}
				onClick={clickHandler}
				className={className}
				ref={ref}
			/>
			{isHintListRendered && (
				<HintList
					list={hints}
					dimensions={dimensions.current}
					onSelect={selectHandler}
					setHintText={setCurrentHintTextHandler}
					request={request.current}
				/>
			)}
		</>
	);
};
